import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef(null);

    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const cursor = cursorRef.current;
        if (!cursor) return;

        let mouseX = -50;
        let mouseY = -50;
        let curX = -50;
        let curY = -50;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const animate = () => {
            curX += (mouseX - curX) * 0.15;
            curY += (mouseY - curY) * 0.15;
            cursor.style.transform = `translate(${curX - 10}px, ${curY - 10}px)`;
            requestAnimationFrame(animate);
        };

        const handleLinkEnter = () => cursor.classList.add('cursor--hover');
        const handleLinkLeave = () => cursor.classList.remove('cursor--hover');

        document.addEventListener('mousemove', handleMouseMove);

        const interactiveEls = document.querySelectorAll('a, button, input, textarea, [role="button"]');
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', handleLinkEnter);
            el.addEventListener('mouseleave', handleLinkLeave);
        });

        const raf = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(raf);
            interactiveEls.forEach(el => {
                el.removeEventListener('mouseenter', handleLinkEnter);
                el.removeEventListener('mouseleave', handleLinkLeave);
            });
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="custom-cursor" />
            <style>{`
                .custom-cursor {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: var(--accent);
                    position: fixed;
                    top: 0;
                    left: 0;
                    pointer-events: none;
                    z-index: 9999;
                    transition: width 0.2s ease, height 0.2s ease, opacity 0.2s ease;
                    mix-blend-mode: difference;
                    opacity: 0.8;
                }

                .custom-cursor.cursor--hover {
                    width: 60px;
                    height: 60px;
                    opacity: 0.4;
                }

                @media (hover: none) and (pointer: coarse) {
                    .custom-cursor { display: none; }
                }

                * {
                    cursor: none !important;
                }

                @media (hover: none) and (pointer: coarse) {
                    * { cursor: auto !important; }
                }
            `}</style>
        </>
    );
}
