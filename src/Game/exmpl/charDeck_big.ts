import { PlayCard } from "../types/playCard";

export const charDeck: PlayCard[] = [
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
        exp_points: 0,
        name: "Rick",
        profession: "Developer",
        description: "developer",
        image: "developer",
        key_power: 'mind',
        balance_hp: 100,
        energy_mp: 100,
        stats: {
            balance: 10,
            mind: 15,
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
                cost: 40,
                target: 'enemy',
                multiplier: 1.6,
                bp: [78, 25],
                amount: 0,
            }
        ],
        inventory: [],
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
    },
    {
        id: 3,
        lvl: 0,
        exp: 0,
        exp_points: 0,
        name: "Austin",
        profession: "Hamster",
        description: "Investor",
        image: "hamster",
        key_power: 'energy',
        balance_hp: 100,
        energy_mp: 150,
        stats: {
            balance: 10,
            mind: 10,
            energy: 15,
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
                cost: 40,
                target: 'enemy',
                multiplier: 1.6,
                bp: [78, 25],
                amount: 0,
            }
        ],
        inventory: [],
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
    },
    {
        id: 4,
        lvl: 0,
        exp: 0,
        exp_points: 0,
        name: "Larry",
        profession: "Influencer",
        description: "Investor",
        image: "influencer",
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
                cost: 40,
                target: 'enemy',
                multiplier: 1.6,
                bp: [78, 25],
                amount: 0,
            }
        ],
        inventory: [],
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
    },
    {
        id: 5,
        lvl: 0,
        exp: 0,
        exp_points: 0,
        name: "Anon",
        profession: "Scammer",
        description: "Investor",
        image: "scammer",
        key_power: 'mind',
        balance_hp: 100,
        energy_mp: 100,
        stats: {
            balance: 10,
            mind: 15,
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
                cost: 40,
                target: 'enemy',
                multiplier: 1.6,
                bp: [78, 25],
                amount: 0,
            }
        ],
        inventory: [],
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
    },
    {
        id: 6,
        lvl: 0,
        exp: 0,
        exp_points: 0,
        name: "Jimmy",
        profession: "Ludoman",
        description: "ludoman",
        image: "ludoman",
        key_power: 'energy',
        balance_hp: 100,
        energy_mp: 150,
        stats: {
            balance: 10,
            mind: 10,
            energy: 15,
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
                cost: 40,
                target: 'enemy',
                multiplier: 1.6,
                bp: [78, 25],
                amount: 0,
            }
        ],
        inventory: [],
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
    },
    {
        id: 7,
        lvl: 0,
        exp: 0,
        exp_points: 0,
        name: "Barry",
        profession: "Institutional",
        description: "Investor",
        image: "institutional",
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
                cost: 40,
                target: 'enemy',
                multiplier: 1.6,
                bp: [78, 25],
                amount: 0,
            }
        ],
        inventory: [],
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
    },
    {
        id: 8,
        lvl: 0,
        exp: 0,
        exp_points: 0,
        name: "Alex",
        profession: "Founder",
        description: "founder",
        image: "founder",
        key_power: 'mind',
        balance_hp: 100,
        energy_mp: 100,
        stats: {
            balance: 10,
            mind: 15,
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
                cost: 40,
                target: 'enemy',
                multiplier: 1.6,
                bp: [78, 25],
                amount: 0,
            }
        ],
        inventory: [],
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
    },
    {
        id: 9,
        lvl: 0,
        exp: 0,
        exp_points: 0,
        name: "Michael",
        profession: "NFTartist",
        description: "NFTartist",
        image: "NFTartist",
        key_power: 'energy',
        balance_hp: 100,
        energy_mp: 150,
        stats: {
            balance: 10,
            mind: 10,
            energy: 15,
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
                cost: 40,
                target: 'enemy',
                multiplier: 1.6,
                bp: [78, 25],
                amount: 0,
            }
        ],
        inventory: [],
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
    },
    {
        id: 10,
        lvl: 0,
        exp: 0,
        exp_points: 0,
        name: "Alfred",
        profession: "Whale",
        description: "Whale",
        image: "whale",
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
                cost: 40,
                target: 'enemy',
                multiplier: 1.6,
                bp: [78, 25],
                amount: 0,
            }
        ],
        inventory: [],
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
    },
    {
        id: 11,
        lvl: 0,
        exp: 0,
        exp_points: 0,
        name: "Jerry",
        profession: "Trader",
        description: "Trader",
        image: "trader",
        key_power: 'mind',
        balance_hp: 100,
        energy_mp: 100,
        stats: {
            balance: 10,
            mind: 15,
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
                cost: 40,
                target: 'enemy',
                multiplier: 1.6,
                bp: [78, 25],
                amount: 0,
            }
        ],
        inventory: [],
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
    },
    {
        id: 12,
        lvl: 0,
        exp: 0,
        exp_points: 0,
        name: "Lilly",
        profession: "Support",
        description: "Support",
        image: "support",
        key_power: 'energy',
        balance_hp: 100,
        energy_mp: 150,
        stats: {
            balance: 10,
            mind: 10,
            energy: 15,
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
                cost: 40,
                target: 'enemy',
                multiplier: 1.6,
                bp: [78, 25],
                amount: 0,
            }
        ],
        inventory: [],
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
    },
];
