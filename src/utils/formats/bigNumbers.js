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

export const formatNumberBal = (num) => {
    if (num > 999999) {
        num = num / 1000000
        num = (+num).toFixed(2);
        return `${num}kk`;
    }

    if (num > 999) {
        num = num / 1000
        num = (+num).toFixed(1);
        return `${num}k`;
    }

    return num.toFixed(1).toLocaleString('ru');
};

export const formatNumberToo = (num) => {
    num = (+num).toFixed();
    return num.toLocaleString('ru');
};

export const formatNumberToo2 = (num) => {

    if (num > 999999) {
        num = num / 1000000
        num = (+num).toFixed(2);
        return `${num}kk`;
    }

    num = (+num).toFixed(2);
    return num
};


export const roundToFixed = (num, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
};
