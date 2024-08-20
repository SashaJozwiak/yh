import { useEffect } from 'react';

const useScrollFix = () => {
    useEffect(() => {
        const overflow = 100;
        // eslint-disable-next-line prefer-const
        let originalHeight = window.innerHeight;

        const applyStyles = () => {
            document.body.style.overflowY = 'hidden';
            document.body.style.marginTop = `${overflow}px`;
            document.body.style.height = originalHeight + overflow + "px";
            document.body.style.paddingBottom = `${overflow}px`;
            window.scrollTo(0, overflow);
        };

        applyStyles();

        const handleResize = () => {
            const currentHeight = overflow;// window.innerHeight!!!

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
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
};

export default useScrollFix;
