import {Dayjs} from "dayjs";
import {IEvent} from "../../types";
import {HTMLAttributes, HtmlHTMLAttributes} from "react";

export interface BearCalendarMonthlyViewRenderHeaderProps {
    nextMonthAction: () => void;
    prevMonthAction: () => void;
    goToDay: () => void;
}
export interface BearCalendarMonthlyViewRenderCellProps {
    eventsNode: React.ReactNode | null;
    day: Dayjs;
    isToday: boolean;
    isDisabled: boolean;
    isPast: boolean;
    isDropping: boolean;
    eventList: IEvent[];
}

export interface BearCalendarMonthlyViewProps {
    current: string;
    renderEvent: (props: {
        event: IEvent;
        isHover: boolean;
        isDragging: boolean;
    }) => React.ReactNode;
    renderCell: (
        props: BearCalendarMonthlyViewRenderCellProps
    ) => React.ReactNode;
    disableDay?: (date: Dayjs) => boolean;
    renderHeader?: (
        props: BearCalendarMonthlyViewRenderHeaderProps
    ) => React.ReactNode;
    extraHeader?: (props: {current: Dayjs}) => React.ReactNode;
    onDayAttributes?: (date: Dayjs) => HTMLAttributes<HTMLTableCellElement>;
    onEvent?: (date: Dayjs) => HTMLAttributes<HTMLTableCellElement>;
}
