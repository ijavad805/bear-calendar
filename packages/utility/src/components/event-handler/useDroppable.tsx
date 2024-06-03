import dayjs, {Dayjs} from "dayjs";
import {useEventHandler} from "./useEventHandler";
import React from "react";
import {IEventModel, useStore} from "../../store";
import {toJS} from "mobx";
import {getSnapshot} from "mobx-state-tree";

export const useDroppable = (props: {
    date: Dayjs;
    onDrop: (event: IEventModel, start: string, end: string) => void;
}) => {
    const eventHandler = useEventHandler();

    const handleDrop = (e: React.DragEvent<HTMLTableCellElement>) => {

        if (eventHandler.draggingEvent) {
            props.onDrop(
                eventHandler.draggingEvent,
                eventHandler.droppingEventDays[0],
                eventHandler.droppingEventDays[1]
            );
        }
        eventHandler.stopDragging();
    };

    const handleHover = (e: React.DragEvent<HTMLDivElement>) => {
        const latestShot = getSnapshot(eventHandler);
        e.preventDefault()
        e.dataTransfer.dropEffect = "move";

        if (latestShot.draggingEvent) {

            const diff = dayjs(latestShot.draggingEvent.date.end).diff(
                latestShot.draggingEvent.date.start,
                "day"
            );

            eventHandler.maybeDroppingIn(
                props.date.format(),
                props.date.add(diff, "day").format()
            );
        }
    };

    return {
        isDropping: eventHandler.isThisDayDropping(props.date.format()),
        handleDrop,
        handleHover,
    };
};
