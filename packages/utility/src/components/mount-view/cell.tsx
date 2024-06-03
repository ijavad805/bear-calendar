import React, {HtmlHTMLAttributes, useEffect, useMemo, useState} from "react";
import {observer, useDateTools, useDayjs} from "../../utility";
import classes from "./style/cell.module.scss";
import {Dayjs} from "dayjs";
import {useStore} from "../../store";
import {BearCalendarMonthlyViewRenderCellProps} from "./monthly.types";
import {IEvent} from "../../types";
import {useMountViewProps} from "./useMountViewProps";
import {toJS} from "mobx";
import {EventHandler, useDroppable} from "../event-handler";
import {useCalendarProps} from "../config";

interface IProps {
    date: string;
    disabled?: boolean;
    onClick?: () => void;
    cellIndexInWeek: number;
}
const Cell: React.FC<IProps> = observer((props) => {
    const dayjs = useDayjs();
    const {dayStore} = useStore();
    const mountViewProps = useMountViewProps();
    const calendarProps = useCalendarProps();
    const thisDay = dayjs(props.date);
    const thisDayStore = dayStore.get(thisDay.calendar("gregory").format());
    const isPast = useMemo(
        () => thisDay.format("YYYY-MM-DD") < dayjs().format("YYYY-MM-DD"),
        [props.date]
    );
    const isToday = useMemo(
        () => thisDay.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD"),
        [props.date]
    );
    const isThisDayDisabled = useMemo(
        () =>
            calendarProps.disabledDate
                ? calendarProps.disabledDate(thisDay)
                : false,
        [props.date]
    );
    const drop = useDroppable({
        date: thisDay,
        onDrop: async (event, startDate, endDate) => {
            if (calendarProps.onDropEvent && !isThisDayDisabled) {
                const canDrop = calendarProps.onDropEvent(event, {
                    start: startDate,
                    end: endDate,
                });

                if (canDrop === undefined || canDrop)
                    dayStore.moveEvent({start: startDate, end: endDate}, event);
            }
        },
    });
    const thisDaySpecialProps = mountViewProps.onDayAttributes
        ? mountViewProps.onDayAttributes(thisDay)
        : {};

    return (
        <td
            {...thisDaySpecialProps}
            className={`${classes.cell} ${
                thisDaySpecialProps.className
                    ? thisDaySpecialProps.className
                    : ""
            }`}
            onClick={mountViewProps.onClickDay}
            onDrop={drop.handleDrop}
            onDragOver={drop.handleHover}
            key={`${thisDay.format("DD")}-${
                thisDayStore ? thisDayStore.events.length : 0
            }`}
            data-date={thisDay.format("YYYY-MM-DD")}
        >
            {mountViewProps.renderCell({
                day: thisDay,
                isDisabled: props.disabled || isThisDayDisabled || false,
                isPast,
                isToday,
                isDropping: drop.isDropping,
                classList: [
                    isThisDayDisabled
                        ? mountViewProps.disableDayClass || ""
                        : "",
                ],
                eventsNode: thisDayStore ? (
                    <EventHandler
                        currentCellIndex={props.cellIndexInWeek}
                        events={thisDayStore.events}
                        maxCellIndex={7}
                        maxRenderPerCell={4}
                        renderItem={mountViewProps.renderEvent}
                        cellId={thisDay.format("DD")}
                        enableDragAndDrop={
                            calendarProps.onDropEvent !== undefined
                        }
                        calcDiffRange={(event) => {
                            return (
                                dayjs(event.date.end).diff(props.date, "day") +
                                1
                            );
                        }}
                        findNextCell={(i) => {
                            const find = document.querySelector(
                                `td[data-date="${thisDay
                                    .clone()
                                    .add(i, "day")
                                    .format("YYYY-MM-DD")}"]`
                            ) as HTMLDivElement;

                            return find;
                        }}
                        isStartFunc={(event) => {
                            return dayjs(event.date.start).isSame(
                                thisDay,
                                "day"
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
