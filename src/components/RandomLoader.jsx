import React, { useState, useEffect } from 'react';

const ANIMATION_TYPES = [
  'shattering-frosted-glass',
  'retro-crt-computer',
  'retro-[#ece6d9]-mac-classic',
  'retro-terminal-window',
  'retro-gameboy-pocket',
  'retro-[#ece6d9]-cyber-loader',
  'retro-diskette-boot'
];

export default function RandomLoader({ onFinish }) {
  const [animationStyle] = useState(() => {
    const randomIndex = Math.floor(Math.random() * ANIMATION_TYPES.length);
    return ANIMATION_TYPES[randomIndex];
  });

  const [progress, setProgress] = useState(0);
  const [terminalLines, setTerminalLines] = useState([]);
  const [isGlassShattered, setIsGlassShattered] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const terminalScrollRef = React.useRef(null);

  // Auto-scroll terminal container when new log lines are added
  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [terminalLines]);

  useEffect(() => {
    // 2.5 second total animation time
    const totalTime = 2500;
    const intervalTime = 35;
    const increment = 100 / (totalTime / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Handle frosted glass shatter sequence
  useEffect(() => {
    if (animationStyle === 'shattering-frosted-glass') {
      const shatterTimer = setTimeout(() => {
        setIsGlassShattered(true);
      }, 1000);

      const popupTimer = setTimeout(() => {
        setShowWelcomePopup(true);
      }, 1200);

      return () => {
        clearTimeout(shatterTimer);
        clearTimeout(popupTimer);
      };
    }
  }, [animationStyle]);

  // Handle line typing for console animations
  useEffect(() => {
    if (animationStyle === 'retro-crt-computer' || animationStyle === 'retro-terminal-window' || animationStyle === 'retro-diskette-boot') {
      const steps = [
        { text: '> INITIALIZING SWIFT OS KERNEL v2.4...', delay: 100 },
        { text: '> CONNECTING TO PORTFOLIO DATABASE...', delay: 600 },
        { text: '> FETCHING RISHABH\'S PROJECTS & SKILLS...', delay: 1200 },
        { text: '> AUTHENTICATING GUEST SESSION...', delay: 1800 },
        { text: '> WELCOME TO RISHABH\'S PORTFOLIO!', delay: 2200 }
      ];

      steps.forEach(step => {
        setTimeout(() => {
          setTerminalLines(prev => [...prev, step.text]);
        }, step.delay);
      });
    }
  }, [animationStyle]);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          if (onFinish) onFinish();
        }, 500);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [progress, onFinish]);

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#ece6d9] text-[#2b251d] font-mono transition-opacity duration-500 select-none p-4 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      {/* 0. SHATTERING FROSTED BLURRY GLASS ANIMATION */}
      {animationStyle === 'shattering-frosted-glass' && (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          
          {/* FROSTED GLASS OVERLAY PANELS SHATTERING AWAY */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 p-2 pointer-events-none z-20">
            {[
              'translate-x-[-120%] translate-y-[-120%] rotate-[-25deg]',
              'translate-y-[-140%] rotate-[15deg]',
              'translate-x-[120%] translate-y-[-120%] rotate-[30deg]',
              'translate-x-[-140%] rotate-[-15deg]',
              'scale-0 rotate-[45deg]',
              'translate-x-[140%] rotate-[20deg]',
              'translate-x-[-120%] translate-y-[120%] rotate-[35deg]',
              'translate-y-[140%] rotate-[-20deg]',
              'translate-x-[120%] translate-y-[120%] rotate-[-30deg]',
            ].map((shatterEffect, idx) => (
              <div
                key={idx}
                className={`bg-[#f5f0e6]/70 backdrop-blur-md border border-[#d4cbb8]/80 shadow-lg rounded-xl transition-all duration-700 ease-out ${
                  isGlassShattered ? `${shatterEffect} opacity-0` : 'translate-x-0 translate-y-0 scale-100 opacity-100'
                }`}
              />
            ))}
          </div>

          {/* INITIAL FROSTED GLASS CENTER BADGE BEFORE SHATTER */}
          {!isGlassShattered && (
            <div className="z-30 flex flex-col items-center space-y-3 bg-[#f5f0e6]/80 backdrop-blur-lg border-2 border-[#794422]/30 p-6 rounded-2xl shadow-2xl animate-pulse">
              <div className="w-10 h-10 rounded-full border-2 border-[#794422] flex items-center justify-center text-[#794422] font-bold">
                R
              </div>
              <p className="text-xs font-bold tracking-widest text-[#794422] uppercase">Preparing OS...</p>
            </div>
          )}

          {/* WELCOME POPUP CARD EMERGES AFTER GLASS SHATTERS */}
          <div 
            className={`z-40 max-w-md w-full max-w-[90vw] sm:max-w-md bg-[#f5f0e6] border-4 border-[#794422] rounded-2xl p-4 sm:p-6 shadow-[0_25px_60px_rgba(121,68,34,0.3)] text-center space-y-3 sm:space-y-4 transition-all duration-500 transform ${
              showWelcomePopup ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-8'
            }`}
          >
            {/* Header Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#794422] text-[#f7f3ec] px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold tracking-widest uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              SYSTEM BOOT SUCCESSFUL
            </div>

            {/* Welcome Name Announcement */}
            <div className="space-y-1">
              <h2 className="text-[10px] sm:text-xs font-extrabold text-[#6b6255] uppercase tracking-widest">
                WELCOME TO
              </h2>
              <h1 className="text-xl sm:text-3xl font-black text-[#794422] tracking-wider uppercase drop-shadow-sm leading-snug">
                RISHABH'S PORTFOLIO
              </h1>
              <p className="text-[11px] sm:text-xs text-[#2b251d] font-semibold pt-0.5">
                Full Stack Developer & AI Enthusiast
              </p>
            </div>

            {/* Progress Bar inside Popup */}
            <div className="space-y-1.5 pt-2 border-t border-[#d4cbb8]">
              <div className="flex justify-between text-[9px] sm:text-[10px] text-[#794422] font-bold">
                <span>AUTHENTICATING SESSION</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-2.5 sm:h-3 bg-[#ece6d9] rounded-full border border-[#b8ac94] p-0.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#794422] via-[#8e522b] to-[#3d7a46] rounded-full transition-all duration-75 shadow-sm"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 1. RETRO CRT VINTAGE COMPUTER & GREEN PHOSPHOR CONSOLE */}
      {animationStyle === 'retro-crt-computer' && (
        <div className="flex flex-col items-center justify-center w-full max-w-xl">
          {/* CRT COMPUTER MONITOR FRAME (Light Cream OS Theme) */}
          <div className="relative w-full bg-[#f5f0e6] border-4 border-[#d4cbb8] rounded-2xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(121,68,34,0.15)] border-b-8 border-b-[#b8ac94]">
            
            {/* Monitor Header Badge */}
            <div className="flex justify-between items-center mb-2 px-1 text-[10px] text-[#794422] font-extrabold tracking-widest uppercase">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3d7a46] animate-pulse" /> SWIFT-CRT 1994
              </span>
              <span>MODEL: RISHABH-V1</span>
            </div>

            {/* CRT INNER GLOW SCREEN CONTAINER (Fixed Height, Internal Console Auto-Scrolls) */}
            <div className="relative bg-[#0d160e] border-4 border-[#b8ac94] rounded-lg p-4 sm:p-5 overflow-hidden shadow-inner h-60 sm:h-64 flex flex-col justify-between">
              
              {/* Scanlines CRT overlay */}
              <div 
                className="absolute inset-0 pointer-events-none z-20 opacity-25" 
                style={{ 
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.4) 3px, rgba(0, 0, 0, 0.4) 3px)' 
                }} 
              />
              
              {/* Green phosphor screen overlay */}
              <div className="absolute inset-0 bg-emerald-950/10 pointer-events-none z-10" />

              {/* CONSOLE HEADER BAR */}
              <div className="relative z-30 flex items-center justify-between border-b border-[#1e3b23] pb-1.5 text-xs text-[#4ade80] shrink-0">
                <div className="flex items-center gap-2 font-bold tracking-wider">
                  <span>&gt;_ CONSOLE BOOT</span>
                </div>
                <span className="text-[10px] bg-[#1e3b23] text-[#4ade80] px-2 py-0.5 rounded font-mono">
                  {Math.round(progress)}%
                </span>
              </div>

              {/* CONSOLE TERMINAL LOG OUTPUT (Fixed Height Internal Scroll) */}
              <div 
                ref={terminalScrollRef}
                className="relative z-30 flex-1 my-2 space-y-1.5 text-xs sm:text-sm font-mono text-[#4ade80] overflow-y-auto pr-1 swift-custom-scrollbar leading-relaxed"
              >
                {terminalLines.map((line, idx) => (
                  <div key={idx} className={idx === terminalLines.length - 1 ? "font-bold text-[#86efac] drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]" : "opacity-90"}>
                    {line}
                  </div>
                ))}
                <div className="w-2.5 h-4 bg-[#4ade80] inline-block animate-pulse ml-1 align-middle" />
              </div>

              {/* CRT CONSOLE PROGRESS BAR */}
              <div className="relative z-30 pt-2 border-t border-[#1e3b23] space-y-1 shrink-0">
                <div className="flex justify-between text-[10px] text-[#4ade80] font-bold tracking-wider">
                  <span>LOADING RISHABH PORTFOLIO</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-3 bg-[#080d09] rounded border border-[#1e3b23] p-0.5 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#15803d] to-[#4ade80] rounded transition-all duration-75 shadow-[0_0_10px_#22c55e]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

            </div>

            {/* MONITOR BOTTOM POWER PANEL */}
            <div className="mt-3 flex justify-between items-center px-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#3d7a46] animate-pulse shadow-[0_0_8px_#3d7a46]" />
                <span className="text-[9px] font-bold text-[#794422] tracking-widest">POWER ON</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#d4cbb8] border border-[#b8ac94]" />
                <div className="w-4 h-4 rounded-full bg-[#d4cbb8] border border-[#b8ac94]" />
                <div className="w-6 h-3 rounded bg-[#794422] border border-[#5c3217]" />
              </div>
            </div>

          </div>

          {/* COMPUTER STAND / BASE */}
          <div className="w-44 h-5 bg-[#e4dccb] border-x-4 border-b-4 border-[#b8ac94] rounded-b-lg shadow-md" />
          <div className="w-64 h-3 bg-[#d4cbb8] rounded-b-xl shadow-lg border-t border-[#f5f0e6]" />
        </div>
      )}

      {/* 2. RETRO MACINTOSH CLASSIC BOOT SCREEN */}
      {animationStyle === 'retro-[#ece6d9]-mac-classic' && (
        <div className="flex flex-col items-center justify-center w-full max-w-sm">
          <div className="relative w-full bg-[#f5f0e6] border-4 border-[#d4cbb8] rounded-3xl p-5 shadow-2xl border-b-8 border-b-[#b8ac94]">
            
            {/* Floppy Drive Slot at Top */}
            <div className="w-24 h-1.5 bg-[#b8ac94] rounded-full mx-auto mb-4 border border-[#d4cbb8]" />

            {/* SCREEN */}
            <div className="bg-[#fbf8f1] border-2 border-[#b8ac94] rounded-xl p-5 min-h-[220px] flex flex-col items-center justify-center text-center space-y-4 shadow-inner">
              
              {/* Happy Mac / Smile Icon */}
              <div className="w-16 h-16 rounded-xl border-2 border-[#794422] bg-[#ece6d9] flex flex-col items-center justify-center p-2 shadow-sm animate-pulse">
                <div className="flex justify-between w-8 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#794422]" />
                  <span className="w-2 h-2 rounded-full bg-[#794422]" />
                </div>
                <div className="w-6 h-1.5 border-b-2 border-[#794422] rounded-full" />
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#794422] tracking-wider uppercase">Welcome to Macintosh</h3>
                <p className="text-xs font-bold text-[#2b251d]">RISHABH'S PORTFOLIO OS</p>
              </div>

              {/* Progress bar */}
              <div className="w-full space-y-1 pt-2">
                <div className="flex justify-between text-[10px] text-[#6b6255] font-bold">
                  <span>SYSTEM LOADING</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2.5 bg-[#ece6d9] rounded border border-[#b8ac94] p-0.5 overflow-hidden">
                  <div 
                    className="h-full bg-[#794422] rounded transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Apple Style Monogram Badge */}
            <div className="mt-4 flex justify-between items-center px-2">
              <span className="text-xs font-extrabold text-[#794422] tracking-widest">RISHABH-OS</span>
              <div className="w-3 h-3 rounded-full bg-[#3d7a46] shadow-sm animate-ping" />
            </div>

          </div>
        </div>
      )}

      {/* 3. RETRO TERMINAL WINDOW CONSOLE */}
      {animationStyle === 'retro-terminal-window' && (
        <div className="w-11/12 max-w-lg p-5 rounded-xl border-2 border-[#d4cbb8] bg-[#fbf8f1] shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#d4cbb8] pb-3 text-xs text-[#794422]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block border border-red-500" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block border border-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block border border-emerald-500" />
              <span className="font-bold text-[#2b251d] ml-1">TERMINAL - SWIFT_OS_BOOT.EXE</span>
            </div>
            <span className="text-[10px] text-[#3d7a46] font-bold animate-pulse">● ONLINE</span>
          </div>

          <div className="h-44 overflow-y-auto space-y-2 text-xs text-[#2b251d] font-mono p-1">
            {terminalLines.map((line, idx) => (
              <div key={idx} className={idx === terminalLines.length - 1 ? "text-[#794422] font-bold" : "text-[#6b6255]"}>
                {line}
              </div>
            ))}
            <div className="w-2 h-4 bg-[#794422] inline-block animate-pulse ml-1" />
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5 pt-2 border-t border-[#d4cbb8]">
            <div className="flex justify-between text-[11px] font-bold text-[#794422]">
              <span>LOADING PORTFOLIO DATA</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-3 bg-[#ece6d9] rounded border border-[#b8ac94] p-0.5 overflow-hidden">
              <div 
                className="h-full bg-[#794422] rounded transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. RETRO GAMEBOY POCKET CONSOLE ANIMATION */}
      {animationStyle === 'retro-gameboy-pocket' && (
        <div className="flex flex-col items-center justify-center w-full max-w-xs">
          <div className="w-full bg-[#f5f0e6] border-4 border-[#d4cbb8] rounded-3xl p-5 shadow-2xl border-b-8 border-b-[#b8ac94]">
            
            {/* GAMEBOY LCD SCREEN */}
            <div className="bg-[#b4c292] border-4 border-[#6b6255] rounded-lg p-4 min-h-[190px] flex flex-col items-center justify-between text-[#2c331a] shadow-inner font-mono">
              <div className="w-full flex justify-between text-[9px] font-bold uppercase border-b border-[#2c331a]/30 pb-1">
                <span>GAME BOY</span>
                <span>RISHABH-OS</span>
              </div>

              <div className="text-center space-y-1 my-2">
                <h2 className="text-base font-black tracking-widest uppercase">WELCOME TO</h2>
                <h1 className="text-lg font-black text-[#1e2411] tracking-wider">RISHABH PORTFOLIO</h1>
                <p className="text-[10px] animate-pulse">PRESS START TO PLAY</p>
              </div>

              {/* Progress Bar */}
              <div className="w-full space-y-1">
                <div className="flex justify-between text-[9px] font-bold">
                  <span>LOADING...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-[#2c331a]/20 rounded border border-[#2c331a] p-0.5">
                  <div className="h-full bg-[#2c331a] transition-all duration-75" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>

            {/* CONTROLS (D-Pad & AB Buttons) */}
            <div className="mt-4 flex justify-between items-center px-3">
              {/* D-Pad */}
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute w-12 h-4 bg-[#794422] rounded-sm" />
                <div className="absolute w-4 h-12 bg-[#794422] rounded-sm" />
              </div>
              {/* Buttons A/B */}
              <div className="flex gap-2 rotate-[-15deg]">
                <div className="w-7 h-7 rounded-full bg-[#5c3217] border border-[#3a1d0b] text-[9px] font-bold text-white flex items-center justify-center shadow-md">B</div>
                <div className="w-7 h-7 rounded-full bg-[#5c3217] border border-[#3a1d0b] text-[9px] font-bold text-white flex items-center justify-center shadow-md">A</div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 5. RETRO LIGHT CYBER SPINNER */}
      {animationStyle === 'retro-[#ece6d9]-cyber-loader' && (
        <div className="flex flex-col items-center justify-center p-8 space-y-6 text-center bg-[#fbf8f1] border-2 border-[#d4cbb8] rounded-2xl shadow-2xl max-w-sm w-full">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-[#d4cbb8] border-t-[#794422] border-r-[#3d7a46] animate-spin" />
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#b8ac94] animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }} />
            <div className="text-xl font-extrabold tracking-widest text-[#794422]">
              {Math.round(progress)}<span className="text-xs text-[#3d7a46]">%</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-lg font-bold tracking-wider text-[#2b251d] uppercase">
              Welcome to <span className="text-[#794422]">Rishabh's Portfolio</span>
            </h1>
            <p className="text-xs text-[#6b6255] tracking-widest animate-pulse uppercase">
              Loading System Data...
            </p>
          </div>

          <div className="w-56 h-2 bg-[#ece6d9] rounded-full overflow-hidden border border-[#d4cbb8]">
            <div 
              className="h-full bg-gradient-to-r from-[#794422] to-[#3d7a46] transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* 6. VINTAGE FLOPPY DISKETTE BOOT ANIMATION */}
      {animationStyle === 'retro-diskette-boot' && (
        <div className="flex flex-col items-center justify-center p-6 text-center max-w-sm w-full">
          {/* Floppy Diskette Body */}
          <div className="w-full bg-[#794422] border-4 border-[#5c3217] rounded-xl p-5 shadow-2xl relative space-y-4">
            
            {/* Disk Metal Shutter Top */}
            <div className="w-3/4 h-14 bg-[#d4cbb8] border-2 border-[#b8ac94] rounded-b-md mx-auto flex items-end justify-between px-3 pb-1 shadow-inner">
              <div className="w-6 h-8 bg-[#5c3217] rounded-xs" />
              <span className="text-[9px] font-bold text-[#5c3217]">3.5" DISKETTE</span>
            </div>

            {/* Disk Label Sticker */}
            <div className="bg-[#fbf8f1] border-2 border-[#d4cbb8] rounded-md p-4 space-y-3 text-left">
              <div className="flex justify-between items-center border-b border-[#d4cbb8] pb-1">
                <span className="text-xs font-black text-[#794422]">RISHABH-OS v2.4</span>
                <span className="text-[9px] text-[#3d7a46] font-bold">1.44 MB</span>
              </div>

              <div className="h-20 overflow-hidden text-[10px] font-mono text-[#2b251d] space-y-1">
                {terminalLines.slice(-3).map((line, idx) => (
                  <div key={idx} className="truncate">{line}</div>
                ))}
              </div>

              <div className="space-y-1 pt-1 border-t border-[#d4cbb8]">
                <div className="flex justify-between text-[9px] font-bold text-[#6b6255]">
                  <span>READING DISK DATA</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-[#ece6d9] rounded border border-[#b8ac94] overflow-hidden">
                  <div className="h-full bg-[#794422] transition-all duration-75" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>

          </div>

          <h2 className="mt-4 text-xs font-bold uppercase tracking-widest text-[#794422]">
            Welcome to Rishabh's Portfolio
          </h2>
        </div>
      )}

    </div>
  );
}
