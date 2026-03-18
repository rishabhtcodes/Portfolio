import { useEffect, useRef } from 'react';

const TRAIL_LENGTH = 20;

export default function CursorGlow() {
  const dotsRef = useRef(new Array(TRAIL_LENGTH).fill(null));
  const posRef = useRef({ x: -100, y: -100 });
  
  useEffect(() => {
    // Array of trailing physics positions
    const positions = new Array(TRAIL_LENGTH).fill({ x: -100, y: -100 });
    let animationFrameId;

    const onMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Head dot exactly snaps to mouse
      positions[0] = { x: posRef.current.x, y: posRef.current.y };
      
      // Each subsequent dot lerps (smoothly follows) the one in front of it
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        const dx = positions[i - 1].x - positions[i].x;
        const dy = positions[i - 1].y - positions[i].y;
        positions[i].x += dx * 0.35; // Lower number = longer/draggy tail
        positions[i].y += dy * 0.35;
      }

      // Apply fast DOM updates
      positions.forEach((pos, index) => {
        const dot = dotsRef.current[index];
        if (dot) {
          // Calculate scale for dot size falloff
          const scale = index === 0 ? 1 : Math.max(0, 1 - (index / TRAIL_LENGTH));
          dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(${scale})`;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden overflow-hidden md:block mix-blend-difference">
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => {
        const isHead = i === 0;
        return (
          <div
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            className="absolute left-0 top-0 rounded-full will-change-transform"
            style={{
              backgroundColor: '#38bdf8',
              width: isHead ? '24px' : '20px',
              height: isHead ? '24px' : '20px',
              boxShadow: '0 0 15px 4px rgba(56, 189, 248, 0.4)',
              filter: 'blur(2px)',
              zIndex: 100 - i, // Ensure head is perfectly on top of tail
              transform: 'translate(-100px, -100px) translate(-50%, -50%)',
            }}
          />
        );
      })}
    </div>
  );
}
