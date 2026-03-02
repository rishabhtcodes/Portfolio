import { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [dotPos, setDotPos] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setIsTouchDevice(isTouch);
        if (isTouch) return;

        const move = (e) => {
            setPos({ x: e.clientX, y: e.clientY });
            setDotPos({ x: e.clientX, y: e.clientY });
            if (!visible) setVisible(true);
        };

        const addHover = () => setHovering(true);
        const removeHover = () => setHovering(false);

        window.addEventListener('mousemove', move);
        document.addEventListener('mouseleave', () => setVisible(false));
        document.addEventListener('mouseenter', () => setVisible(true));

        const observeHoverables = () => {
            const els = document.querySelectorAll('a, button, .btn, input, textarea, [role="button"]');
            els.forEach(el => {
                el.addEventListener('mouseenter', addHover);
                el.addEventListener('mouseleave', removeHover);
            });
        };

        observeHoverables();
        const observer = new MutationObserver(observeHoverables);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', move);
            observer.disconnect();
        };
    }, [visible]);

    if (isTouchDevice) return null;

    return (
        <>
            <div
                className={`custom-cursor ${hovering ? 'custom-cursor--hover' : ''}`}
                style={{
                    left: pos.x,
                    top: pos.y,
                    opacity: visible ? 1 : 0,
                }}
            />
            <div
                className="custom-cursor-dot"
                style={{
                    left: dotPos.x,
                    top: dotPos.y,
                    opacity: visible ? 1 : 0,
                }}
            />

            <style>{`
                * { cursor: none !important; }

                .custom-cursor {
                    position: fixed;
                    width: 36px;
                    height: 36px;
                    border: 2px solid rgba(139, 92, 246, 0.5);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 99999;
                    transform: translate(-50%, -50%);
                    transition: width 0.25s ease, height 0.25s ease,
                                border-color 0.25s ease, opacity 0.15s ease,
                                background 0.25s ease;
                }

                .custom-cursor--hover {
                    width: 52px;
                    height: 52px;
                    border-color: var(--accent-cyan);
                    background: rgba(6, 182, 212, 0.08);
                }

                .custom-cursor-dot {
                    position: fixed;
                    width: 6px;
                    height: 6px;
                    background: var(--accent-purple);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 99999;
                    transform: translate(-50%, -50%);
                    transition: opacity 0.15s ease;
                }

                @media (max-width: 768px), (pointer: coarse) {
                    * { cursor: auto !important; }
                    .custom-cursor,
                    .custom-cursor-dot {
                        display: none !important;
                    }
                }
            `}</style>
        </>
    );
}
