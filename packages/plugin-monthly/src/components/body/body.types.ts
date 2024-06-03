import {BearCalendarHeaderProps} from "@bear-calendar/utility";
import React, {ReactNode} from "react";

export interface BearCalendarBodyProps {
    title?: ReactNode;
    children?: React.ReactNode;
    header?: React.FC<BearCalendarHeaderProps>;
    onNext?: React.MouseEventHandler<HTMLDivElement>;
    onPrev?: React.MouseEventHandler<HTMLDivElement>;
    onToday?: React.MouseEventHandler<HTMLDivElement>;
}
