import { useEffect } from 'react';

const useScrollFix = () => {
    useEffect(() => {
        const overflow = 100;

        document.documentElement.classList.add('document');
        document.body.classList.add('body');

        const applyStyles = () => {
            document.body.style.overflowY = 'hidden';
            document.body.style.marginTop = `${overflow}px`;
            document.body.style.height = window.innerHeight + overflow + "px";
            document.body.style.paddingBottom = `${overflow}px`;
            window.scrollTo(0, overflow);
        };

        applyStyles();

        const handleResize = () => {
            if (document.activeElement && document.activeElement.tagName === 'INPUT') {
                document.body.style.marginTop = `0px`;
            } else {
                applyStyles();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
};

export default useScrollFix;
