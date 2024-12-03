import { create } from 'zustand'
import { PlayCardState, Skill, Item, PlayCard } from '../types/playCard'

import { devtools } from 'zustand/middleware'
//import { ArenaCard } from '../types/Arena';
import { useArena } from './mainArena';

import { charDeck } from '../exmpl/charDeck_big';
import { statGrades } from '../exmpl/statsGrades';
import { useDeck } from './deck';

export const usePlayCard = create<PlayCardState>()(devtools((set, get) => ({
    playCard: {
        id: 1,
        lvl: 0,
        exp: 0,
        exp_points: 0,
        name: "Jack",
        profession: "Investor",
        description: "Investor",
        image: "investor",
        key_power: 'balance',
        balance_hp: 200,
        energy_mp: 150,
        stats: {
            balance: 20,
            mind: 15,
            energy: 15,
        },
        skills: [
            {
                name: "Kick",
                id: 1,
                description: "Just kick (default)",
                //image: "kick",
                cost: 0,
                target: 'enemy',
                multiplier: 1,
                bp: [25, 2],
                amount: 0,
            },
            {
                name: "Refuse",
                id: 2,
                description: "Refuse to finance",
                //image: "reftofin",
                cost: 20,
                target: 'enemy',
                multiplier: 1.2,
                bp: [104, 25],
                amount: 0,
            },
            {
                name: "Profitable",
                id: 3,
                description: "Profitable investment in project",
                //image: "profitableInvestment",
                cost: 30,
                target: 'enemy',
                multiplier: 1.3,
                bp: [0, 0],
                amount: 0,
            },
            {
                name: "Buy",
                id: 4,
                description: "Buy a project",
                //image: "buyProject",
                cost: 40,
                target: 'enemy',
                multiplier: 1.6,
                bp: [78, 25],
                amount: 0,
            }
        ],
        items: [
            {
                id: 1001,
                name: "Balance Potion(HP)",
                description: "Balance Potion",
                color: "rgb(204, 153, 0)",
                amount: 3,
                cost: 0,
                multiplier: 1,
                target: 'self',
                bp: [0, 0]
            },
            {
                id: 1002,
                name: "Energy Potion(MP)",
                description: "Energy Potion",
                color: "rgb(22 163 74)",
                amount: 3,
                cost: 0,
                multiplier: 1,
                target: 'self',
                bp: [0, 0]
            },
            {
                id: 1003,
                name: "Experience  Potion",
                description: "Exp Potion",
                color: "silver",
                amount: 3,
                cost: 0,
                multiplier: 1,
                target: 'self',
                bp: [0, 0]
            },
            {
                id: 1004,
                name: "Bal+Enrg",
                description: "Bal+Enrg Potion",
                color: "gray",
                amount: 3,
                cost: 0,
                multiplier: 1,
                target: 'self',
                bp: [0, 0]
            }
        ],
        inventory: [],
    },
    battleState: {
        step: 0,
        getDamage: '',
        enemy: {
            id: 0,
            name: 'Empty',
            type: 'enemies',
            bp: [0, 0],
            multiplier: 1,
            balance: 0,
            attack: 0,
        }
    },
    forSave: {
        gameProgress: false,
        cards: 0,
        UH: 0,
        B: 0,
        count: 0,
    },
    addExpAnim: false,
    lose: false,
    winUp: false,
    rewardUp: false,
    collectUp: false,
    nextFloor: false,
    inBattle: false,
    selectedSkill: null,
    tabNav: 'skills',
    buyItems: (itemData) => {
        console.log('state for Buy: ', itemData);
        //here transfer -UH cost 

        set((state) => ({
            playCard: {
                ...state.playCard,
                items: state.playCard.items.map(item => {
                    const itemAmount = itemData[item.id];
                    if (itemAmount) {
                        return { ...item, amount: item.amount + itemAmount };
                    }
                    return item;
                })
            }
        }));
    },
    resetForSave: () => {
        set((state) => ({
            ...state,
            forSave: {
                gameProgress: false, cards: 0, UH: 0, B: 0, count: 0
            },
        }))
    },
    loadCharacter: (character_state) => {
        console.log('character_state: ', character_state)
        set((state) => ({
            ...state,
            playCard: character_state.playCard,
        }))
    },
    chooseHero: (name) => {
        const deck = useDeck.getState().cards;

        const findMaxGrade = (grades) => {
            if (grades.gold > 0) return 'gold';
            if (grades.silver > 0) return 'silver';
            if (grades.bronze > 0) return 'bronze';
            return 'gray'; // По умолчанию
        };

        const newChar = charDeck.filter((card: PlayCard) => card.name === name)

        const deckCard = deck.find(card => card.name === name)

        // Определить грейд героя
        const heroGrade = deckCard ? findMaxGrade(deckCard.grades) : 'gray';

        const newStats = statGrades[name][heroGrade];

        console.log('newChar: ', newChar);
        console.log('herograde: ', heroGrade);
        console.log('newStats: ', newStats);

        const updatedPlayCard = {
            ...newChar[0],
            balance_hp: newStats.balance_hp,
            energy_mp: newStats.energy_mp,
            stats: newStats.stats, 
        };

        set((state) => ({
            ...state,
            battleState: {
                step: 0,
                getDamage: '',
                enemy: {
                    id: 0,
                    name: 'Empty',
                    type: 'enemies',
                    bp: [0, 0],
                    multiplier: 1,
                    balance: 0,
                    attack: 0,
                }
            },
            forSave: {
                gameProgress: false,
                cards: 0,
                UH: 0,
                B: 0,
                count: 0,
            },
            playCard: updatedPlayCard,
        }))

    },
    nextHouse: () => {
        const name = get().playCard.name
        const newChar = charDeck.filter((card: PlayCard) => card.name === name)

        const deck = useDeck.getState().cards;

        const findMaxGrade = (grades) => {
            if (grades.gold > 0) return 'gold';
            if (grades.silver > 0) return 'silver';
            if (grades.bronze > 0) return 'bronze';
            return 'gray'; // По умолчанию
        };

        const deckCard = deck.find(card => card.name === name)

        // Определить грейд героя
        const heroGrade = deckCard ? findMaxGrade(deckCard.grades) : 'gray';

        const newStats = statGrades[name][heroGrade];

        const updatedPlayCard = {
            ...newChar[0],
            balance_hp: newStats.balance_hp,
            energy_mp: newStats.energy_mp,
            stats: newStats.stats,
        };


        set((state) => ({
            ...state,
            battleState: {
                step: 0,
                getDamage: '',
                enemy: {
                    id: 0,
                    name: 'Empty',
                    type: 'enemies',
                    bp: [0, 0],
                    multiplier: 1,
                    balance: 0,
                    attack: 0,
                }
            },
            /* forSave: {
                gameProgress: false,
                cards: 0,
                UH: 0,
                B: 0,
                count: 0,
            }, */
            playCard: updatedPlayCard,
        }))
        useArena.getState().addHouse();

    },
    setLose: (isTrue) => {
        set({ lose: isTrue })
    },
    losing: () => {

        const name = get().playCard.name
        const newChar = charDeck.filter((card: PlayCard) => card.name === name)

        const deck = useDeck.getState().cards;

        const findMaxGrade = (grades) => {
            if (grades.gold > 0) return 'gold';
            if (grades.silver > 0) return 'silver';
            if (grades.bronze > 0) return 'bronze';
            return 'gray'; // По умолчанию
        };

        const deckCard = deck.find(card => card.name === name)

        // Определить грейд героя
        const heroGrade = deckCard ? findMaxGrade(deckCard.grades) : 'gray';

        const newStats = statGrades[name][heroGrade];

        const updatedPlayCard = {
            ...newChar[0],
            balance_hp: newStats.balance_hp,
            energy_mp: newStats.energy_mp,
            stats: newStats.stats,
        };


        set((state) => ({
            ...state,
            battleState: {
                step: 0,
                getDamage: '',
                enemy: {
                    id: 0,
                    name: 'Empty',
                    type: 'enemies',
                    bp: [0, 0],
                    multiplier: 1,
                    balance: 0,
                    attack: 0,
                }
            },
            forSave: {
                gameProgress: false,
                cards: 0,
                UH: 0,
                B: 0,
                count: 0,
            },
            playCard: updatedPlayCard,
        }))


        /* const charId = get().playCard.id
        const newChar = charDeck.filter((card: PlayCard) => card.id === charId)

        console.log('new char: ', newChar)
        set((state) => ({
            ...state,
            battleState: {
                step: 0,
                getDamage: '',
                enemy: {
                    id: 0,
                    name: 'Empty',
                    type: 'enemies',
                    bp: [0, 0],
                    multiplier: 1,
                    balance: 0,
                    attack: 0,
                }
            },
            forSave: {
                gameProgress: false,
                cards: 0,
                UH: 0,
                B: 0,
                count: 0,
            },
            playCard: newChar[0],
        })) */
        //useArena.getState().reset();
        //get().setLose(true)

    },
    addForSave: (id) => {
        set(state => (
            {
                forSave: {
                    ...state.forSave,
                    cards: id === 2004 ? state.forSave.cards + 1 : state.forSave.cards,
                    UH: id === 2001 ? state.forSave.UH + 50 : id === 2002 ? state.forSave.UH + 100 : state.forSave.UH,
                    B: id === 2003 ? state.forSave.B + 50 : state.forSave.B,
                    count: state.forSave.count + 1
                }
            }
        ))
    },
    toggleReward: (isTrue) => {
        set({ rewardUp: isTrue })
    },
    toggleCollect: (isTrue) => {
        set({ collectUp: isTrue })
    },
    goNextFloor: (isTrue) => {
        set({ nextFloor: isTrue })
    },
    closeWin: () => {
        set({ winUp: false })
    },
    setGetDamage: (who) => {
        set(state => ({
            ...state,
            battleState: {
                ...state.battleState, getDamage: who
            }
        }))
    },
    endBattle: () => {
        set({ inBattle: false });
        set((state) => ({
            ...state,
            battleState: {
                ...state.battleState,
                step: 0
            }
        }))
    },
    startBattle: (card) => {
        const enemyOrBoss = {
            'enemies': 100,
            'boss': 18,
        }
        const floor = useArena.getState().floor;
        const house = useArena.getState().house;
        //for Player attacks
        const basePower = get().playCard.key_power;
        const selectSkill = get().selectedSkill || get().playCard.skills[0];
        const playerAttack = get().playCard.stats[basePower] * selectSkill.multiplier || 1;

        //console.log('selectSkill: ', selectSkill);

        //for Enemy attacks
        //const enemy = get().battleState.enemy;

        const getDamage = get().battleState.getDamage;

        console.log('playerAttack: ', playerAttack);
        console.log('getDamage: ', getDamage)

        if (get().playCard.energy_mp - (selectSkill.cost * selectSkill.multiplier) <= 0) {
            return;
        }

        set({ inBattle: true });

        if (get().battleState.step === 0) {
            get().setGetDamage('enemy')
            setTimeout(() => get().setGetDamage(''), 1000);

            set((state) => ({
                ...state,
                playCard: {
                    ...state.playCard,
                    energy_mp: state.playCard.energy_mp - (selectSkill.cost * selectSkill.multiplier) > 0 ? state.playCard.energy_mp - (selectSkill.cost * selectSkill.multiplier) : 0,
                },
                inBattle: true,
                battleState: {
                    ...state.battleState,
                    step: state.battleState.step + 1,
                    enemy: {
                        ...card,
                        balance: Number(((card.balance * (floor / enemyOrBoss[card.type] + 1)) * (house / 100 + 1)).toFixed()) - playerAttack > 0 ?
                            Number(((card.balance * (floor / enemyOrBoss[card.type] + 1)) * (house / 100 + 1)).toFixed()) - playerAttack : 0,
                        attack: Number(((card.attack * (floor / enemyOrBoss[card.type] + 1)) * (house / 100 + 1)).toFixed()),
                    }
                }
            }));

            setTimeout(() => {
                if (get().battleState.enemy.balance <= 0) {
                    set({ winUp: true });
                }

            }, 1000)


        } else if (get().battleState.step > 0) {
            get().setGetDamage('enemy')
            setTimeout(() => get().setGetDamage(''), 1000);

            set((state) => ({
                ...state,
                playCard: {
                    ...state.playCard,
                    energy_mp: state.playCard.energy_mp - (selectSkill.cost * selectSkill.multiplier) > 0 ? state.playCard.energy_mp - selectSkill.cost : 0,
                },
                inBattle: true,
                battleState: {
                    ...state.battleState,
                    step: state.battleState.step + 1,
                    enemy: {
                        ...state.battleState.enemy,
                        balance: Number(Math.max(state.battleState.enemy.balance - playerAttack, 0).toFixed())
                    }
                }
            }));

            setTimeout(() => {
                if (get().battleState.enemy.balance <= 0) {
                    set({ winUp: true });
                }
            }, 1000)

        }

        setTimeout(() => {
            const updatedEnemy = get().battleState.enemy;
            const enemyAttack = updatedEnemy.attack - get().playCard.stats.mind >= 0 ? updatedEnemy.attack - get().playCard.stats.mind : 0
            const playerBalance = get().playCard.balance_hp;
            console.log('updatedEnemyMinusMind: ', enemyAttack);

            if (updatedEnemy && 'balance' in updatedEnemy && updatedEnemy.balance > 0) {
                get().setGetDamage('hero');
                setTimeout(() => get().setGetDamage(''), 1000);

                set((state) => ({
                    ...state,
                    playCard: {
                        ...state.playCard,
                        balance_hp: state.playCard.balance_hp - enemyAttack >= 0 ? state.playCard.balance_hp - enemyAttack : 0,
                    }
                }));

                if (playerBalance - (updatedEnemy.attack - get().playCard.stats.mind) <= 0) {
                    get().setLose(true);
                }
            }

            //console.log('addEnemy: ', updatedEnemy);
        }, 1100);

        //console.log('addEnemy: ', get().battleState.enemy);
    },
    addItem: (itemId) => {
        const item = get().playCard.items.find(item => item.id === itemId);
        if (!item) {
            console.warn(`Item with id ${itemId} not found.`);
            return;
        }

        const updatedItems = get().playCard.items.map(currentItem => {
            if (currentItem.id === itemId) {
                return { ...currentItem, amount: currentItem.amount + 1 };
            }
            return currentItem;
        })

        set((state) => ({
            ...state,
            playCard: {
                ...state.playCard,
                items: updatedItems,
            }
        }));

    },
    useItem: (itemId: number) => {
        const item = get().playCard.items.find(item => item.id === itemId);
        //console.log('itemFull: ', item);

        //добавить Reset skills cooldown (1004)

        if (!item || item.amount === 0) {
            get().selectSkill(null);
            return;
        }

        const updatedItems = get().playCard.items.map(currentItem => {
            if (currentItem.id === itemId) {
                return { ...currentItem, amount: currentItem.amount - 1 };
            }
            return currentItem;
        });

        const newBalanceHp = itemId === 1001
            ? Math.min(get().playCard.balance_hp + 100, get().playCard.stats.balance * 10)
            : itemId === 1004 // Обрабатываем предмет 1004
                ? Math.min(get().playCard.balance_hp + 100, get().playCard.stats.balance * 10)
                : get().playCard.balance_hp;

        const newEnergyMp = itemId === 1002
            ? Math.min(get().playCard.energy_mp + 100, get().playCard.stats.energy * 10)
            : itemId === 1004 // Обрабатываем предмет 1004
                ? Math.min(get().playCard.energy_mp + 100, get().playCard.stats.energy * 10)
                : get().playCard.energy_mp;

        set((state) => ({
            ...state,
            playCard: {
                ...state.playCard,
                items: updatedItems,
                balance_hp: newBalanceHp,
                energy_mp: newEnergyMp,
            }
        }));

        if (itemId === 1003) {
            get().addExp(100);
        }
    },
    selectSkill: (skill: Skill | Item | null) => set((state) => ({
        ...state,
        selectedSkill: skill
    })),
    addExp: (addExp) => {
        /* console.log('exp: ', addExp)
        console.log('exp_state: ', get().playCard.exp)
        console.log('new_exp: ', get().playCard.exp + addExp) */

        set(state => ({ ...state, addExpAnim: true }))

        const needExp = (100 + (get().playCard.lvl * 10)) - get().playCard.exp;
        const beExp = needExp - addExp

        console.log('beExp', beExp);

        if (beExp <= 0) {
            const additionalExp = -beExp;
            console.log('additionalExp: ', additionalExp)
            set((state) => (
                {
                    ...state,
                    playCard: {
                        ...state.playCard,
                        lvl: state.playCard.lvl + 1,
                        exp: 0 + additionalExp,
                        exp_points: state.playCard.exp_points + 4,
                        balance_hp: get().playCard.stats.balance * 10,
                        energy_mp: get().playCard.stats.energy * 10,
                    }
                }
            ))
        } else {
            set((state) => ({
                ...state,
                playCard: {
                    ...state.playCard,
                    exp: state.playCard.exp + addExp,
                }
            }));
        }

        setTimeout(() => {
            set((state) => ({
                ...state,
                addExpAnim: false
            }))
        }, 1000);

    },
    addStat: (stat: string) => set((state) => ({
        ...state,
        playCard: {
            ...state.playCard,
            exp_points: state.playCard.exp_points - 1,
            balance_hp: stat === 'balance' && state.playCard.balance_hp === (state.playCard.stats.balance * 10) ? state.playCard.balance_hp + 10 : state.playCard.balance_hp,
            energy_mp: stat === 'energy' && state.playCard.energy_mp === (state.playCard.stats.energy * 10) ? state.playCard.energy_mp + 10 : state.playCard.energy_mp,
            stats: {
                ...state.playCard.stats,
                [stat]: state.playCard.stats[stat] + 1
            }
        }
    })
    ),
    setTabNav: (isTab) => {
        get().selectSkill(null);
        set((state) => ({
            ...state,
            tabNav: isTab
        }))
    }
})))
