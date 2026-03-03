import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShow(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <>
            <button
                className={`scroll-top ${show ? 'scroll-top--visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Scroll to top"
            >
                <ArrowUp size={18} />
            </button>

            <style>{`
                .scroll-top {
                    position: fixed;
                    bottom: 32px;
                    right: 32px;
                    width: 44px;
                    height: 44px;
                    border: 1px solid var(--border-dark);
                    background: var(--bg-primary);
                    color: var(--text-primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.3s ease;
                    z-index: 500;
                }

                .scroll-top--visible {
                    opacity: 1;
                    pointer-events: all;
                }

                .scroll-top:hover {
                    background: var(--accent);
                    color: var(--bg-primary);
                }
            `}</style>
        </>
    );
}
