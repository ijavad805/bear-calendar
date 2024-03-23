import React, {HtmlHTMLAttributes, useMemo} from "react";
import {observer, useDateTools, useDayjs} from "../../utility";
import classes from "./style/cell.module.scss";
import {Dayjs} from "dayjs";
import {useStore} from "../../store";
import {BearCalendarMonthlyViewRenderCellProps} from "./monthly.types";
import {IEvent} from "../../types";
import {useMountViewProps} from "./useMountViewProps";
import {toJS} from "mobx";
import {EventHandler, useDroppable} from "../event-handler";

interface IProps {
    date: string;
    disabled?: boolean;
    onClick?: () => void;
    cellIndexInWeek: number;
}
const Cell: React.FC<IProps> = observer((props) => {
    const dayjs = useDayjs();
    const {
        dayStore: {get, moveEvent},
    } = useStore();
    const mountViewProps = useMountViewProps();
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
    const cellElm = document.querySelector(`.${classes.cell}`);
    const cellWidth = cellElm ? cellElm.clientWidth - 1 : 0;
    const drop = useDroppable({
        date: thisDay,
        onDrop: (event, startDate, endDate) => {
            moveEvent({start: startDate, end: endDate}, event);
        },
    });

    return (
        <td
            className={classes.cell}
            onDrop={drop.handleDrop}
            onDragOver={drop.handleHover}
        >
            {mountViewProps.renderCell({
                day: thisDay,
                isDisabled: props.disabled || false,
                isPast,
                isToday,
                isDropping: drop.isDropping,
                eventsNode: thisDayStore ? (
                    <EventHandler
                        currentCellIndex={props.cellIndexInWeek}
                        eachCellWidth={cellWidth}
                        events={thisDayStore.events}
                        maxCellIndex={7}
                        maxRenderPerCell={2}
                        renderItem={mountViewProps.renderEvent}
                        calcDiffRange={(event) => {
                            return (
                                dayjs(event.date.end).diff(props.date, "day") +
                                1
                            );
                        }}
                    />
                ) : null,
                eventList: thisDayStore ? thisDayStore.events : [],
            })}
        </td>
    );
});

export default Cell;
