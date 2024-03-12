import React from "react";

export interface BearCalendarBodyProps {
    title?: string;
    children?: React.ReactNode;
    onNext?: React.MouseEventHandler<HTMLDivElement>;
    onPrev?: React.MouseEventHandler<HTMLDivElement>;
    onToday?: React.MouseEventHandler<HTMLDivElement>;
}
