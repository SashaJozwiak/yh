function throttle(func, limit) {
    let lastFunc;
    let lastRan;

    return function (...args) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const context = this;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if (Date.now() - lastRan >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

export default throttle;
