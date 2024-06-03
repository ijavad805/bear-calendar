import React, {ReactNode} from "react";
import {Dayjs, locale} from "dayjs";
import {BearConfigProviderProps} from "../components/config/ConfigProvider.types";
import {IEventModel, IEventModelSnapshotIn} from "../store";
import {Plugin, PluginName} from "./plugin.types";

type ILocale = Parameters<typeof locale>[0];

export enum enumViewSize {
    Yearly = "Yearly",
    Monthly = "Monthly",
}
export interface BearCalendarCellProps
    extends React.AllHTMLAttributes<HTMLTableCellElement> {
    children?: React.ReactNode;
}
export interface IEvent<T = unknown> extends IEventModelSnapshotIn {
    extraData?: T;
}
export interface BearCalendarEventProps
    extends React.AllHTMLAttributes<HTMLDivElement> {
    event: IEventModel;
}

export interface BearCalendarHeaderProps {
    title?: React.ReactNode;
    extra?: React.ReactNode;
    onNext?: React.MouseEventHandler<HTMLDivElement>;
    onPrev?: React.MouseEventHandler<HTMLDivElement>;
    onToday?: React.MouseEventHandler<HTMLDivElement>;
}

export interface BearCalendarProps {
    defaultCurrent?: string;
    plugin: Plugin[];
    viewSize?: keyof typeof enumViewSize;
    lang?: ILocale;
    extra?: React.ReactNode;
    events?: IEvent[];
    view?: keyof typeof PluginName;
    enableViewControl?: boolean;
    config?: BearConfigProviderProps;
    disabledDate?: (date: Dayjs) => boolean;
    onDropEvent?: (
        event: IEvent,
        newDate: {start: string; end: string}
    ) => void | boolean;
    onClickEvent?: (event: IEvent) => void;
}
