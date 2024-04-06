import React, {useEffect} from "react";
import {IEventModel} from "../../store";
import {useEventHandler} from "./useEventHandler";
import classes from "./style.module.scss";
import {observer} from "mobx-react-lite";
import {BearCalendarMonthlyViewProps} from "../mount-view";
import {useEventPriority} from "./useEventPriority";
import {useEventDNDLogic} from "./useEventDNDLogic";

export const classNameEventLogicItem = "event-logic-item";
export interface IEventLogicProps {
    id: string;
    index: number;
    maxRenderPerCell: number;
    uniqueId: string;
    prevId: string;
    event: IEventModel;
    currentCellIndex: number;
    maxCellIndex: number;
    priority?: number;
    setHeightForCell: (height: number) => void;
    calcDiffRange: () => number;
    renderItem: BearCalendarMonthlyViewProps["renderEvent"];
    findNextCell: (i: number) => HTMLDivElement | undefined;
    isStartFunc: (event: IEventModel) => boolean;
}

export const EventLogic: React.FC<IEventLogicProps> = observer((props) => {
    const store = useEventHandler();
    const thisEvent = store.getById(props.event.id);
    const priorityLogic = useEventPriority(props);
    const dndLogic = useEventDNDLogic(props);

    return (
        <div
            id={props.uniqueId}
            style={{
                ...(dndLogic.style as React.CSSProperties),
                ...priorityLogic.style,
            }}
            className={`${classNameEventLogicItem} ${classes.eventLogic} ${props.id}`}
            onMouseEnter={() => {
                thisEvent.startHovering();
            }}
            onMouseLeave={() => {
                thisEvent.endHovering();
            }}
            onDragStart={dndLogic.handleStartDarg}
            onDragEnd={dndLogic.handleEndDrag}
            draggable
        >
            {props.renderItem({
                event: props.event,
                isHover: thisEvent.isHover,
                isDragging: dndLogic.isDragging,
            })}
        </div>
    );
});
