import React, {useContext, useEffect} from "react";
import {BearCalendarProps} from "../../types/bearCalendar.types";
import {useStore} from "../../store";
import {ProviderConfig} from "./ConfigProvider";

const ContextCalendar = React.createContext<BearCalendarProps | undefined>(
    undefined
);

interface IProps {
    children?: React.ReactNode;
    value: BearCalendarProps;
}

export const useCalendarProps = () => {
    const context = useContext(ContextCalendar);
    if (!context)
        throw new Error("Please use useCalendar inside Calendar Provider");

    return context;
};

export const CalendarProvider: React.FC<IProps> = (props) => {
    const {dayStore} = useStore();

    useEffect(() => {
        
        if (props.value.events) {
            dayStore.addEvent(
                props.value.events.map((event) => ({
                    date: {start: event.date.start, end: event.date.end},
                    id: event.id,
                    disabled: event.disabled,
                    title: event.title,
                }))
            );
        }
    }, [props.value.events]);

    return (
        <ContextCalendar.Provider value={props.value}>
            <ProviderConfig value={props.value.config}>
                {props.children}
            </ProviderConfig>
        </ContextCalendar.Provider>
    );
};
