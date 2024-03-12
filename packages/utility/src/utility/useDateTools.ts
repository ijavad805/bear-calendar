import {useLocale} from "../locale/useLocale";
import {useDayjs} from "./useDayjs";

export const useDateTools = (customDate: string) => {
    const locale = useLocale();
    const dayjs = useDayjs();
    const date = dayjs(customDate);

    const getYear = (): string => {
        return date.format("YYYY");
    };

    const getMonthStartWith = (): number => {
        return date.startOf("month").day();
    };

    const getMonths = (short: boolean = false) => {
        if (short) {
            return locale.months.map((month) => month.substring(0, 3));
        } else {
            return locale.months;
        }
    };

    const getWeakDayName = (short: boolean = true): string[] => {
        if (short) {
            return locale.weekDays.map((day) => day.substring(0, 1));
        } else {
            return locale.weekDays;
        }
    };

    const getMonth = (month?: number, addMonth = true) => {
        const cloneDate = dayjs(date);
        if (month !== undefined) {
            if (addMonth) {
                cloneDate.add(month, "M");
            } else {
                cloneDate.month(month);
            }
        }

        return {
            countDay: cloneDate.daysInMonth(),
            name: getMonths(true)[cloneDate.month()],
            fullName: getMonths()[cloneDate.month()],
            date: cloneDate,
        };
    };

    return {
        getMonth,
        maxMonth: 12,
        maxWeak: 7,
        getYear,
        getMonthStartWith,
        date,
        getMonths,
        getWeakDayName,
        current: date,
    };
};
