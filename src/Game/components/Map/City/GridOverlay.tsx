/* 
export const GridOverlay = ({ imageWidth, imageHeight, tileWidth, tileHeight, backgroundPosition, offsetTop = 0 }) => {
    const horizontalLines = [];
    const verticalLines = [];

    const offsetX = backgroundPosition.x % tileWidth; // Остаток от деления для горизонтальной синхронизации
    const offsetY = (backgroundPosition.y % tileHeight) + offsetTop; // Остаток + смещение сверху

    // Генерация горизонтальных линий
    for (let y = 0; y <= imageHeight; y += tileHeight) {
        horizontalLines.push(
            <div
                key={`h-${y}`}
                style={{
                    position: 'absolute',
                    top: `${y + offsetY}px`,
                    left: '0',
                    width: `${imageWidth}px`,
                    height: '1px',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)', // Полупрозрачный красный
                    pointerEvents: 'none', // Не мешает взаимодействию
                }}
            />
        );
    }

    // Генерация вертикальных линий
    for (let x = 0; x <= imageWidth; x += tileWidth) {
        verticalLines.push(
            <div
                key={`v-${x}`}
                style={{
                    position: 'absolute',
                    top: '0',
                    left: `${x + offsetX}px`,
                    width: '1px',
                    height: `${imageHeight + offsetTop}px`,
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    pointerEvents: 'none',
                }}
            />
        );
    }

    return (
        <div
            style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: `${imageWidth}px`,
                height: `${imageHeight}px`,
                pointerEvents: 'none', // Чтобы сетка не мешала взаимодействию
            }}
        >
            {horizontalLines}
            {verticalLines}
        </div>
    );
};
 */
