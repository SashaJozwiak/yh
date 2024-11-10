export const langG = {
    en: {
        1: "5 years ago collected airdrops, and now he invests in blockchain startups and makes good money.",
        2: "is a smart descendant of virgin lands, a true hard worker. Makes web3 systems for users.",
        3: "participates in all free activities and airdrops. He is happy when he gets any free tokens. Trusting.",
        4: "does reviews new blockchain projects and activities, loves his subscribers and publishes expensive advertising.",
        5: "is constantly comes up with ways to scam and steal cryptocurrency from honest users. Afraid of deanonymization.",
        6: "is a crazy fanatic of gambling web3 games, one day he will get very lucky and he will stop. But it is not true.",
        7: "publicly criticizes cryptocurrency and advocates for regulation, but secretly he keeps most of his money in bitcoin.",
        8: "comes up with ideas for projects and seeks funding, builds strategies and manages the team.",
        9: "loves to draw and paint, participates in exhibitions and promotes his conceptual art in the form of NFT.",
        10: "is the holder of a large number of assets in blockchains. Money for him is just a tool for managing the market and earning more.",
        11: "trades cryptocurrency and builds private trading strategies. Sometimes he himself is shocked by his ideas.",
        12: "works in the user support service of various projects. She loves to communicate with cryptans and help them.",
    },
    ru: {
        1: "5 лет назад собирал эйрдропы, а теперь инвестирует в блокчейн-стартапы и зарабатывает хорошие деньги.",
        2: "потомок целинников, настоящий трудяга. Делает web3 продукты для пользователей.",
        3: "участвует во всех бесплатных мероприятиях и аирдропах. Он счастлив, когда получает токены бесплатно.",
        4: "делает обзоры новых блокчейн-проектов и мероприятий, любит своих подписчиков и публикует дорогую рекламу.",
        5: "Использует хитрые способы мошенничества и кражи криптовалюты у честных пользователей. Боится деанонимизации.",
        6: "безумный фанатик азартных web3 игр, однажды ему крупно повезет и он остановится. Но это не точно.",
        7: "публично критикует криптовалюту и выступает за регулирование, но втайне хранит большую часть своих денег в биткоинах.",
        8: "придумывает идеи для проектов и ищет финансирование, разрабатывает стратегии и управляет командой.",
        9: "любит рисовать и писать картины, участвует в выставках и продвигает свое концептуальное искусство в формате NFT.",
        10: "является держателем большого количества активов в блокчейнах. Деньги для него — всего лишь инструмент для управления рынком.",
        11: "торгует криптовалютой и строит приватные торговые стратегии. Иногда сам бывает в шоке от своих прогнозов.",
        12: "работает в службе поддержки пользователей различных проектов. Любит общаться с криптанами и помогать им.",
    }
};


export const swichLang = (langCode, string) => {
    const en = 'en';
    return langG[langCode] ? langG[langCode][string] : langG[en][string];
}
