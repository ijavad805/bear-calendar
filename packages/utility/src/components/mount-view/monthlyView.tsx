import React from "react";
import {
    BearCalendarMonthViewSize,
    BearCalendarMonthlyViewProps,
} from "./monthly.types";
import Cell from "./cell";
import {observer} from "mobx-react-lite";
import {useDateTools} from "../../utility";
import classes from "./style/monthly.module.scss";
import { useInitStore } from "../../store/useStore";

const MonthlyView: React.FC<BearCalendarMonthlyViewProps> = observer(
    (props) => {
        const tools = useDateTools(props.current);
        const tableSize = [classes.small, classes.medium, classes.large];
        const countTr = Math.ceil(
            (tools.getMonth().countDay + tools.getMonthStartWith()) / 7
        );

        useInitStore();

        return (
            <>
                <table
                    className={`${classes.table} ${
                        tableSize[props.size || BearCalendarMonthViewSize.Large]
                    }`}
                    border={0}
                >
                    <thead>
                        <tr>
                            {tools.getWeakDayName(false).map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {new Array(countTr).fill("w").map((i, index) => {
                            const rangeOfDays = {
                                start: index * 7 - tools.getMonthStartWith(),
                                end: (index + 1) * 7,
                            };

                            return (
                                <tr>
                                    {index === 0 && (
                                        <FillStart
                                            emptyCount={rangeOfDays.start * -1}
                                            current={props.current}
                                        />
                                    )}
                                    {new Array(7).fill("d").map((i, index) => {
                                        const day =
                                            index + 1 + rangeOfDays.start;
                                        if (
                                            day <= tools.getMonth().countDay &&
                                            day > 0
                                        )
                                            return (
                                                <Cell
                                                    date={
                                                        tools.current.format(
                                                            "YYYY-MM-"
                                                        ) + day
                                                    }
                                                    key={`${index}-${
                                                        tools.current.format(
                                                            "YYYY-MM-"
                                                        ) + day
                                                    }`}
                                                    cellIndexInWeek={index}
                                                />
                                            );

                                        return null;
                                    })}
                                    {index === countTr - 1 && (
                                        <FillEnd
                                            current={props.current}
                                            emptyCount={0}
                                        />
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </>
        );
    }
);

interface IProps {
    emptyCount: number;
    current: string;
}
const FillStart: React.FC<IProps> = ({emptyCount, current}) => {
    const {date} = useDateTools(current);

    const getEndOfPrevMonth = (index: number) => {
        const date_ = date.clone().add(-1, "month").endOf("month");

        return date_.add(index - emptyCount + 1, "day").format("YYYY-MM-DD");
    };

    return (
        <>
            {new Array(emptyCount).fill("d").map((i, index) => (
                <Cell
                    date={getEndOfPrevMonth(index)}
                    disabled={true}
                    cellIndexInWeek={index}
                />
            ))}
        </>
    );
};

const FillEnd: React.FC<IProps> = (props) => {
    const {getMonthStartWith, getMonth, date} = useDateTools(props.current);

    const getMonthCountToEnd = () => {
        const countNow = getMonthStartWith() + getMonth().countDay;
        const res = Math.ceil(countNow / 7) * 7 - countNow;
        return res;
    };

    const getEndOfPrevMonth = (index: number) => {
        const day = index + 1;
        const date_ = date.clone().add(1, "month");
        return date_.format("YYYY-MM-") + day;
    };

    return (
        <>
            {new Array(getMonthCountToEnd()).fill("d").map((i, index) => (
                <Cell
                    date={getEndOfPrevMonth(index)}
                    disabled={true}
                    cellIndexInWeek={7 - getMonthCountToEnd() + index}
                />
            ))}
        </>
    );
};

export default MonthlyView;
