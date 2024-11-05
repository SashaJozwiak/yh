import { useEffect, useState } from 'react';
import { useGameNav } from '../../state/gameNav';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import s from './map.module.css'

/* interface PathData {
    d: string; // Данные пути для типа path
} */

interface CircleData {
    cx: number; // Координата x центра
    cy: number; // Координата y центра
    r: number; // Радиус
}

interface Point {
    id: number;
    type: 'path' | 'circle'; // Задаем конкретные строки для типа
    data: string | CircleData; // data может быть либо PathData, либо CircleData
}

export const Map: React.FC = () => {

    const setNav = useGameNav(state => state.setPageNav)
    const [close, setClose] = useState<boolean>(false);


    const handleClose = () => {
        setClose(true);
        setTimeout(() => {
            setNav('main');
            //setClose(false);
        }, 500);
    }

    const [pointsData, setPointsData] = useState<Point[] | null>(null);

    useEffect(() => {
        console.log('useEffect запущен');
        // остальной код
    }, []);

    useEffect(() => {
        console.log('Начинаю загрузку данных');
        fetch('pointsData_6.json') // или '/pointsData.json'
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка сети: ' + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Полученные данные:', data);
                setPointsData(data);
            })
            .catch((error) => console.error("Ошибка при загрузке JSON:", error));
    }, []);


    return (
        <div className={`${s.container} ${close ? s.containerclosing : null}`}>
            <header className={s.header}>
                <button
                    onClick={handleClose}
                >back</button>

                <h2>Map</h2>

                <p>text</p>

            </header>

            <div className={s.mapContainer} style={{ width: '100vw', height: '60vh' }}>
                <TransformWrapper
                    initialScale={1}
                    initialPositionX={0}
                    initialPositionY={0}
                    maxPositionX={1000}
                /*  minPositionX={-700}
                 maxPositionX={100} 
                 minPositionY={-100} 
                 maxPositionY={100} 
                 centerZoomedOut={true}
                 centerOnInit={true}
                 wheel={{ step: 50 }} */
                >

                    {({ zoomIn, zoomOut, resetTransform }) => (
                        <>
                            <button onClick={() => zoomIn(0.5)}>Увеличить</button>
                            <button onClick={() => zoomOut(0.5)}>Уменьшить</button>
                            <button onClick={() => resetTransform()}>Сбросить</button>

                            <TransformComponent >
                                <svg viewBox="0 0 525 525" preserveAspectRatio="none" style={{ width: '100vw', height: 'auto', border: '1px solid' }}>
                                    <rect width="525" height="525" style={{ fill: '#1E8BC4' }} />
                                    {pointsData?.map(point => {
                                        let circleData: CircleData;
                                        switch (point.type) {
                                            case 'path':
                                                //const pathData = point.data as PathData; // ?
                                                return (
                                                    <path onClick={() => console.log(point.id)} key={point.id} d={point.data as string} style={{ fill: '#FFFFFF' }} />
                                                );
                                            case 'circle':
                                                circleData = point.data as CircleData;  // Приводим тип
                                                return (
                                                    <circle
                                                        key={point.id}
                                                        cx={circleData.cx}
                                                        cy={circleData.cy}
                                                        r={circleData.r}
                                                        style={{ fill: '#FFFFFF' }}
                                                    />
                                                );

                                            default:
                                                return null; // другие случаи
                                        }
                                    })}
                                </svg>
                            </TransformComponent>
                        </>
                    )}
                </TransformWrapper>
            </div>

            <button onClick={handleClose}>close</button>
        </div>
    )
}
