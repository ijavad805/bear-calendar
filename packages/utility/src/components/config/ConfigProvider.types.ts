import {locale} from "../../locale";

export interface BearConfigProviderProps {
    weekName?: string[];
    monthName?: string[];
    locale?: keyof typeof locale;
}
