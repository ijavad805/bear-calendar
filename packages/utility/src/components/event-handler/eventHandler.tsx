import React, {useMemo} from "react";
import {IEventModel} from "../../store";
import {observer} from "mobx-react-lite";
import {EventHandlerProvider, useEventHandler} from "./useEventHandler";
import {EventLogic} from "./eventLogic";
import {toJS} from "mobx";
import {BearCalendarMonthlyViewProps} from "../mount-view";

export interface IEventHandlerProps {
    events: IEventModel[];
    eachCellWidth: number;
    currentCellIndex: number;
    maxCellIndex: number;
    maxRenderPerCell: number;
    renderItem: BearCalendarMonthlyViewProps["renderEvent"];
    calcDiffRange: (event: IEventModel) => number;
}
let prevElmId = ``;
export const EventHandler: React.FC<IEventHandlerProps> = observer((props) => {
    const store = useEventHandler();
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
        props.events.forEach((event, index) => {
            const tmp = store.getById(event.id);
            if (tmp.priority === null) {
                tmp.setPriority(tryFindPriority());
            }
        });

        return props.events.slice().sort((a_, b_) => {
            const a = store.getById(a_.id);
            const b = store.getById(b_.id);

            if (a.priority !== null && b.priority !== null) {
                return a.priority - b.priority;
            }

            return 1;
        });
    }, [props.events]);

    return (
        <>
            {events.map((event, index) => {
                const priority = store.getById(event.id).priority;
                const id = `bear-calendar-event-handler-${event.id}`;
                const uniqueId = `bear-calendar-event-handler-${
                    event.id
                }-${Math.ceil(Math.random() * 100)}`;
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
                        cellWidth={props.eachCellWidth}
                        calcDiffRange={() => props.calcDiffRange(event)}
                        renderItem={props.renderItem}
                        key={`${index}-${id}`}
                        index={index}
                        maxPerCellEvent={props.maxRenderPerCell}
                    />
                );
            })}
        </>
    );
});
