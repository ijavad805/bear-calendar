import React from "react";
import {BearCalendarProps} from "./bearCalendar.types";
import {CalendarStoreProvider, observer} from "@bear-calendar/utility";
import {CalendarProvider} from "./context";

export const BearCalendar: React.FC<BearCalendarProps> = observer((props) => {
    return (
        <CalendarStoreProvider>
            <CalendarProvider value={props}></CalendarProvider>
        </CalendarStoreProvider>
    );
});
