import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const mouse   = { x: -200, y: -200 };
    const ring    = { x: -200, y: -200 };
    let   frameId = null;
    let   isHover = false;

    // ── track mouse ──────────────────────────────────────────
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const target = e.target;
      isHover =
        window.getComputedStyle(target).cursor === 'pointer' ||
        ['A', 'BUTTON'].includes(target.tagName) ||
        !!target.closest('a, button, [role="button"]');
    };

    // ── animation loop ────────────────────────────────────────
    const tick = () => {
      // Ring lerps toward mouse (lag effect)
      ring.x += (mouse.x - ring.x) * 0.12;
      ring.y += (mouse.y - ring.y) * 0.12;

      // Dot: instant snap
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;
        // Shrink dot on hover (ring takes over focus)
        dotRef.current.style.width  = isHover ? '6px'  : '8px';
        dotRef.current.style.height = isHover ? '6px'  : '8px';
        dotRef.current.style.opacity = isHover ? '0.6' : '1';
      }

      // Ring: lagged + scales up on hover
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%)`;
        ringRef.current.style.width  = isHover ? '48px' : '36px';
        ringRef.current.style.height = isHover ? '48px' : '36px';
        ringRef.current.style.borderColor = isHover
          ? 'rgba(56,189,248,0.85)'   // sky-400
          : 'rgba(139,92,246,0.75)';  // violet-500
        ringRef.current.style.boxShadow = isHover
          ? '0 0 18px 3px rgba(56,189,248,0.35)'
          : '0 0 12px 2px rgba(139,92,246,0.3)';
      }

      frameId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    frameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  const shared = {
    position: 'fixed',
    left:     0,
    top:      0,
    pointerEvents: 'none',
    zIndex:   9999,
    borderRadius: '50%',
    willChange: 'transform',
    transform: 'translate(-200px, -200px) translate(-50%, -50%)',
  };

  return (
    <>
      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>

      {/* ── solid dot — exact mouse position ── */}
      <div
        ref={dotRef}
        className="hidden md:block"
        style={{
          ...shared,
          width:      '8px',
          height:     '8px',
          background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
          boxShadow:  '0 0 8px 2px rgba(56,189,248,0.6)',
          transition: 'width 0.15s ease, height 0.15s ease, opacity 0.15s ease',
        }}
      />

      {/* ── outer ring — lagging behind ── */}
      <div
        ref={ringRef}
        className="hidden md:block"
        style={{
          ...shared,
          width:  '36px',
          height: '36px',
          border: '2px solid rgba(139,92,246,0.75)',
          background: 'transparent',
          boxShadow: '0 0 12px 2px rgba(139,92,246,0.3)',
          transition:
            'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        }}
      />
    </>
  );
}
