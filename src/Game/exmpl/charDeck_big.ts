export const charDeck = [
    {
        id: 1,
        lvl: 0,
        exp: 0,
        exp_points: 0,
        name: "Jack",
        profession: "Investor",
        description: "Investor",
        image: "investor",
        key_power: 'balance',
        balance_hp: 150,
        energy_mp: 100,
        stats: {
            balance: 15,
            mind: 10,
            energy: 10,
        },
        skills: [
            {
                name: "Kick",
                id: 1,
                description: "Just kick (default)",
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
                amount: 0,
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
                amount: 0,
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
                amount: 0,
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
                amount: 0,
                cost: 0,
                multiplier: 1,
                target: 'self',
                bp: [0, 0]
            }
        ],
        inventory: [],
    },
    {
        id: 2,
        lvl: 0,
        exp: 0,
        name: "Rick",
        profession: "Developer",
        description: "developer",
        image: "developer",
        key_power: 'mind',
        stats: {
            balance: 150,
            mind: 100,
            energy: 100,
        },
        skills: {
            kick: {
                name: "Kick",
                description: "Kick",
                image: "kick",
                cost: 0,
                damage() {
                    return charDeck.investor.stats.balance * 0.1;
                },
            },
            reftofin: {
                name: "Refuse to finance",
                description: "Refuse to finance",
                image: "reftofin",
                cost: 20,
                damage() {
                    return charDeck.investor.stats.balance * 0.2;
                },
            },
            profitableInvestment: {
                name: "Profitable investment",
                description: "Profitable investment",
                image: "profitableInvestment",
                cost: 30,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            },
            buyProject: {
                name: "Buy a project",
                description: "Buy a project",
                image: "buyProject",
                cost: 40,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            }

        },
        inventory: [],
        items: [],
    },
    {
        id: 3,
        lvl: 0,
        exp: 0,
        name: "Austin",
        profession: "Hamster",
        description: "Investor",
        image: "hamster",
        key_power: 'energy',
        stats: {
            balance: 150,
            mind: 100,
            energy: 100,
        },
        skills: {
            kick: {
                name: "Kick",
                description: "Kick",
                image: "kick",
                cost: 0,
                damage() {
                    return charDeck.investor.stats.balance * 0.1;
                },
            },
            reftofin: {
                name: "Refuse to finance",
                description: "Refuse to finance",
                image: "reftofin",
                cost: 20,
                damage() {
                    return charDeck.investor.stats.balance * 0.2;
                },
            },
            profitableInvestment: {
                name: "Profitable investment",
                description: "Profitable investment",
                image: "profitableInvestment",
                cost: 30,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            },
            buyProject: {
                name: "Buy a project",
                description: "Buy a project",
                image: "buyProject",
                cost: 40,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            }

        },
        inventory: [],
        items: [],
    },
    {
        id: 4,
        lvl: 0,
        exp: 0,
        name: "Larry",
        profession: "Influencer",
        description: "Investor",
        image: "influencer",
        key_power: 'balance',
        stats: {
            balance: 150,
            mind: 100,
            energy: 100,
        },
        skills: {
            kick: {
                name: "Kick",
                description: "Kick",
                image: "kick",
                cost: 0,
                damage() {
                    return charDeck.investor.stats.balance * 0.1;
                },
            },
            reftofin: {
                name: "Refuse to finance",
                description: "Refuse to finance",
                image: "reftofin",
                cost: 20,
                damage() {
                    return charDeck.investor.stats.balance * 0.2;
                },
            },
            profitableInvestment: {
                name: "Profitable investment",
                description: "Profitable investment",
                image: "profitableInvestment",
                cost: 30,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            },
            buyProject: {
                name: "Buy a project",
                description: "Buy a project",
                image: "buyProject",
                cost: 40,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            }

        },
        inventory: [],
        items: [],
    },
    {
        id: 5,
        lvl: 0,
        exp: 0,
        name: "Anon",
        profession: "Scammer",
        description: "Investor",
        image: "scammer",
        key_power: 'mind',
        stats: {
            balance: 150,
            mind: 100,
            energy: 100,
        },
        skills: {
            kick: {
                name: "Kick",
                description: "Kick",
                image: "kick",
                cost: 0,
                damage() {
                    return charDeck.investor.stats.balance * 0.1;
                },
            },
            reftofin: {
                name: "Refuse to finance",
                description: "Refuse to finance",
                image: "reftofin",
                cost: 20,
                damage() {
                    return charDeck.investor.stats.balance * 0.2;
                },
            },
            profitableInvestment: {
                name: "Profitable investment",
                description: "Profitable investment",
                image: "profitableInvestment",
                cost: 30,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            },
            buyProject: {
                name: "Buy a project",
                description: "Buy a project",
                image: "buyProject",
                cost: 40,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            }

        },
        inventory: [],
        items: [],
    },
    {
        id: 6,
        lvl: 0,
        exp: 0,
        name: "Jimmy",
        profession: "Ludoman",
        description: "ludoman",
        image: "ludoman",
        key_power: 'energy',
        stats: {
            balance: 150,
            mind: 100,
            energy: 100,
        },
        skills: {
            kick: {
                name: "Kick",
                description: "Kick",
                image: "kick",
                cost: 0,
                damage() {
                    return charDeck.investor.stats.balance * 0.1;
                },
            },
            reftofin: {
                name: "Refuse to finance",
                description: "Refuse to finance",
                image: "reftofin",
                cost: 20,
                damage() {
                    return charDeck.investor.stats.balance * 0.2;
                },
            },
            profitableInvestment: {
                name: "Profitable investment",
                description: "Profitable investment",
                image: "profitableInvestment",
                cost: 30,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            },
            buyProject: {
                name: "Buy a project",
                description: "Buy a project",
                image: "buyProject",
                cost: 40,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            }

        },
        inventory: [],
        items: [],
    },
    {
        id: 7,
        lvl: 0,
        exp: 0,
        name: "Barry",
        profession: "Institutional",
        description: "Investor",
        image: "institutional",
        key_power: 'balance',
        stats: {
            balance: 150,
            mind: 100,
            energy: 100,
        },
        skills: {
            kick: {
                name: "Kick",
                description: "Kick",
                image: "kick",
                cost: 0,
                damage() {
                    return charDeck.investor.stats.balance * 0.1;
                },
            },
            reftofin: {
                name: "Refuse to finance",
                description: "Refuse to finance",
                image: "reftofin",
                cost: 20,
                damage() {
                    return charDeck.investor.stats.balance * 0.2;
                },
            },
            profitableInvestment: {
                name: "Profitable investment",
                description: "Profitable investment",
                image: "profitableInvestment",
                cost: 30,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            },
            buyProject: {
                name: "Buy a project",
                description: "Buy a project",
                image: "buyProject",
                cost: 40,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            }

        },
        inventory: [],
        items: [],
    },
    {
        id: 8,
        lvl: 0,
        exp: 0,
        name: "Alex",
        profession: "Founder",
        description: "founder",
        image: "founder",
        key_power: 'mind',
        stats: {
            balance: 150,
            mind: 100,
            energy: 100,
        },
        skills: {
            kick: {
                name: "Kick",
                description: "Kick",
                image: "kick",
                cost: 0,
                damage() {
                    return charDeck.investor.stats.balance * 0.1;
                },
            },
            reftofin: {
                name: "Refuse to finance",
                description: "Refuse to finance",
                image: "reftofin",
                cost: 20,
                damage() {
                    return charDeck.investor.stats.balance * 0.2;
                },
            },
            profitableInvestment: {
                name: "Profitable investment",
                description: "Profitable investment",
                image: "profitableInvestment",
                cost: 30,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            },
            buyProject: {
                name: "Buy a project",
                description: "Buy a project",
                image: "buyProject",
                cost: 40,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            }

        },
        inventory: [],
        items: [],
    },
    {
        id: 9,
        lvl: 0,
        exp: 0,
        name: "Michael",
        profession: "NFTartist",
        description: "NFTartist",
        image: "NFTartist",
        key_power: 'energy',
        stats: {
            balance: 150,
            mind: 100,
            energy: 100,
        },
        skills: {
            kick: {
                name: "Kick",
                description: "Kick",
                image: "kick",
                cost: 0,
                damage() {
                    return charDeck.investor.stats.balance * 0.1;
                },
            },
            reftofin: {
                name: "Refuse to finance",
                description: "Refuse to finance",
                image: "reftofin",
                cost: 20,
                damage() {
                    return charDeck.investor.stats.balance * 0.2;
                },
            },
            profitableInvestment: {
                name: "Profitable investment",
                description: "Profitable investment",
                image: "profitableInvestment",
                cost: 30,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            },
            buyProject: {
                name: "Buy a project",
                description: "Buy a project",
                image: "buyProject",
                cost: 40,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            }

        },
        inventory: [],
        items: [],
    },
    {
        id: 10,
        lvl: 0,
        exp: 0,
        name: "Alfred",
        profession: "Whale",
        description: "Whale",
        image: "whale",
        key_power: 'balance',
        stats: {
            balance: 150,
            mind: 100,
            energy: 100,
        },
        skills: {
            kick: {
                name: "Kick",
                description: "Kick",
                image: "kick",
                cost: 0,
                damage() {
                    return charDeck.investor.stats.balance * 0.1;
                },
            },
            reftofin: {
                name: "Refuse to finance",
                description: "Refuse to finance",
                image: "reftofin",
                cost: 20,
                damage() {
                    return charDeck.investor.stats.balance * 0.2;
                },
            },
            profitableInvestment: {
                name: "Profitable investment",
                description: "Profitable investment",
                image: "profitableInvestment",
                cost: 30,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            },
            buyProject: {
                name: "Buy a project",
                description: "Buy a project",
                image: "buyProject",
                cost: 40,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            }

        },
        inventory: [],
        items: [],
    },
    {
        id: 11,
        lvl: 0,
        exp: 0,
        name: "Jerry",
        profession: "Trader",
        description: "Trader",
        image: "trader",
        key_power: 'mind',
        stats: {
            balance: 150,
            mind: 100,
            energy: 100,
        },
        skills: {
            kick: {
                name: "Kick",
                description: "Kick",
                image: "kick",
                cost: 0,
                damage() {
                    return charDeck.investor.stats.balance * 0.1;
                },
            },
            reftofin: {
                name: "Refuse to finance",
                description: "Refuse to finance",
                image: "reftofin",
                cost: 20,
                damage() {
                    return charDeck.investor.stats.balance * 0.2;
                },
            },
            profitableInvestment: {
                name: "Profitable investment",
                description: "Profitable investment",
                image: "profitableInvestment",
                cost: 30,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            },
            buyProject: {
                name: "Buy a project",
                description: "Buy a project",
                image: "buyProject",
                cost: 40,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            }

        },
        inventory: [],
        items: [],
    },
    {
        id: 12,
        lvl: 0,
        exp: 0,
        name: "Lilly",
        profession: "Support",
        description: "Support",
        image: "support",
        key_power: 'energy',
        stats: {
            balance: 150,
            mind: 100,
            energy: 100,
        },
        skills: {
            kick: {
                name: "Kick",
                description: "Kick",
                image: "kick",
                cost: 0,
                damage() {
                    return charDeck.investor.stats.balance * 0.1;
                },
            },
            reftofin: {
                name: "Refuse to finance",
                description: "Refuse to finance",
                image: "reftofin",
                cost: 20,
                damage() {
                    return charDeck.investor.stats.balance * 0.2;
                },
            },
            profitableInvestment: {
                name: "Profitable investment",
                description: "Profitable investment",
                image: "profitableInvestment",
                cost: 30,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            },
            buyProject: {
                name: "Buy a project",
                description: "Buy a project",
                image: "buyProject",
                cost: 40,
                damage() {
                    return charDeck.investor.stats.balance * 0.3;
                },
            }

        },
        inventory: [],
        items: [],
    },
];


