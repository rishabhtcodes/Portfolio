const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  const body = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const rawMessage = typeof body === 'string' ? body : body?.message;
    const message = typeof rawMessage === 'string' ? rawMessage.trim() : '';

    if (message) {
      throw new Error(message);
    }

    if (!API_BASE_URL && [500, 502, 503, 504].includes(response.status)) {
      throw new Error('Backend API appears offline. Start the backend server on port 5000 and try again.');
    }

    throw new Error(`Request failed (${response.status} ${response.statusText}).`);
  }

  return body;
}

export async function apiRequest(path, options = {}) {
  const token = options.token;
  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
      cache: 'no-store',
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    return parseResponse(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Backend API is unreachable. Start the backend server and verify MONGODB_URI / VITE_API_URL configuration.');
    }

    throw error;
  }
}

export async function apiDelete(path, token) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'DELETE',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || 'Delete request failed.');
  }
}
