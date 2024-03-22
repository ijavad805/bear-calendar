import {Dayjs} from "dayjs";
import {IEvent} from "../../types";
import {HtmlHTMLAttributes} from "react";

export interface BearCalendarMonthlyViewRenderHeaderProps {
    nextMonthAction: () => void;
    prevMonthAction: () => void;
    goToDay: () => void;
}
export interface BearCalendarMonthlyViewRenderCellProps {
    events: React.ReactNode;
    day: Dayjs;
    isToday: boolean;
    isDisabled: boolean;
    isPast: boolean;
}

export interface BearCalendarMonthlyViewProps {
    current: string;
    range?: {
        start: string;
        end: string;
    };
    disableDay: (date: Dayjs) => boolean;
    renderEvent: (
        event: IEvent,
        attr: HtmlHTMLAttributes<HTMLDivElement>
    ) => React.ReactNode;
    renderCell: (
        props: BearCalendarMonthlyViewRenderCellProps
    ) => React.ReactNode;
    renderHeader: (
        props: BearCalendarMonthlyViewRenderHeaderProps
    ) => React.ReactNode;
    extraHeader: (props: {current: Dayjs}) => React.ReactNode;
}
