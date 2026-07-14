import { useEffect, useRef, useState } from 'react';

const TRAIL_LENGTH = 14;

// Colors cycling through light blue shades
const TRAIL_COLORS = [
  '#7DD3FC', // sky-300   (head)
  '#38BDF8', // sky-400
  '#0EA5E9', // sky-500
  '#38BDF8', // sky-400
  '#BAE6FD', // sky-200
  '#7DD3FC', // sky-300
  '#38BDF8', // sky-400
  '#0EA5E9', // sky-500
  '#67E8F9', // cyan-300
  '#22D3EE', // cyan-400
  '#38BDF8', // sky-400
  '#7DD3FC', // sky-300
  '#BAE6FD', // sky-200
  '#38BDF8', // sky-400
];

export default function CursorGlow() {
  const dotsRef      = useRef(new Array(TRAIL_LENGTH).fill(null));
  const cursorRef    = useRef(null);
  const posRef       = useRef({ x: -200, y: -200 });
  const [isPointer, setIsPointer] = useState(false);
  const isPointerRef = useRef(false);

  useEffect(() => {
    const positions = Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 }));
    let frameId;

    const onMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      const target = e.target;
      const isPtr =
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button');
      isPointerRef.current = !!isPtr;
      setIsPointer(!!isPtr);
    };

    const animate = () => {
      // Head snaps to mouse
      positions[0] = { x: posRef.current.x, y: posRef.current.y };

      // Each subsequent dot lerps toward the previous
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        const prev = positions[i - 1];
        const curr = positions[i];
        curr.x += (prev.x - curr.x) * 0.28;
        curr.y += (prev.y - curr.y) * 0.28;
      }

      // Update custom cursor ring
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;
      }

      // Update trail dots
      positions.forEach((pos, i) => {
        const el = dotsRef.current[i];
        if (!el) return;
        const decay = 1 - i / TRAIL_LENGTH;
        const size  = i === 0
          ? (isPointerRef.current ? 20 : 16)
          : Math.max(3, 14 * decay);
        el.style.width   = `${size}px`;
        el.style.height  = `${size}px`;
        el.style.opacity = `${Math.max(0, decay * 0.95)}`;
        el.style.filter  = `blur(${i === 0 ? 0 : 1 + (1 - decay) * 3}px)`;
        el.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      });

      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`
        *, *::before, *::after { cursor: none !important; }
      `}</style>

      {/* Outer ring — scales up on hoverable elements */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block will-change-transform"
        style={{
          width:  isPointer ? '46px' : '34px',
          height: isPointer ? '46px' : '34px',
          borderRadius: '50%',
          border: `2.5px solid ${isPointer ? '#22D3EE' : '#38BDF8'}`,
          boxShadow: isPointer
            ? '0 0 16px 4px rgba(34,211,238,0.6)'
            : '0 0 14px 3px rgba(56,189,248,0.6)',
          transition: 'width 0.18s ease, height 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease',
          transform: 'translate(-200px, -200px) translate(-50%, -50%)',
        }}
      />

      {/* Colorful dot trail */}
      <div className="pointer-events-none fixed inset-0 z-[9998] hidden overflow-hidden md:block">
        {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            className="absolute left-0 top-0 rounded-full will-change-transform"
            style={{
              backgroundColor: TRAIL_COLORS[i % TRAIL_COLORS.length],
              boxShadow: `0 0 ${10 + i}px 3px ${TRAIL_COLORS[i % TRAIL_COLORS.length]}80`,
              width:  '14px',
              height: '14px',
              transform: 'translate(-200px, -200px) translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
    </>
  );
}
