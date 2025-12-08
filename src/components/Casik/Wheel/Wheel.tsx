import React, { useRef, useState, useEffect } from 'react';

import { useAuth } from '../../../store/main';
//import { useUHSWallet } from '../../../Earn/earnStore/UHSWallet';

import { useTonAddress } from '@tonconnect/ui-react';

import s from './wheel.module.css';
import { useSlotStore } from '../Slot/store/slot';

import { Error } from '../Slot/Error';

export const Wheel: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [winIndex, setWinIndex] = useState<number | null>(null);

    //const [freeSpins, setFreeSpins] = useState(1);


    const [bet,] = useState(0.50);

    const userId = useAuth(state => state.userId);
    const rawAddress = useTonAddress(false);
    const { balance, isError, spinRoulette: getSpin, setError } = useSlotStore();

    const segments = ['$0.10', '$0.25', '$0.50', '$1', '$2', '$5', '$10', '$20', '$50', '$100'];
    const segmentCount = segments.length;
    const segmentAngle = (2 * Math.PI) / segmentCount;

    const drawWheel = (ctx: CanvasRenderingContext2D) => {
        const radius = 150;
        ctx.clearRect(0, 0, 2 * radius + 20, 2 * radius + 20);
        ctx.save();
        ctx.translate(radius + 10, radius + 10);

        for (let i = 0; i < segmentCount; i++) {
            const startAngle = i * segmentAngle + rotation;
            const endAngle = startAngle + segmentAngle;

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, startAngle, endAngle);
            ctx.fillStyle = `hsl(${(i * 360) / segmentCount}, 70%, 50%)`;
            ctx.fill();
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.save();
            const textAngle = startAngle + segmentAngle / 2;
            ctx.rotate(textAngle);
            ctx.translate(radius * 0.6, 0);
            ctx.fillStyle = 'white';
            if (winIndex !== null && i === winIndex) {
                ctx.rotate(
                    Math.PI / 2
                );
                ctx.scale(1.2, 1.2)
            }
            ctx.font = 'bold 16px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(segments[i], 0, 0);
            ctx.restore();
        }
        ctx.restore();

        // Рисуем стрелку
        ctx.beginPath();
        ctx.moveTo(radius + 10, 10);
        ctx.lineTo(radius + 10 - 10, 0);
        ctx.lineTo(radius + 10 + 10, 0);
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
    };

    const spin = async () => {
        if (spinning) return;
        setSpinning(true);
        setWinIndex(null);

        /* setTimeout(() => {
            if (useSlotStore.getState().playRoll) useSlotStore.getState().playRoll();
            if (useSlotStore.getState().stopRoll) useSlotStore.getState().stopRoll();
        }, 3000) */


        //this
        let win; // объявляем снаружи
        if (userId) {
            win = await getSpin(userId, rawAddress);
        } else {
            setError(true);
            setSpinning(false);
            return; // прерываем функцию
        }


        setRotation(0);

        //const targetIndex = Math.floor(Math.random() * segmentCount);
        const targetIndex = await win.index;


        console.log(`Выигрышный сегмент: ${segments[targetIndex]}`);

        const spins = 5;
        const startTime = performance.now();
        const duration = 5000;

        // Угол, на который нужно повернуть, чтобы targetIndex оказался сверху
        const segmentCenterAngle = targetIndex * segmentAngle;
        const targetPosition = -Math.PI / 2; // Позиция стрелки (вверх)
        let angleToTarget = targetPosition - segmentCenterAngle;

        // Добавляем случайный сдвиг внутри сегмента (до 80% от его ширины)
        const randomOffset = segmentAngle * Math.random() * 0.8;
        angleToTarget -= randomOffset;

        // Если угол отрицательный, добавляем полный оборот
        if (angleToTarget < 0) {
            angleToTarget += 2 * Math.PI;
        }

        // Полный угол вращения: полные обороты + угол до целевого сегмента + сдвиг
        const totalRotation = spins * 2 * Math.PI + angleToTarget;

        const animate = (time: number) => {
            const elapsed = time - startTime;
            const t = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setRotation(eased * totalRotation);

            if (t < 1) {
                requestAnimationFrame(animate);
            } else {

                setRotation(totalRotation);
                console.log(`Остановились на сегменте: ${segments[targetIndex]}`);
                //alert(`Вы выиграли: ${segments[targetIndex]}!`);
                setWinIndex(targetIndex);
                useSlotStore.getState().playWin();

                setSpinning(false);
            }
        };

        requestAnimationFrame(animate);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                drawWheel(ctx);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rotation]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ position: 'absolute', right: 0, color: 'gray', fontSize: '0.8rem' }}>(RTP 95%)</span>
            <canvas ref={canvasRef} width={320} height={320} style={{ border: '4px solid #333', borderRadius: '50%' }} />
            <button
                onClick={spin}
                disabled={spinning || balance < bet}
                className={s.button}
                style={{
                    marginTop: '1vh',
                    padding: '12px 24px',
                    fontSize: 18,
                    backgroundColor: spinning || balance < bet ? 'gray' : 'rgb(40, 167, 69)',
                    boxShadow: spinning ? 'none' : 'rgba(0, 0, 0, 0.5) 0px 0px 13px 0px'

                }}>
                {spinning ? 'Rolling...' : `Roll - $${bet}`}
            </button>
            {isError && <Error />}
        </div>
    );
};
