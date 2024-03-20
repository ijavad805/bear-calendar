import React, {useMemo} from "react";
import {IEventModel} from "../../store";
import {observer} from "mobx-react-lite";
import {EventHandlerProvider, useEventHandler} from "./useEventHandler";

interface IProps {
    events: IEventModel[];
    renderItem: (
        event: IEventModel,
        priority: number,
        style: React.CSSProperties
    ) => React.ReactNode;
    eachCellWidth: number;
    currentCellIndex: number;
    maxCellIndex: number;
    maxRenderPerCell: number;
}
export const EventHandler: React.FC<IProps> = observer((props) => {
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
        return props.events.toSorted((a_, b_) => {
            const a = store.getById(a_.id);
            const b = store.getById(b_.id);

            if (a.priority !== null && b.priority !== null) {
                return a.priority - b.priority;
            }

            return 1;
        });
    }, [props.events]);

    const logic = (event: IEventModel): React.CSSProperties => {
        const thisEvent = store.getById(event.id);

        if (thisEvent.isRendering === false) {
            thisEvent.startRendering();
        } else if (
            thisEvent.isRendering === true &&
            props.currentCellIndex === props.maxCellIndex
        ) {
            thisEvent.stopRendering();
        }

        return {
            visibility: thisEvent.isRendering === false ? "visible" : "hidden",
        };
    };

    return (
        <>
            {events.map((event) => {
                const priority = store.getById(event.id).priority;
                if (priority === null) return null;
                return props.renderItem(event, priority, logic(event));
            })}
        </>
    );
});
