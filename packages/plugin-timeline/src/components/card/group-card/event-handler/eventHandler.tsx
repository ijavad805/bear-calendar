import React, {useMemo} from "react";
import {
    Droppable,
    IEventModel,
    useCalendarProps,
    View,
} from "@bear-calendar/utility";
import {useTimelineStore} from "../../../timeline/useTimelineStore";
import dayjs from "dayjs";
import classes from "./style.module.scss";
import {EventHolder} from "./eventHolder";
import {enumZoomLevel} from "../../../../types";

type IWithPriority = {
    priority: number;
    event: IEventModel;
};
interface IProps {
    events: IEventModel[];
}
export const EventHandler: React.FC<IProps> = (props) => {
    const timelineProps = useTimelineStore();
    const [maxPriority, withPriority] = useMemo(() => {
        const maxPriority = 0;
        const withPriority: IWithPriority[] = [];

        const isThereConflict = (
            current: dayjs.Dayjs,
            start: string,
            end: string
        ) => {
            return current.isAfter(start) && current.isBefore(end);
        };

        const startFrom =
            (timelineProps.props.maxEventPerGroup || 0) > props.events.length
                ? props.events.length
                : timelineProps.props.maxEventPerGroup;

        for (let i = startFrom === undefined ? 5 : startFrom; i >= 0; --i) {
            const event = props.events[i];

            let priority = 0;
            if (event) {
                for (let j = withPriority.length; j >= 0; j--) {
                    const prevEvent = withPriority[j];
                    if (prevEvent) {
                        if (
                            isThereConflict(
                                dayjs(event.date.start),
                                prevEvent.event.date.start,
                                prevEvent.event.date.end
                            ) ||
                            isThereConflict(
                                dayjs(event.date.start),
                                prevEvent.event.date.start,
                                prevEvent.event.date.end
                            )
                        ) {
                            priority =
                                priority < prevEvent.priority
                                    ? prevEvent.priority + 1
                                    : priority;
                        }
                    }
                }
                withPriority.push({
                    priority,
                    event,
                });
            }
        }
        return [maxPriority, withPriority];
    }, [props.events]);

    const [differentIn] = useMemo(() => {
        let format: Parameters<typeof EventHolder>["0"]["differentIn"];
        switch (timelineProps.zoomLevel) {
            case enumZoomLevel.Day:
                format = "days";
                break;
            case enumZoomLevel.Week:
                format = "days";
                break;
            case enumZoomLevel.Month:
                format = "days";
                break;
        }

        return [format];
    }, [timelineProps.zoomLevel]);

    const render = () => {
        const events = [];
        for (let i = maxPriority; i >= 0; i--) {
            events.push(
                <View className={classes.line} space="tiny">
                    {withPriority
                        .filter((e) => e.priority === i)
                        .map((event) => (
                            <EventHolder
                                differentIn={differentIn}
                                event={event.event}
                            />
                        ))}
                </View>
            );
        }

        return events;
    };

    return <View>{render().map((i) => i)}</View>;
};
