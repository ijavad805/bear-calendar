import React, {useEffect, useState} from "react";
import {IEventModel} from "../../store";
import {useEventHandler} from "./useEventHandler";
import dayjs from "dayjs";
import classes from "./style.module.scss";
import {observer} from "mobx-react-lite";
import {BearCalendarMonthlyViewProps} from "../mount-view";
import {useEventPriority} from "./useEventPriority";
import {useEventDNDLogic} from "./useEventDNDLogic";
import { NumberValue } from "@storybook/blocks";

export interface IEventLogicProps {
    id: string;
    index: number;
    maxPerCellEvent: number;
    uniqueId: string;
    prevId: string;
    event: IEventModel;
    currentCellIndex: number;
    maxCellIndex: number;
    cellWidth: number;
    priority: number;
    calcDiffRange: () => number;
    renderItem: BearCalendarMonthlyViewProps["renderEvent"];
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
            className={`${classes.eventLogic} ${props.id}`}
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
