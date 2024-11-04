import { useEffect, useState } from 'react';

interface Point {
    id: number;
    path: string;
}

export const MapSvg = () => {
    const [pointsData, setPointsData] = useState<Point[] | null>(null);

    useEffect(() => {
        console.log('useEffect запущен');
        // остальной код
    }, []);

    useEffect(() => {
        console.log('Начинаю загрузку данных');
        fetch('pointsData.json') // или '/pointsData.json'
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
        <div>
            <h2>Map</h2>
            {pointsData ? (
                pointsData.length > 0 ? (
                    pointsData.map((point) => (
                        <p key={point.id}>ID: {point.id}, Path: {point.path}</p>
                    ))
                ) : (
                    <p>Нет данных для отображения.</p>
                )
            ) : (
                <p>Загрузка данных...</p>
            )}
        </div>
    );
};
