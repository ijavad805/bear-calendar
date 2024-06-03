type classWithCondition =
    | [boolean | undefined, string | undefined]
    | string
    | undefined;

export const joinClass = (...arg: classWithCondition[]) => {
    const classes: string[] = [];

    arg.forEach((item) => {
        if (item === undefined) return;
        
        if (typeof item === "string") {
            classes.push(item);
        } else {
            if (item[0] && item[1]) {
                classes.push(item[1]);
            }
        }
    });

    return classes.join(" ");
};
