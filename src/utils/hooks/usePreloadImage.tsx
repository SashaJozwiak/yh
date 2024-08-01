import { useEffect } from 'react';

const PreloadImages = ({ sources }) => {
    useEffect(() => {
        sources.forEach((src: string) => {
            const img = new Image();
            img.src = src;
    });
    }, [sources]);

    return null;
};

export default PreloadImages;
