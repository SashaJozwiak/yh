import { useCallback, useEffect, useRef, useState } from 'react';


import city_bg from './assets/city_3_2.png';
import char from './assets/char.png';
import elka from './assets/elka.gif'

//import { GridOverlay } from './GridOverlay';


import s from './incity.module.css';

window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};



// Процентные координаты: x = 50% ширины, y = 30% высоты

/* const imageWidth = 1100; // Ширина изображения
const imageHeight = 1100; // Высота изображения

const tileWidth = 100;
const tileHeight = 100; */
//let { imageWidth, imageHeight, tileWidth, tileHeight } = calculateBackgroundSize();

const collisionMap = [
    // Пример карты коллизий для фона
    // 0 — проходимо, 1 — препятствие
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];



export const InCity = ({ setCity }) => {
    const [btnColorUp, setBtnColorUp] = useState('lightgray');
    const [btnColorDown, setBtnColorDown] = useState('lightgray');
    const [btnColorRight, setBtnColorRight] = useState('lightgray');
    const [btnColorLeft, setBtnColorLeft] = useState('lightgray');

    /* const areaWidth = window.innerWidth; // Ширина области для отображения
    const areaHeight = window.innerHeight * 0.65;  //Высота области для отображения (исключая header и footer) */

    const headerHeight = window.innerHeight * 0.1;  // Высота header (10vh)
    const footerHeight = window.innerHeight * 0.25;  // Высота footer (25vh)
    const areaHeight = window.innerHeight - headerHeight - footerHeight;  // Высота области для отображения

    const areaTop = headerHeight;  // Верхняя граница области (с учетом header)
    //const areaBottom = footerHeight;  // Нижняя граница области (с учетом footer)

    const areaWidth = window.innerWidth;  // Ширина области по всей ширине окна

    const calculateBackgroundSize = () => {
        // Минимальное увеличение фона относительно экрана (например, 1.5x)
        const scaleFactor = 3;

        // Размер фона зависит от размеров экрана с учетом увеличения
        const imageWidth = window.innerWidth * scaleFactor;
        const imageHeight = (window.innerHeight - headerHeight - footerHeight) * scaleFactor;

        // Размер одного тайла (рассчитываем как пропорцию)
        const tileWidth = imageWidth / collisionMap[0].length;
        const tileHeight = imageHeight / collisionMap.length;

        return { imageWidth, imageHeight, tileWidth, tileHeight };
    };
    const { imageWidth, imageHeight, tileWidth, tileHeight } = calculateBackgroundSize();

    const elkaPosition = { x: 50, y: 50 };

    const checkCollision = useCallback((x: number, y: number) => {
        // Преобразуем абсолютные координаты персонажа в глобальные координаты на карте
        const globalX = Math.abs(x);
        const globalY = Math.abs(y);

        // Преобразуем глобальные координаты в индексы ячеек
        const tileX = Math.floor(globalX / tileWidth);
        const tileY = Math.floor(globalY / tileHeight);

        console.log('collision: ', x, y, globalX, globalY, tileX, tileY, collisionMap[tileY], collisionMap[tileY][tileX]);

        // Проверяем, существует ли такая ячейка в карте
        if (tileY >= 0 && tileY < collisionMap.length && tileX >= 0 && tileX < collisionMap[0].length) {
            console.log('collision: ', x, y, globalX, globalY, tileX, tileY, collisionMap[tileY], collisionMap[tileY][tileX]);
            return collisionMap[tileY][tileX] === 1;
        }

        // Если индекс за пределами карты, возвращаем true (считаем это препятствием)
        return true;
    }, [tileHeight, tileWidth]);


    const [backgroundPosition, setBackgroundPosition] = useState({ x: -600, y: -500 });
    const [charPosition, setCharPosition] = useState({ x: areaWidth / 2, y: areaHeight / 2 })
    const [charView, setCharView] = useState({ x: 0, y: 64 * 10 }); // Начальная позиция текстуры персонажа

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const step = 10; // Шаг перемещения персонажа
    const animationFrames = 8; // Количество кадров анимации





    // Обработчик нажатий клавиш
    const handleKeyDown = useCallback(
        (event) => {
            if (intervalRef.current) return; // Избегаем наложения интервалов

            let i = 0; // Индекс текущего кадра анимации
            let movedBackground = false; // Флаг для проверки сдвига фона


            let isCharHorizontallyCenteredLeft = Math.abs(charPosition.x) <= areaWidth / 2;
            let isCharHorizontallyCenteredRight = Math.abs(charPosition.x) >= areaWidth / 2;

            let isCharVerticallyCenteredDown = Math.abs(charPosition.y) >= areaHeight / 2;
            let isCharVerticallyCenteredUP = Math.abs(charPosition.y) <= areaHeight / 2;

            //collisions block




            const move = () => {
                let currentCharPosition = { ...charPosition }; // Локальная копия позиции персонажа
                let currentBackgroundPosition = { ...backgroundPosition }; // Локальная копия позиции фона

                setBackgroundPosition((prevBackgroundPos) => {
                    let newX = prevBackgroundPos.x;
                    let newY = prevBackgroundPos.y;

                    console.log('initial, backchar: ', currentBackgroundPosition, currentCharPosition);
                    console.log('move precheck collision (background x,y): ', newX, newY);

                    const isCollision = checkCollision(
                        currentCharPosition.x - newX,
                        currentCharPosition.y - newY
                    );

                    if (isCollision) {
                        console.log('Collision detected, stopping movement.');
                        return prevBackgroundPos; // Останавливаем движение фона
                    }

                    // Логика движения фона
                    switch (event.key) {
                        case "ArrowUp":
                            setCharView((prev) => ({ ...prev, y: 64 * 8 })); // Ряд спрайтов вверх
                            if (checkCollision(currentCharPosition.x - newX, currentCharPosition.y - (newY + step))) {
                                //newY -= step;
                                //movedBackground = false;
                                break;
                            }
                            if (isCharVerticallyCenteredUP && newY <= 0) {
                                newY += step;
                                movedBackground = true;
                            } else {
                                movedBackground = false;
                            }
                            break;

                        case "ArrowDown":
                            setCharView((prev) => ({ ...prev, y: 64 * 10 })); // Ряд спрайтов вниз
                            if (checkCollision(currentCharPosition.x - newX, currentCharPosition.y - (newY - step))) {
                                //newY += step;
                                //movedBackground = false;
                                break;
                            }
                            if (isCharVerticallyCenteredDown && newY >= -(imageHeight - areaHeight)) {
                                newY -= step;
                                movedBackground = true;
                            } else {
                                movedBackground = false;
                            }
                            break;

                        case "ArrowLeft":
                            setCharView((prev) => ({ ...prev, y: 64 * 9 })); // Ряд спрайтов влево
                            if (checkCollision(currentCharPosition.x - (newX + step), currentCharPosition.y - newY)) {
                                //newX -= step;
                                //movedBackground = false;
                                break;
                            }
                            if (isCharHorizontallyCenteredLeft && newX <= 0) {
                                newX += step;
                                movedBackground = true;
                            } else {
                                movedBackground = false;
                            }
                            break;

                        case "ArrowRight":
                            setCharView((prev) => ({ ...prev, y: 64 * 11 })); // Ряд спрайтов вправо
                            if (checkCollision(currentCharPosition.x - (newX - step), currentCharPosition.y - newY)) {
                                //newX += step;
                                //movedBackground = false;
                                break;
                            }
                            if (isCharHorizontallyCenteredRight && newX >= -(imageWidth - areaWidth)) {
                                newX -= step;
                                movedBackground = true;
                            } else {
                                movedBackground = false;
                            }
                            break;

                        default:
                            break;
                    }

                    currentBackgroundPosition = { x: newX, y: newY };
                    //return movedBackground ? { x: newX, y: newY } : prevBackgroundPos;
                    return { x: newX, y: newY };
                    // Возвращаем обновленные позиции фона, если фон был сдвинут
                    /* if (!checkCollision(charPosition.x - newX, charPosition.y - newY)) {
                        return movedBackground ? { x: newX, y: newY } : prevBackgroundPos;
                    } else {
                        return { x: prevBackgroundPos.x, y: prevBackgroundPos.y };
                    } */

                });

                // Если фон не двигается, двигаем персонажа
                if (!movedBackground) {
                    setCharPosition((prevCharPos) => {
                        let charX = prevCharPos.x;
                        let charY = prevCharPos.y;

                        isCharVerticallyCenteredDown = Math.abs(charY) >= areaHeight / 2;
                        isCharVerticallyCenteredUP = Math.abs(charY) <= areaHeight / 2;

                        isCharHorizontallyCenteredLeft = Math.abs(charX) <= areaWidth / 2;
                        isCharHorizontallyCenteredRight = Math.abs(charX) >= areaWidth / 2;

                        switch (event.key) {
                            case "ArrowUp":
                                if ((!isCharVerticallyCenteredUP || !movedBackground) && charY > areaTop) {
                                    if (!checkCollision(charX - currentBackgroundPosition.x, charY - step - currentBackgroundPosition.y)) {
                                        charY -= step;
                                    }
                                }
                                break;

                            case "ArrowDown":
                                if ((!isCharVerticallyCenteredDown || !movedBackground) && charY < areaHeight) {
                                    if (!checkCollision(charX - currentBackgroundPosition.x, charY + step - currentBackgroundPosition.y)) {
                                        charY += step;
                                    }
                                }
                                break;

                            case "ArrowLeft":
                                if ((!isCharHorizontallyCenteredLeft || !movedBackground) && charX > 0) {
                                    if (!checkCollision(charX - step - currentBackgroundPosition.x, charY - currentBackgroundPosition.y)) {
                                        charX -= step;
                                    }
                                }
                                break;

                            case "ArrowRight":
                                if ((!isCharHorizontallyCenteredRight || !movedBackground) && charX < areaWidth) {
                                    if (!checkCollision(charX + step - currentBackgroundPosition.x, charY - currentBackgroundPosition.y)) {
                                        charX += step;
                                    }
                                }
                                break;

                            default:
                                break;
                        }


                        // Возвращаем обновленную позицию персонажа
                        /* if (!checkCollision(charX - backgroundPosition.x, charY - backgroundPosition.y)) {
                            return { x: charX, y: charY };
                        } else {
                            return prevCharPos;
                        } */
                        currentCharPosition = { x: charX, y: charY };

                        return { x: charX, y: charY };
                    });
                }

                // Обновление текущего кадра спрайтов
                i = (i + 1) % animationFrames;
                setCharView((prev) => ({ ...prev, x: 64 * i }));
            };

            // Устанавливаем интервал для анимации
            intervalRef.current = setInterval(move, 50);
        },
        [charPosition, areaWidth, areaHeight, backgroundPosition, checkCollision, imageHeight, imageWidth, areaTop]
    );





    // Остановка анимации при отпускании клавиши
    const handleKeyUp = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setCharView((prev) => ({ ...prev, x: 0 })); // Остановка анимации
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    //console.log('charPosition: ', charPosition)
    //console.log('backgroundPosition: ', backgroundPosition)
    //console.log('areaWidth: ', areaWidth, 'areaHeight:', areaHeight)

    return (
        <div className={s.container}>
            <div
                style={{
                    height: '10vh',
                    padding: '0 1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'rgb(51, 65, 85)',
                    boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 25px 5px',
                    zIndex: "300",
                }}
                onClick={() => setCity(false)}
            >
                <button className={s.back}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={'1.5rem'} strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </button>
                <p>City #1504</p>
                <p>Mayor: @zwiak</p>
            </div>

            <div
                className={s.area}
                style={{
                    overflow: "hidden", // Скрываем выходящие части изображения
                    //border: "1px solid black",
                    backgroundImage: `url(${city_bg})`,
                    backgroundPosition: `${backgroundPosition.x}px ${backgroundPosition.y}px`,
                    backgroundRepeat: 'no-repeat',
                    width: areaWidth,
                    height: areaHeight,
                }}
                onClick={(e) => console.log('e: ', e.clientX, e.clientY)}

            >


                {/* <GridOverlay
                    imageWidth={imageWidth}
                    imageHeight={imageHeight}
                    tileWidth={tileWidth}
                    tileHeight={tileHeight}
                    backgroundPosition={backgroundPosition}
                    offsetTop={window.innerHeight * 0.1}
                /> */}

                <div
                    className="character"
                    style={{
                        position: "absolute",
                        //top: "50%",
                        //left: "50%",
                        top: `${charPosition.y}px`,
                        left: `${charPosition.x}px`,
                        width: "60px",
                        height: "70px",
                        //transform: "translate(-50%, -50%)",
                        background: `url(${char})`,
                        backgroundPosition: `${-charView.x}px ${-charView.y}px`,

                    }}
                ><p style={{ position: 'relative', zIndex: '500' }}>username</p></div>

                <img
                    style={{
                        position: "absolute",
                        width: tileWidth * 0.9,
                        height: tileHeight * 1.5,
                        //top: `${(elkaPosition.y / 100) * imageHeight - (-backgroundPosition.y)}px`,
                        //left: `${(elkaPosition.x / 100) * imageWidth - (-backgroundPosition.x)}px`,
                        top: `${(elkaPosition.y / 100) * 1100 + backgroundPosition.y}px`,
                        left: `${(elkaPosition.x / 100) * 1100 + backgroundPosition.x}px`,
                        zIndex: "200",


                    }}
                    src={elka} alt="elka_pic" />
            </div>

            <div
                style={{ height: '25vh', zIndex: "300", backgroundColor: 'rgb(51, 65, 85)', display: 'flex', justifyContent: 'space-between', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 25px 5px' }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: '1' }}>

                    <div>
                        <button
                            className={s.btns}
                            onTouchStart={() => {
                                handleKeyDown({ key: 'ArrowUp' })
                                setBtnColorUp('white')
                            }}
                            onTouchEnd={() => {
                                handleKeyUp()
                                setBtnColorUp('lightgray')
                            }}
                            style={{ width: '15vw', height: '6vh', backgroundColor: btnColorUp === 'white' ? 'gray' : '#1a1a1a' }}
                        ><svg viewBox="0 0 9 14" width={'10vw'} height={'5vh'} style={{ transform: 'rotate(270deg)', fill: btnColorUp }}>
                                <path d="M6.660,8.922 L6.660,8.922 L2.350,13.408 L0.503,11.486 L4.813,7.000 L0.503,2.515 L2.350,0.592 L8.507,7.000 L6.660,8.922 Z" />
                            </svg></button>
                    </div>


                    <div style={{ display: 'flex', justifyContent: 'center', gap: '5vw' }}>
                        <button
                            className={s.btns}
                            onTouchStart={() => {
                                handleKeyDown({ key: 'ArrowLeft' })
                                setBtnColorLeft('white')
                            }}
                            onTouchEnd={() => {
                                handleKeyUp()
                                setBtnColorLeft('lightgray')
                            }}
                            style={{ width: '15vw', height: '6vh', backgroundColor: btnColorLeft === 'white' ? 'gray' : '#1a1a1a' }}
                        ><svg viewBox="0 0 9 14" width={'10vw'} height={'5vh'} style={{ transform: 'rotate(180deg)', fill: btnColorLeft }}>
                                <path d="M6.660,8.922 L6.660,8.922 L2.350,13.408 L0.503,11.486 L4.813,7.000 L0.503,2.515 L2.350,0.592 L8.507,7.000 L6.660,8.922 Z" />
                            </svg></button>
                        <button
                            className={s.btns}
                            onTouchStart={() => {
                                handleKeyDown({ key: 'ArrowRight' })
                                setBtnColorRight('white')
                            }
                            }
                            onTouchEnd={() => {
                                handleKeyUp()
                                setBtnColorRight('lightgray')
                            }
                            }
                            style={{ width: '15vw', height: '6vh', backgroundColor: btnColorRight === 'white' ? 'gray' : '#1a1a1a' }}
                        ><svg viewBox="0 0 9 14" width={'10vw'} height={'5vh'} style={{ fill: btnColorRight }}>
                                <path d="M6.660,8.922 L6.660,8.922 L2.350,13.408 L0.503,11.486 L4.813,7.000 L0.503,2.515 L2.350,0.592 L8.507,7.000 L6.660,8.922 Z" />
                            </svg></button>

                    </div>

                    <div><button
                        className={s.btns}
                        onTouchStart={() => {
                            handleKeyDown({ key: 'ArrowDown' })
                            setBtnColorDown('white')
                        }}
                        onTouchEnd={() => {
                            handleKeyUp()
                            setBtnColorDown('lightgray')
                        }}
                        style={{ width: '15vw', height: '6vh', backgroundColor: btnColorDown === 'white' ? 'gray' : '#1a1a1a' }}
                    ><svg viewBox="0 0 9 14" width={'10vw'} height={'5vh'} style={{ transform: 'rotate(90deg)', fill: btnColorDown }}>
                            <path d="M6.660,8.922 L6.660,8.922 L2.350,13.408 L0.503,11.486 L4.813,7.000 L0.503,2.515 L2.350,0.592 L8.507,7.000 L6.660,8.922 Z" />
                        </svg></button></div>
                </div>

                {/* <div style={{ border: '1px solid', flexGrow: '1' }}>DATA</div> */}

                <div style={{ flexGrow: '1', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <button
                        className={s.btnPush}
                        style={{ color: 'transparent', backgroundColor: 'lightgray', borderRadius: '50%', aspectRatio: '1/1', opacity: '0.5' }}
                    >BIG BUTTON</button>
                </div>


            </div>

        </div >
    );
}
