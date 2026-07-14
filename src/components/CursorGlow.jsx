import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────────
   DEFAULT cursor  — diagonal arrow (tip at upper-left)
   matches the LEFT shape in the reference image
───────────────────────────────────────────────────────────── */
function DefaultCursor() {
  return (
    <svg
      width="118"
      height="110"
      viewBox="0 0 118 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Purple back pill ── */}
      <rect
        x="-4" y="8"
        width="72" height="32"
        rx="16"
        fill="#9333EA"
        transform="rotate(-42 32 24)"
      />
      {/* ── Pink front pill ── */}
      <rect
        x="-8" y="24"
        width="70" height="30"
        rx="15"
        fill="#FF3CAC"
        transform="rotate(-42 27 39)"
      />
      {/* ── Orange accent stripe ── */}
      <rect
        x="6" y="46"
        width="52" height="16"
        rx="8"
        fill="#F97316"
        transform="rotate(-42 32 54)"
      />

      {/* ── Trailing dots ── */}
      <circle cx="66"  cy="60" r="10"  fill="#D946EF" />
      <circle cx="84"  cy="70" r="6"   fill="#F97316" />
      <circle cx="73"  cy="82" r="5"   fill="#FF3CAC" />
      <circle cx="92"  cy="83" r="8.5" fill="#FB923C" />
      <circle cx="103" cy="68" r="4"   fill="#A855F7" />
      <circle cx="98"  cy="97" r="6"   fill="#FBBF24" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   POINTER cursor  — upward pointing hand (tip at top)
   matches the RIGHT shape in the reference image
───────────────────────────────────────────────────────────── */
function PointerCursor() {
  return (
    <svg
      width="104"
      height="116"
      viewBox="0 0 104 116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Purple back pill (slightly tilted, vertical) ── */}
      <rect
        x="18" y="0"
        width="34" height="74"
        rx="17"
        fill="#9333EA"
        transform="rotate(-10 35 37)"
      />
      {/* ── Pink front pill ── */}
      <rect
        x="2" y="2"
        width="32" height="72"
        rx="16"
        fill="#FF3CAC"
        transform="rotate(-10 18 38)"
      />
      {/* ── Orange accent ── */}
      <rect
        x="28" y="12"
        width="24" height="54"
        rx="12"
        fill="#F97316"
        transform="rotate(-10 40 39)"
      />

      {/* ── Trailing dots ── */}
      <circle cx="44"  cy="80" r="9"   fill="#D946EF" />
      <circle cx="60"  cy="90" r="5.5" fill="#F97316" />
      <circle cx="50"  cy="100" r="4.5" fill="#FF3CAC" />
      <circle cx="66"  cy="100" r="8"  fill="#FB923C" />
      <circle cx="76"  cy="84" r="3.5" fill="#A855F7" />
      <circle cx="72"  cy="110" r="5.5" fill="#FBBF24" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main component
   – hides default cursor globally
   – translates the SVG so its hot-spot aligns with mouse pos
───────────────────────────────────────────────────────────── */
export default function CursorGlow() {
  const wrapperRef    = useRef(null);
  const posRef        = useRef({ x: -300, y: -300 });
  const [isPointer, setIsPointer] = useState(false);
  const isPointerRef  = useRef(false);

  useEffect(() => {
    let frameId;

    const onMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      const target = e.target;
      const ptr =
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        !!target.closest('a') ||
        !!target.closest('button') ||
        !!target.closest('[role="button"]');

      if (ptr !== isPointerRef.current) {
        isPointerRef.current = ptr;
        setIsPointer(ptr);
      }
    };

    const animate = () => {
      if (wrapperRef.current) {
        const { x, y } = posRef.current;
        wrapperRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
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
      {/* Hide the system cursor everywhere */}
      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>

      {/*
        The wrapper is fixed at (0,0) and translated to (mouseX, mouseY).
        The inner div has a negative offset so the SVG's "tip" sits
        exactly at the mouse coordinate:
          – default cursor  → tip is near top-left → offset (-4px, -4px)
          – pointer cursor  → finger-tip is ~(14px, 4px) → offset (-14px, -4px)
      */}
      <div
        ref={wrapperRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block will-change-transform"
        style={{ transform: 'translate(-300px, -300px)' }}
      >
        <div
          style={{
            transform: isPointer ? 'translate(-14px, -4px)' : 'translate(-4px, -4px)',
            transition: 'transform 0.12s ease',
            filter: 'drop-shadow(0 0 8px rgba(255,60,172,0.55))',
          }}
        >
          {isPointer ? <PointerCursor /> : <DefaultCursor />}
        </div>
      </div>
    </>
  );
}
