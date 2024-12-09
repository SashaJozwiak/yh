import { useEffect, useState } from 'react';
import { useGameNav } from '../../state/gameNav';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import s from './map.module.css'
import { useMap } from '../../state/map';
import { City } from '../../types/MapTypes';
import { useDeck } from '../../state/deck';

import { Card } from '../../types/forGameState'
import { BuyUp } from './BuyUp/BuyUp';
import { useUserData } from '../../../store/main';
import WebApp from '@twa-dev/sdk';

//import { InCity } from './City/InCity';
import { InCity } from './City/InCity4';

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

    const myId = useUserData(state => state.user.internalId);
    const setNav = useGameNav(state => state.setPageNav)
    const [close, setClose] = useState<boolean>(false);

    const [city, setCity] = useState(false);

    const [selectedLocation, setSelectedLocation] = useState<City | null>(null);

    const [homeOn, setHomeOn] = useState<boolean>(false);
    const [homeList, setHomeList] = useState<City[]>([]);


    const [buyUp, setBuyUp] = useState<boolean>(false);

    const { cityList, setLoading, fetchCityList } = useMap(state => state);

    const cards = useDeck((state) => state.cards);
    const goldCardsCount = useDeck((state) =>
        state.cards.reduce((total, card) => total + card.grades.gold, 0)
    );

    const [cardsWithGold, setCardsWithGold] = useState<Card[]>([]); // Список карт с количеством золота

    const handleHome = () => {
        const homeList = cityList.filter((city) => city.user_id === myId);
        setHomeList(homeList)
        setHomeOn(prev => !prev)
    }

    const isHome = (cityId: number) => {
        return homeList.filter((city) => city.city_id === cityId).length > 0
        //return is_home ? 'rgb(204, 153, 0)'
    }



    const handleClose = () => {
        setClose(true);
        setTimeout(() => {
            setNav('main');
            //setClose(false);
        }, 500);
    } 

    const [pointsData, setPointsData] = useState<Point[] | null>(null);

    const chooseCity = (id: number) => {
        const city = cityList.find((city) => city.city_id === id)
        console.log('city: ', city)
        if (city) {
            setSelectedLocation(city)
            return;
        }

        setSelectedLocation({ user_id: -1, city_id: id, username: 'No', price: 1 })
    }

    useEffect(() => {
        // Фильтруем карты с количеством gold больше 0 и обновляем состояние компонента
        const filteredCards = cards.filter((card) => card.grades.gold > 0);
        setCardsWithGold(filteredCards);
    }, [cards]);

    useEffect(() => {
        console.log('Начинаю загрузку данных');
        setLoading(true);
        fetchCityList();
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
            .catch((error) => console.error("Ошибка при загрузке JSON:", error))
            .finally(() => {
                setLoading(false);
            });


    }, [fetchCityList, setLoading]);

    console.log('cityList: ', cityList)

    return (
        <>
            {city ? <InCity setCity={setCity} /> :
        <div className={`${s.container} ${close ? s.containerclosing : null}`}>

            {/* {city && <InCity setCity={setCity} />} */}
            {buyUp && <BuyUp cardsWithGold={cardsWithGold} setBuyUp={setBuyUp} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />}
            <header className={s.header}>

                {/* <p style={{ opacity: '0', padding: '0 0.5rem' }}>text</p> */}


                <button onClick={handleClose} className={s.back}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={'1.5rem'} strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </button>


                <h2 style={{ margin: '0 auto' }}>🟢Map</h2>

                <button
                    onClick={handleHome}
                            style={{ margin: '0.1rem', border: '1px solid', borderRadius: '0.3rem', backgroundColor: 'rgb(51 65 85)', padding: '0 0.3rem'/* , opacity: '0' */ }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={30} strokeWidth={1.5} stroke="currentColor" className="size-6">text
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>

                </button>
                {/* <p>text</p> */}


            </header>

            <div className={s.mapContainer} /* style={{ width: '100vw', height: '50vh' }} */>


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


                            <TransformComponent >
                                <svg viewBox="0 0 525 350" preserveAspectRatio="none" style={{ width: '100vw', borderRadius: '20vh' /* height: 'auto', *//*  border: '1px solid' */ }}>
                                    <rect width="525" height="350" style={{ fill: 'rgb(51 65 85)' }} />
                                    {pointsData?.map(point => {
                                        let circleData: CircleData;
                                        switch (point.type) {
                                            case 'path':
                                                //const pathData = point.data as PathData; // ?
                                                return (
                                                    <path
                                                        onClick={() => chooseCity(point.id)}
                                                        key={point.id}
                                                        d={point.data as string}
                                                        style={{ fill: point.id === selectedLocation?.city_id ? 'gray' : homeOn && isHome(point.id) ? 'rgb(204, 153, 0)' : cityList.some((city) => city.city_id === point.id) ? 'rgb(22, 163, 74)' : '#FFFFFF' }} />
                                                );
                                            case 'circle':
                                                circleData = point.data as CircleData;  // Приводим тип
                                                return (
                                                    <circle
                                                        onClick={() => chooseCity(point.id)}
                                                        key={point.id}
                                                        cx={circleData.cx}
                                                        cy={circleData.cy}
                                                        r={circleData.r}
                                                        style={{ fill: point.id === selectedLocation?.city_id ? 'gray' : homeOn && isHome(point.id) ? 'rgb(204, 153, 0)' : cityList.some((city) => city.city_id === point.id) ? 'rgb(22, 163, 74)' : '#FFFFFF' }}
                                                    />
                                                );
                                            default:
                                                return null; // другие случаи
                                        }
                                    })}
                                </svg>
                            </TransformComponent>
                            <div className={s.btnset}>
                                <button className={s.btn} onClick={() => zoomOut(0.5)}>-</button>
                                <button className={s.btn} onClick={() => resetTransform()}>reset</button>
                                <button className={s.btn} onClick={() => zoomIn(0.5)}>+</button>
                            </div>
                        </>
                    )}
                </TransformWrapper>

                    </div> 

            <div className={s.panel}>
                {selectedLocation === null &&
                    <h2 style={{ color: 'lightgray', margin: '0 auto' }}>Select a location</h2>}

                {selectedLocation !== null &&
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
                            <h2 style={{ color: selectedLocation?.username !== 'No' ? 'rgb(22, 163, 74)' : 'lightgray', margin: '0 auto' }}>City #{selectedLocation.city_id}</h2>
                            <p
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (selectedLocation?.username && selectedLocation?.username !== "No") {
                                        WebApp.openTelegramLink(`https://t.me/${selectedLocation?.username}`);
                                    }
                                }}
                            >Owner: <b style={{ color: selectedLocation?.username && selectedLocation?.username !== "No" ? 'rgb(22, 163, 74)' : 'white', textDecoration: selectedLocation?.username && selectedLocation?.username !== "No" ? 'underline' : 'none' }}>{selectedLocation?.user_id === myId ? 'YOU' : selectedLocation?.username || 'No'}</b></p>
                            <p>Price: <b>{selectedLocation?.price || 0 > 0 ? selectedLocation?.price + ' Gold Card' : 'price not set'}</b></p>
                            <p>You have : {goldCardsCount} Gold Cards</p>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button
                                    onClick={() => setBuyUp(true)}
                                    disabled={goldCardsCount === 0 || selectedLocation?.price === 0}
                                    style={{ opacity: goldCardsCount === 0 ? '0.5' : selectedLocation?.price === 0 ? '0.5' : '1' }}
                                    className={s.btnbuy}>BUY
                                </button>

                                <button
                                            //disabled={true}
                                            style={{ opacity: '0.5' }}
                                            onClick={() => {
                                                if (myId === 3441 || myId === 9 || myId === 10) {
                                                    setCity(true);
                                                } else {
                                                    console.log('closed');
                                                }
                                            }}
                                    className={s.btnbuy}>ENTER
                                </button>

                                <button
                                    //onClick={() => setBuyUp(true)}
                                    disabled={true}
                                    style={{ opacity: '0.5', fontSize: 'calc(1vh * 2)' }}
                                    className={s.btnbuy}>
                                    <p>Get NFT</p>
                                    <i>soon</i>
                                </button>

                            </div>


                            {/* {myId === selectedLocation?.user_id && <button className={s.btnbuy}>BUY</button>} */}

                        </div>

                    </div>
                }

            </div>

            {/* <footer className={s.footer}>
                <button onClick={handleClose} className={s.back}>BACK</button>
            </footer> */}


                </div>}
        </>
    )
}
