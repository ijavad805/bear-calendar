import dayjs, { Dayjs } from "dayjs";
import {useConfig} from "../components";
import jalaliday from "jalaliday";
dayjs.extend(jalaliday);

export const useDayjs = () => {
    const config = useConfig();

    return (date?: string | Dayjs, useMain: boolean = false) => {
        if (config.locale === "fa" && useMain === false){
            let tmp = dayjs(date).calendar("jalali");
            if(parseInt(tmp.format("YYYY")) < 1000){
                // @ts-ignore
                return dayjs(date,{jalali:true}).calendar("jalali")
            }

            return tmp;
        }

        return dayjs(date);
    };
};
