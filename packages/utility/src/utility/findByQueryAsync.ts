export const findByQueryAsync = async (query: string) => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            const elm = document.querySelector(query) as HTMLDivElement;
            if (elm) {
                resolve(elm);
                clearInterval(interval);
            }
        }, 0);
        setTimeout(() => {
            clearInterval(interval);
            reject(`Element not found after ${query}`);
        }, 100);
    });
};
