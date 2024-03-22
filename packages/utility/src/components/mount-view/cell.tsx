import React, {HtmlHTMLAttributes, useMemo} from "react";
import {observer, useDateTools, useDayjs} from "../../utility";
import classes from "./style/cell.module.scss";
import {Dayjs} from "dayjs";
import {useStore} from "../../store";
import {BearCalendarMonthlyViewRenderCellProps} from "./monthly.types";
import {IEvent} from "../../types";

interface IProps {
    date: string;
    disabled?: boolean;
    onClick?: () => void;
    cellIndexInWeek: number;
    renderCell: (
        props: BearCalendarMonthlyViewRenderCellProps
    ) => React.ReactNode;
    renderEvent: (
        event: IEvent,
        attr: HtmlHTMLAttributes<HTMLDivElement>
    ) => React.ReactNode;
}
const Cell: React.FC<IProps> = observer((props) => {
    const dayjs = useDayjs();
    const {
        dayStore: {get},
    } = useStore();
    const thisDay = dayjs(props.date);
    const thisDayStore = get(thisDay.calendar("gregory").format());
    const isPast = useMemo(
        () => thisDay.format("YYYY-MM-DD") < dayjs().format("YYYY-MM-DD"),
        [props.date]
    );
    const isToday = useMemo(
        () => thisDay.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD"),
        [props.date]
    );
    const cellClasses = () => {
        const tmp: string[] = [];

        if (props.disabled) {
            tmp.push(classes.disabled);
        }

        return tmp.join(" ");
    };

    return (
        <td className={classes.cell}>
            {props.renderCell({
                day: thisDay,
                isDisabled: props.disabled || false,
                isPast,
                isToday,
                events: (
                    <>
                        {thisDayStore &&
                            thisDayStore.events.map((i) =>
                                props.renderEvent(i, {})
                            )}
                    </>
                ),
            })}
        </td>
    );
});

export default Cell;
