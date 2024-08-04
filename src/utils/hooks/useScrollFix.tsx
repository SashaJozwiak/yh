import { useEffect } from 'react';

const useScrollFix = () => {
    useEffect(() => {
        const overflow = 100;

        // Добавляем классы к document и body
        document.documentElement.classList.add('document');
        document.body.classList.add('body');

        document.body.style.overflowY = 'hidden';
        //document.body.style.marginTop = `${overflow}px`;
        document.body.style.height = window.innerHeight + overflow + "px";
        document.body.style.paddingBottom = `${overflow}px`;
        window.scrollTo(0, 0); //window.scrollTo(0, overflow);

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

        document.documentElement.addEventListener('touchstart', onTouchStart, { passive: false });
        document.documentElement.addEventListener('touchmove', onTouchMove, { passive: false });

        return () => {
            document.documentElement.removeEventListener('touchstart', onTouchStart);
            document.documentElement.removeEventListener('touchmove', onTouchMove);
        };
    }, []);
};

export default useScrollFix;
