import dayjs, { Dayjs } from "dayjs";
import {useConfig} from "../components";
import jalaliday from "jalaliday";
dayjs.extend(jalaliday);

export const useDayjs = () => {
    const config = useConfig();

    return (date: string | Dayjs, useMain: boolean = false) => {
        if (config.locale === "fa" && useMain === false)
            return dayjs(date).calendar("jalali");

        return dayjs(date);
    };
};
