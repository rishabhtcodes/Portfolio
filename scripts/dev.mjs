import fs from 'node:fs';
import http from 'node:http';
import net from 'node:net';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const backendDir = path.join(rootDir, 'backend');
const npmCommand = 'npm';
const backendPort = Number(process.env.PORT || 5000);
const children = [];

function quoteArg(arg) {
  if (/\s|"/.test(arg)) {
    return `"${arg.replace(/"/g, '\\"')}"`;
  }
  return arg;
}

function resolveSpawnCommand(command, args) {
  if (process.platform === 'win32') {
    const joined = [command, ...args].map(quoteArg).join(' ');
    return {
      command: 'cmd.exe',
      args: ['/d', '/s', '/c', joined],
      shell: false,
    };
  }

  return {
    command,
    args,
    shell: false,
  };
}

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return fs
    .readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .reduce((accumulator, line) => {
      const trimmedLine = line.trim();

      if (!trimmedLine || trimmedLine.startsWith('#')) {
        return accumulator;
      }

      const separatorIndex = trimmedLine.indexOf('=');

      if (separatorIndex === -1) {
        return accumulator;
      }

      const key = trimmedLine.slice(0, separatorIndex).trim();
      const value = trimmedLine.slice(separatorIndex + 1).trim();
      accumulator[key] = value;
      return accumulator;
    }, {});
}

function log(message) {
  process.stdout.write(`[dev] ${message}\n`);
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function canConnect(host, port) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host, port, timeout: 1200 });

    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });

    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });

    socket.on('error', () => {
      resolve(false);
    });
  });
}

function isBackendHealthy(port) {
  return new Promise((resolve) => {
    const request = http.get(
      {
        hostname: '127.0.0.1',
        port,
        path: '/api/health',
        timeout: 1200,
      },
      (response) => {
        resolve(response.statusCode === 200);
      },
    );

    request.on('timeout', () => {
      request.destroy();
      resolve(false);
    });

    request.on('error', () => {
      resolve(false);
    });
  });
}

function runCommand(command, args, cwd) {
  return new Promise((resolve) => {
    const resolved = resolveSpawnCommand(command, args);
    const child = spawn(resolved.command, resolved.args, {
      cwd,
      stdio: 'ignore',
      shell: resolved.shell,
    });

    child.on('exit', (code) => resolve(code === 0));
    child.on('error', () => resolve(false));
  });
}

async function ensureLocalMongoRunning() {
  const env = {
    ...readEnvFile(path.join(backendDir, '.env')),
    ...readEnvFile(path.join(backendDir, '.env.example')),
  };
  const mongoUri = env.MONGODB_URI || '';

  if (!mongoUri.startsWith('mongodb://')) {
    log('Skipping automatic database startup because MONGODB_URI is not a local MongoDB URI.');
    return;
  }

  let host = '127.0.0.1';
  let port = 27017;

  try {
    const parsed = new URL(mongoUri);
    host = parsed.hostname || host;
    port = Number(parsed.port || port);
  } catch {
    log('Could not parse local MONGODB_URI. Proceeding without database precheck.');
    return;
  }

  if (await canConnect(host, port)) {
    log(`Local MongoDB is already reachable on ${host}:${port}.`);
    return;
  }

  log(`Local MongoDB is not running on ${host}:${port}. Attempting automatic startup...`);

  let started = false;

  if (process.platform === 'win32') {
    started =
      (await runCommand('powershell', ['-NoProfile', '-Command', "Start-Service -Name 'MongoDB' -ErrorAction SilentlyContinue"], rootDir)) ||
      (await runCommand('powershell', ['-NoProfile', '-Command', "Start-Service -Name 'MongoDBServer' -ErrorAction SilentlyContinue"], rootDir));
  }

  if (!started) {
    started = await runCommand('mongod', ['--version'], rootDir);
  }

  await sleep(1800);

  if (await canConnect(host, port)) {
    log('Local MongoDB is now reachable.');
    return;
  }

  log('Could not auto-start local MongoDB. Make sure your local MongoDB service is running before using admin features.');
}

function spawnLabeledProcess(label, command, args, cwd) {
  const resolved = resolveSpawnCommand(command, args);
  const child = spawn(resolved.command, resolved.args, {
    cwd,
    stdio: 'inherit',
    shell: resolved.shell,
  });

  children.push(child);

  child.on('exit', (code) => {
    if (code !== 0) {
      log(`${label} exited with code ${code}.`);
    }
  });

  return child;
}

function shutdown() {
  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }
}

process.on('SIGINT', () => {
  shutdown();
  process.exit(0);
});

process.on('SIGTERM', () => {
  shutdown();
  process.exit(0);
});

async function main() {
  await ensureLocalMongoRunning();

  log('Starting backend and frontend development servers...');
  const backendAlreadyRunning = await isBackendHealthy(backendPort);

  if (backendAlreadyRunning) {
    log(`Backend API already running on port ${backendPort}. Reusing existing server.`);
  } else {
    spawnLabeledProcess('backend', npmCommand, ['run', '--prefix', 'backend', 'dev'], rootDir);
  }

  await sleep(1200);
  spawnLabeledProcess('frontend', npmCommand, ['run', 'dev:frontend'], rootDir);

  await new Promise(() => {});
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});