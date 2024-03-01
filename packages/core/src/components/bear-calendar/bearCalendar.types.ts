import React from 'react';
import {IEventModel} from '@bear-calendar/utility';

interface BearCalendarCellProps
    extends React.AllHTMLAttributes<HTMLTableCellElement> {
    children?: React.ReactNode;
}

interface BearCalendarEventProps
    extends React.AllHTMLAttributes<HTMLDivElement> {
    event: IEventModel;
}

export interface BearCalendarProps {
    components?: {
        cell?: React.FC<BearCalendarCellProps>;
        event?: React.FC<BearCalendarEventProps>;
    };
    onDropEvent?: Function;
    disabledDate?: Function;
}
