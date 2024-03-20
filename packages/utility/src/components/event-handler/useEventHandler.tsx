import React, { useContext, useMemo } from "react"
import { IEventHandlerStore, eventHandlerStore } from "./model/eventHandlerStore";
import { IEvent } from "../../types";
import { eventHandlerModel } from "./model/eventHandlerModel";

const EventHandlerContext = React.createContext<IEventHandlerStore | undefined>(undefined);

interface IProps{
    children: React.ReactNode;
    events: IEvent[];
}
export const EventHandlerProvider:React.FC<IProps> = (props) => {
    const model = useMemo(() => eventHandlerStore.create(),[]);

    return <EventHandlerContext.Provider value={model}>{props.children}</EventHandlerContext.Provider>
}
export const useEventHandler = () => {
    const context = useContext(EventHandlerContext);

    if(context === undefined) throw new Error("Please use useEventHandler inside EventHandlerProvider");

    return context;
}