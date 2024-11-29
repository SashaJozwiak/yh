import { UserDetails } from "../../types/stores";

export interface CalculatedPayment {
    internal_id: number;
    balance: number;
    house: number | null;
    totalPurchases: number;
    payment: number;
    latestPurchaseDate: string | null; // Добавляем дату последней покупки
}

export interface PaymentStats {
    totalUsers: number;
    balanceAbove500HouseBelow10: number;
    houseAbove10: number;
    totalPurchasesSum: number;
    latestPurchaseDate: string | null; // Добавляем дату самой свежей покупки для всех пользователей
}

export const calculatePartnerPayments = (users: UserDetails[]): { payments: CalculatedPayment[], stats: PaymentStats } => {
    const allPurchaseDates: string[] = []; // Массив для хранения всех дат покупок
    const payments: CalculatedPayment[] = users.map(user => {
        const balance = user.balance || 0; // Парсим баланс
        const house = user.house ? user.house : null; // Преобразуем house в число, если оно существует
        const cardPurchases = user.card_purchases.reduce((sum, purchase) => sum + purchase.price, 0); // Сумма покупок карт
        const bonusPurchases = user.bonus_purchases.reduce((sum, purchase) => sum + purchase.price, 0); // Сумма покупок бонусов
        const totalPurchases = cardPurchases + bonusPurchases; // Общая сумма покупок

        // Собираем все даты покупок пользователя
        const userPurchaseDates = [
            ...user.card_purchases.map(purchase => purchase.date),
            ...user.bonus_purchases.map(purchase => purchase.date)
        ];
        allPurchaseDates.push(...userPurchaseDates);

        // Находим самую свежую дату для текущего пользователя
        const latestPurchaseDate = userPurchaseDates.length > 0
            ? userPurchaseDates.reduce((latest, current) => (new Date(current) > new Date(latest) ? current : latest))
            : null;

        // Шаг 1: Изначальная оценка
        let payment = 0.02;

        // Шаг 2: Проверка баланса
        if (balance > 500) {
            payment = 0.03;
        }

        // Шаг 3: Проверка house
        if (house && house > 10) {
            payment = 0.04;
        }

        // Шаг 4: Добавление процента от покупок
        const purchaseBonus = (totalPurchases / 10000) * 0.15;
        payment += purchaseBonus;

        return {
            internal_id: user.internal_id,
            balance,
            house,
            totalPurchases,
            payment: parseFloat(payment.toFixed(4)), // Округляем до 4 знаков после запятой
            latestPurchaseDate,
        };
    });

    // Суммируем покупки всех пользователей
    const totalPurchasesSum = payments.reduce((sum, payment) => sum + payment.totalPurchases, 0);

    // Находим самую свежую дату для всех пользователей
    const latestPurchaseDate = allPurchaseDates.length > 0
        ? allPurchaseDates.reduce((latest, current) => (new Date(current) > new Date(latest) ? current : latest))
        : null;

    // Статистика
    const stats: PaymentStats = {
        totalUsers: users.length,
        balanceAbove500HouseBelow10: users.filter(user => user.balance > 500 && (user.house === null || user.house === undefined || user.house < 10)).length,
        houseAbove10: users.filter(user => user.house !== null && user.house !== undefined && user.house >= 10).length,
        totalPurchasesSum,
        latestPurchaseDate,
    };

    return { payments, stats };
};
