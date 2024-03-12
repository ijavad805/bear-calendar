import {locale} from ".";
import {useConfig} from "../components";

export const useLocale = () => {
    const config = useConfig();

    if (config.locale) return locale[config.locale];

    return locale.en;
};
