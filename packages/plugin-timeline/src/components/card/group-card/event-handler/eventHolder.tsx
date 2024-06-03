import {EventCard, IEventModel, View} from "@bear-calendar/utility";
import dayjs from "dayjs";
import React from "react";
import classes from "./style.module.scss";
import {useTimelineProps} from "../../../timeline/useTimelineProps";
import {useEventHolder} from "./useEventHolder";

export interface IEventHolderProps {
    differentIn: Parameters<dayjs.Dayjs["diff"]>["1"];
    event: IEventModel;
}
export const EventHolder: React.FC<IEventHolderProps> = (props) => {
    const propsTimeline = useTimelineProps();
    const {left, width} = useEventHolder(props);

    return (
        <View
            className={classes.event}
            style={{left: `${left}px`, width: `${width}px`}}
        >
            {propsTimeline.renderEvent ? (
                propsTimeline.renderEvent(props.event)
            ) : (
                <EventCard event={props.event} />
            )}
        </View>
    );
};
