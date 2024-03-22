export const findByClassAsync = async (id: string) => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            const elm = document.querySelector(`.${id}`) as HTMLDivElement;
            if (elm) {
                resolve(elm);
                clearInterval(interval);
            }
        }, 0);
        setTimeout(() => clearInterval(interval), 100);
    });
};