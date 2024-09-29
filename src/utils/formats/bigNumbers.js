export const formatNumber = (num) => {
    num = (+num).toFixed();

    if (num > 999999) {
        return `${Math.floor(num / 1000000)}kk`;
    }
    if (num > 999) {
        return `${Math.floor(num / 1000)}k`;
    }
    return num.toLocaleString('ru');
};
