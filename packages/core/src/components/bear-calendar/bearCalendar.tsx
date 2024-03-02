import React from 'react';
import {BearCalendarProps} from './bearCalendar.types';
import {observer} from '@bear-calendar/utility';

export const BearCalendar: React.FC<BearCalendarProps> = observer(() => {
    return <h2>Hello World!</h2>;
});
