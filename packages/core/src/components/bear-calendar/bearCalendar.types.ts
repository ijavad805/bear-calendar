import React from "react";
import {IEventModel} from "@bear-calendar/utility";
import {locale} from "dayjs";

type ILocale = Parameters<typeof locale>[0];

export enum enumViewSize {
    Yearly = "Yearly",
    Monthly = "Monthly",
}
export interface BearCalendarCellProps
    extends React.AllHTMLAttributes<HTMLTableCellElement> {
    children?: React.ReactNode;
}
export interface IEvent {
    id: number;
    title: string;
    date: string;
    disabled?: boolean;
}
export interface BearCalendarEventProps
    extends React.AllHTMLAttributes<HTMLDivElement> {
    event: IEventModel;
}

export interface BearCalendarHeaderProps
    extends React.AllHTMLAttributes<HTMLDivElement> {
    title?: string;
    extra?: React.ReactNode;
    onNext?: React.MouseEventHandler<HTMLDivElement>;
    onPrev?: React.MouseEventHandler<HTMLDivElement>;
    onToday?: React.MouseEventHandler<HTMLDivElement>;
}

export interface BearCalendarProps {
    components?: {
        cell?: React.FC<BearCalendarCellProps>;
        event?: React.FC<BearCalendarEventProps>;
        header?: React.FC<BearCalendarHeaderProps>;
    };
    viewSize?: keyof typeof enumViewSize;
    onDropEvent?: Function;
    onClickEvent?: Function;
    disabledDate?: Function;
    lang?: ILocale;
    extra?: React.ReactNode;
    events?: IEvent[];
}
