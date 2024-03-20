import React, {ReactNode} from "react";

export interface BearCalendarBodyProps {
    title?: ReactNode;
    children?: React.ReactNode;
    onNext?: React.MouseEventHandler<HTMLDivElement>;
    onPrev?: React.MouseEventHandler<HTMLDivElement>;
    onToday?: React.MouseEventHandler<HTMLDivElement>;
}
