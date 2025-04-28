export const langLib = {
    en: {
        1: {
            type: 'Game',
            raised: 'Raised',
            days_left: 'Days left',
            insurance: 'Insurance',
            percent: '100%',
            one: 'Pilot launch project — a small casual game with the working title "Dive Cat" where a cat catches fish. With mechanics of classic snake and three in a row. For publication on Russian and foreign gaming platforms - RU/EN. Part of the funds raised will go to advertising on these gaming platforms. The main monetization is through advertising.',
            two: 'Collection of co-financing $ 680 for 70% of the profit. 15% - YouHold, 15% - Founder, 70% - holders of shares of the game. In this startup, YouHold, in addition to insuring the deposit body, will additionally finance if the APR is below 12% - due to the profit from the already posted aim trainer game and its share of 15%. One investor can invest from 10 to 200 USD. Accepted currencies: UHS, USDT.',
            founder: '@cog_builds',
            owner: 'YouHold',
            guarantor: 'YouHold',


        }

    },
    ru: {
        1: {
            type: 'Game',
            raised: 'Собрано',
            days_left: 'Дней ост.',
            insurance: 'Страхов.',
            percent: '100%',
            one: 'Пилотный лаунч проект — небольшая казуальная игра с рабочим названием "Dive Cat" где кот ловит рыбок. С механиками классической змейки и три в ряд. Для публикации на российских и зарубежных игровых площадках - RU/EN. Часть привлеченных средств пойдет в рекламу на этих игровых площадках. Основная монетизация через рекламу.',
            two: 'Сбор софинансирования $680 за 70% прибыли. 15% - YouHold, 15% - Фаундер, 70% - держатели акций игры. В этом стартапе YouHold помимо страхования тела вклада дополнительно дофинансирует, если APR будет ниже 12% — за счёт прибыли с уже размещенной игры aim trainer и своей части в 15%. Один инвестор может вложить от 10 до 200 USD. Принимаемые валюты: UHS, USDT.',
            founder: '@cog_builds',
            owner: 'YouHold',
            guarantor: 'YouHold',

        }
    }
}

export const swichLang = (langCode, id, string) => {
    const en = 'en';
    return langLib[langCode] ? langLib[langCode][id][string] : langLib[en][id][string];
}
