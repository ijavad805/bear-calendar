import {useLocale} from "./useLocale";

export const useTranslate = () => {
    const currentLocale = useLocale();

    const t = <T extends keyof typeof currentLocale>(
        text: T,
        params?: string[]
    ): (typeof currentLocale)[T] => {
        let text_ = currentLocale[text];
        if(params && typeof text_ === "string"){
            params.forEach((param) => {
                // @ts-ignore
                text_ = text.replaceAll(param);
            })
        }

        return text_;
    };

    return {t};
};
