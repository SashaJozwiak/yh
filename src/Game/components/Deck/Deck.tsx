import { useMemo, useState } from 'react';
import { Card } from '../../types/forGameState';

import { CardInDeck } from './CardInDeck/CardInDeck';
import { ShowCard } from './showCard/ShowCard';
import { ShowAddCards } from './ShowAddCards/ShowAddCards';

import { useGameNav } from '../../state/gameNav'
import { useDeck } from '../../state/deck';

import { getCards } from '../../utils/getCrads';
import { cardOrder } from '../../utils/deckOrder'

import { GradesSvg } from '../Some/GradesSvg'
import imgs from './charimg'
import s from './deck.module.css'

export const Deck: React.FC = () => {
    //const nav = useNav(state => state.page)
    const [close, setClose] = useState(false)
    const [showedCard, setShowedCard] = useState<string>('')
    const [addedCards, setAddedCards] = useState<Card[]>([]);
    const setNav = useGameNav(state => state.setPageNav)

    const isShowCard = useGameNav(state => state.showCard)
    const isShowGetCards = useGameNav(state => state.showGetCards)
    const setShowCard = useGameNav(state => state.setShowCard)
    const setShowGetCard = useGameNav(state => state.setShowGetCard)

    const Grade = useGameNav(state => state.deckGrade)
    const setGrade = useGameNav(state => state.setDeckGrade)

    const Cards = useDeck(state => state.cards)
    const randomCards = useDeck(state => state.randomCards)
    const addCards = useDeck(state => state.addCards)
    const clearRandomCards = useDeck(state => state.clearRandomCards)

    const save = useDeck(state => state.saveDeck)
    const buy = useDeck(state => state.buyRandomCards)

    const handleClose = () => {
        setClose(true);
        setTimeout(() => {
            setNav('main');
            setClose(false);
        }, 500);
    }

    const showCard = (name: string) => {
        if (!name) {
            console.log('return: ', name)
            return;
        }
        setShowedCard(name)
        setShowCard();
        console.log('show: ', name)
    }

    const getRandomCards = () => {
        if (randomCards < 1) {
            return;
        }
        const cardsForAdd = getCards(randomCards)
        console.log(cardsForAdd)
        setAddedCards(cardsForAdd)
        setShowGetCard();
        addCards(cardsForAdd);
        clearRandomCards();
        save();
    }

    const filteredAndPaddedCards = useMemo(() => {
        // Фильтруем карты в зависимости от значения Grade
        const filteredCards = Cards.filter(card => {
            if (Grade === 'all') {
                // Если выбран 'all', проверяем, есть ли хотя бы один грейд с количеством больше 0
                return (
                    card.grades.gray > 0 ||
                    card.grades.bronze > 0 ||
                    card.grades.silver > 0 ||
                    card.grades.gold > 0
                );
            } else {
                // Иначе фильтруем по конкретному грейду
                return card.grades[Grade] > 0;
            }
        });

        // Создаем объект для быстрого поиска карт по имени
        const cardMap = filteredCards.reduce((map, card) => {
            map[card.name] = card;
            return map;
        }, {});

        // Создаем таблицу, где каждая карта будет стоять на своем месте
        const orderedCards = cardOrder.map(name => {
            if (cardMap[name]) {
                // Возвращаем карту, если она есть в отфильтрованном списке
                return cardMap[name];
            } else {
                // Если карты нет, возвращаем пустую ячейку
                return {
                    id: name, // Уникальный для пустых карт
                    name: '',
                    grades: {
                        gray: 0,
                        bronze: 0,
                        silver: 0,
                        gold: 0,
                    },
                    img: 'empty', // Пустая карта
                    key_power: ''
                };
            }
        });

        return orderedCards;
    }, [Cards, Grade]);

    return (
        <>
            <div className={`${s.container} ${close ? s.containerclosing : null}`}>
                {isShowCard && <ShowCard name={showedCard} />}
                {isShowGetCards && <ShowAddCards cards={addedCards} />}

                <div className={s.ui}>
                    <div className={s.table}>
                        {filteredAndPaddedCards.map(card => (
                            <div
                                onClick={() => showCard(card.name)}
                                style={{ boxShadow: `0px 0px 25px rgb(${Grade === 'gray' ? '128 128 128' : Grade === 'bronze' ? '205 127 50' : Grade === 'silver' ? '154 154 154' : Grade === 'gold' ? '204 153 0' : '0 0 0'} / 50%)` }}
                                key={card.id} className={s.pixel}>
                                <CardInDeck grades={card.grades} name={card.name} img={imgs[card.img]} handleClose={handleClose} />
                            </div>
                        ))}
                    </div>

                    <div className={s.tabs}>
                        <button
                            onClick={() => setGrade('all')}
                            className={`${s.gradeBtn} ${Grade === 'all' ? s.gradeBtnOn : null}`}>
                            <GradesSvg color={'transparent'} stroke={'white'} /> <p>All</p>
                        </button>

                        <button
                            onClick={() => setGrade('gray')}
                            className={`${s.gradeBtn} ${Grade === 'gray' ? s.gradeBtnOn : null}`}>
                            <GradesSvg color={'transparent'} stroke={'gray'} /> <p style={{ color: 'gray' }}>Gray</p>
                        </button>

                        <button
                            onClick={() => setGrade('bronze')}
                            className={`${s.gradeBtn} ${Grade === 'bronze' ? s.gradeBtnOn : null}`}><GradesSvg color={'#cd7f32'} stroke={'white'} /><p style={{ color: '#cd7f32' }}>Bronze</p>
                        </button>

                        <button
                            onClick={() => setGrade('silver')}
                            className={`${s.gradeBtn} ${Grade === 'silver' ? s.gradeBtnOn : null}`}><GradesSvg color={'#9a9a9a'} stroke={'white'} /> <p style={{ color: '#9a9a9a' }}>Silver</p>
                        </button>

                        <button
                            onClick={() => setGrade('gold')}
                            className={`${s.gradeBtn} ${Grade === 'gold' ? s.gradeBtnOn : null}`}><GradesSvg color={'#CC9900'} stroke={'white'} /> <p style={{ color: '#CC9900' }}>Gold</p>
                        </button>
                    </div>
                </div>

                <footer className={s.footer}>
                    <button
                        className={s.fbtn}
                        onClick={handleClose}
                    >BACK</button>
                    <button
                        disabled={randomCards === 0}
                        style={{ opacity: randomCards === 0 ? '0.5' : '1' }}
                        onClick={getRandomCards}
                        className={s.fbtn}
                    >CLAIM <p>({randomCards})</p></button>
                    <button
                        onClick={() => buy()}
                        className={s.fbtn}
                    >BUY</button>
                </footer>
            </div >
        </>
    )
}
