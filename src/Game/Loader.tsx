import React from 'react';
import s from './loader.module.css';

interface LoaderProps {
    progress: number;
}

const Loader: React.FC<LoaderProps> = ({ progress }) => {
    return (
        <div className={s.progressbar}>
            <h2 style={{ fontFamily: 'Impact' }}>YouHold Game</h2>
            <h3 style={{ fontFamily: 'Impact' }}>Early Access</h3>
            <div className={s.progress} style={{ width: `${progress}%` }} />
            <p>Loading...{Math.round(progress)}%</p>
        </div>
    );
};

export default Loader;
