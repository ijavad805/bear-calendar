import {Dayjs} from "dayjs";
import {IEvent} from "../../types";
import {HtmlHTMLAttributes} from "react";

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
    eventList: IEvent[];
}

export interface BearCalendarMonthlyViewProps {
    current: string;
    range?: {
        start: string;
        end: string;
    };
    renderEvent: (event: IEvent, isHover: boolean) => React.ReactNode;
    renderCell: (
        props: BearCalendarMonthlyViewRenderCellProps
    ) => React.ReactNode;
    disableDay?: (date: Dayjs) => boolean;
    renderHeader?: (
        props: BearCalendarMonthlyViewRenderHeaderProps
    ) => React.ReactNode;
    extraHeader?: (props: {current: Dayjs}) => React.ReactNode;
}
