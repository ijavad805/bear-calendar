import {Draggable, EventCard, IEventModel, View} from "@bear-calendar/utility";
import dayjs from "dayjs";
import React from "react";
import classes from "./style.module.scss";
import {useTimelineStore} from "../../../timeline/useTimelineStore";
import {useEventHolder} from "./useEventHolder";

export interface IEventHolderProps {
    differentIn: Parameters<dayjs.Dayjs["diff"]>["1"];
    event: IEventModel;
}
export const EventHolder: React.FC<IEventHolderProps> = (props) => {
    const propsTimeline = useTimelineStore();
    const {left, width} = useEventHolder(props);

    return (
        <View
            className={classes.event}
            style={{left: `${left}px`, width: `${width}px`}}
        >
            <Draggable
                onDrag={() => {}}
                rule={{
                    x: {step: propsTimeline.headerCellWidth}, // TODO :: should be same as header width
                    y: {restrict: true}, // TODO :: should be same as header width
                }}
                disable={propsTimeline.props.onDrop !== undefined}
            >
                {propsTimeline.props.renderEvent ? (
                    propsTimeline.props.renderEvent(props.event)
                ) : (
                    <EventCard event={props.event} />
                )}
            </Draggable>
        </View>
    );
};
