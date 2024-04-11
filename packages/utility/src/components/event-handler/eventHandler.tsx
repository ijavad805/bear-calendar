import React, {useEffect, useMemo, useRef, useState} from "react";
import {IEventModel} from "../../store";
import {observer} from "mobx-react-lite";
import {EventHandlerProvider, useEventHandler} from "./useEventHandler";
import {EventLogic} from "./eventLogic";
import {toJS} from "mobx";
import {BearCalendarMonthlyViewProps} from "../mount-view";
import {ShowMore} from "./show-more";
import {getRoot, getSnapshot} from "mobx-state-tree";
import {IEventHandlerStore} from "./model/eventHandlerStore";

export interface IEventHandlerProps {
    cellId: string;
    events: IEventModel[];
    currentCellIndex: number;
    maxCellIndex: number;
    maxRenderPerCell: number;
    enableDragAndDrop: boolean;
    renderItem: BearCalendarMonthlyViewProps["renderEvent"];
    calcDiffRange: (event: IEventModel) => number;
    findNextCell: (i: number) => HTMLDivElement | undefined;
    isStartFunc: (event: IEventModel) => boolean;
}
let prevElmId = ``;
export const EventHandler: React.FC<IEventHandlerProps> = observer((props) => {
    const store = useEventHandler();
    const ref = useRef<HTMLDivElement>(null);

    const events = useMemo(() => {
        const tryFindPriority = (): number => {
            const usedPriorities = new Set(
                props.events.map((item) => store.getById(item.id).priority)
            );

            // Find the first unused priority
            let priority = 0;
            while (usedPriorities.has(priority)) {
                priority++;
            }
            return priority;
        };
        const sortEvents = (events: IEventModel[]) => {
            return toJS(events).sort((a_, b_) => {
                const a = store.getById(a_.id);
                const b = store.getById(b_.id);
                if (a.priority !== null && b.priority !== null) {
                    return a.priority - b.priority;
                } else if (a.priority === null && b.priority !== null) {
                    return 1; // Move events with null priority to the end
                } else if (a.priority !== null && b.priority === null) {
                    return -1; // Move events with null priority to the beginning
                } else {
                    // Both priorities are null, maintain their original order
                    return 0;
                }
            });
        };
        sortEvents(props.events).forEach((event, index) => {
            if (index > props.maxRenderPerCell) {
                return;
            }

            const tmp = store.getById(event.id);
            if (tmp.priority === null) {
                tmp.setPriority(tryFindPriority());
            }
        });

        return sortEvents(props.events);
    }, [props.events, store.rerender]);

    return (
        <div ref={ref}>
            {events.map((event, index) => {
                const priority = store.getById(event.id).priority;
                const id = `bear-calendar-event-handler-${event.id}`;
                const uniqueId = `bear-calendar-event-handler-${event.id}-${props.cellId}`;
                const prevId_ = prevElmId;
                prevElmId = id;

                if (priority === null) return null;
                return (
                    <EventLogic
                        prevId={prevId_}
                        id={id}
                        uniqueId={uniqueId}
                        event={event}
                        currentCellIndex={props.currentCellIndex}
                        maxCellIndex={props.maxCellIndex}
                        priority={priority}
                        calcDiffRange={() => props.calcDiffRange(event)}
                        renderItem={props.renderItem}
                        key={`${index}-${id}-${event.date.start}`}
                        index={index}
                        maxRenderPerCell={props.maxRenderPerCell}
                        findNextCell={props.findNextCell}
                        isStartFunc={props.isStartFunc}
                        enableDragAndDrop={props.enableDragAndDrop}
                        setHeightForCell={(height) => {
                            if (ref.current)
                                ref.current.style.height = height + "px";
                        }}
                    />
                );
            })}
            {events.length > props.maxRenderPerCell && <ShowMore {...props} />}
        </div>
    );
});
