import { useEffect } from 'react';

const useScrollFix = () => {
    useEffect(() => {
        const overflow = 100;
        let inputFocused = false;

        document.documentElement.classList.add('document');
        document.body.classList.add('body');

        const applyStyles = () => {
            if (!inputFocused) {
                document.body.style.overflowY = 'hidden';
                document.body.style.marginTop = `${overflow}px`;
                document.body.style.height = window.innerHeight + overflow + "px";
                document.body.style.paddingBottom = `${overflow}px`;
                window.scrollTo(0, overflow);
            } else {
                document.body.style.marginTop = `0px`;
            }
        };

        applyStyles();

        let ts;

        const onTouchStart = (e) => {
            ts = e.touches[0].clientY;
        };

        const onTouchMove = (e) => {
            const scrollableEl = document.querySelector('.scrollable');
            if (scrollableEl) {
                const scroll = scrollableEl.scrollTop;
                const te = e.changedTouches[0].clientY;
                if (scroll <= 0 && ts < te) {
                    e.preventDefault();
                }
            } else {
                e.preventDefault();
            }
        };

        const onFocus = () => {
            inputFocused = true;
            applyStyles();
        };

        const onBlur = () => {
            inputFocused = false;
            applyStyles();
        };

        const input = document.querySelector('input');
        if (input) {
            input.addEventListener('focus', onFocus);
            input.addEventListener('blur', onBlur);
        }

        document.documentElement.addEventListener('touchstart', onTouchStart, { passive: false });
        document.documentElement.addEventListener('touchmove', onTouchMove, { passive: false });

        return () => {
            document.documentElement.removeEventListener('touchstart', onTouchStart);
            document.documentElement.removeEventListener('touchmove', onTouchMove);
            if (input) {
                input.removeEventListener('focus', onFocus);
                input.removeEventListener('blur', onBlur);
            }
        };
    }, []);
};

export default useScrollFix;
