//import { useEffect } from 'react';

const usePreloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => reject();
    });
};
export default usePreloadImage;
