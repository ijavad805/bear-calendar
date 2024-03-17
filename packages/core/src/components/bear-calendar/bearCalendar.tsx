import React, {useEffect} from "react";
import {
    BearCalendarProps,
    CalendarProvider,
    CalendarStoreProvider,
    observer,
} from "@bear-calendar/utility";
import dayjs from "dayjs";
import {View} from "./view";

export const BearCalendar: React.FC<BearCalendarProps> = observer(
    ({defaultCurrent = dayjs().format(), ...props}) => {
        useEffect(() => {
            if (props.plugin.length === 0)
                throw new Error(
                    "At least please install one of these plugins -> @bear-calendar/plugin-monthly, do you need help? https://bear-calendar.org/doc/plugins"
                );

            const theViewExist = props.plugin.filter((item) => {
                return item.view !== undefined && item.name === props.view;
            });

            if (theViewExist.length === 0) {
                throw new Error(
                    `${props.view}, this view is not register, please look at documentation https://bear-calendar.org/doc/plugins`
                );
            }
        }, [props.plugin]);

        return (
            <CalendarStoreProvider>
                <CalendarProvider value={{defaultCurrent, ...props}}>
                    <View />
                </CalendarProvider>
            </CalendarStoreProvider>
        );
    }
);
