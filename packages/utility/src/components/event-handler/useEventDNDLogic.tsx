import {useState} from "react";
import {IEventLogicProps} from "./eventLogic";
import {useEventHandler} from "./useEventHandler";

export const useEventDNDLogic = (props: IEventLogicProps) => {
    const store = useEventHandler();
    const isDragging = store.draggingEvent
        ? store.draggingEvent.id === props.event.id
        : false;

    const handleStartDarg = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("text/plain", props.event.id.toString());
        store.startDragging(props.event);
    };
    const handleEndDrag = () => {
        store.stopDragging();
    };

    return {
        isDragging,
        handleStartDarg,
        handleEndDrag,
        style: {
            visibility: isDragging ? "hidden" : "visible",
        },
    };
};
