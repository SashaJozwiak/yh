import { useEffect } from 'react';

const useScrollFix = () => {
    useEffect(() => {
        const overflow = 100;
        // eslint-disable-next-line prefer-const
        let originalHeight = window.innerHeight;

        const isIphone = () => {
            return /iPhone/.test(navigator.userAgent);
        };

        //console.log('isIphone: ', isIphone())

        const applyStyles = () => {
            if (!isIphone()) {
                document.body.style.overflowY = 'hidden';
                document.body.style.marginTop = `${overflow}px`;
                document.body.style.height = originalHeight + overflow + "px";
                document.body.style.paddingBottom = `${overflow}px`;
                window.scrollTo(0, overflow);
            }
        };

        if (!isIphone()) {
        applyStyles();
        }

        const handleResize = () => {
            if (!isIphone()) {
            const currentHeight = window.innerHeight;

            if (currentHeight < originalHeight) {
            // Клавиатура активна, удаляем отступ
                document.body.style.marginTop = `0px`;
                document.body.style.height = `${currentHeight}px`;
            } else {
                // Клавиатура скрыта, возвращаем отступ
                document.body.style.marginTop = `${overflow}px`;
                document.body.style.height = `${currentHeight + overflow}px`;
                window.scrollTo(0, overflow);
            }
            }
        };
        if (!isIphone()) {
        window.addEventListener('resize', handleResize);
        }

        return () => {
            if (!isIphone()) {
            window.removeEventListener('resize', handleResize);
            }
        };
    }, []);
};

export default useScrollFix;
