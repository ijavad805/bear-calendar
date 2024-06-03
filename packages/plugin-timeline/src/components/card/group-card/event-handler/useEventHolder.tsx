import {IEventModel, useStore} from "@bear-calendar/utility";
import {useMemo} from "react";
import {IEventHolderProps} from "./eventHolder";
import dayjs from "dayjs";
import {useTimelineProps} from "../../../timeline/useTimelineProps";

export const useEventHolder = (props: IEventHolderProps) => {
    const propsTimeline = useTimelineProps();
    const {current} = useStore();
    const [left, width] = useMemo(() => {
        let left = 0;
        let width;
        const cellWidth = 80; // TODO :: should be sync width header items

        const diff = dayjs(props.event.date.end).diff(
            props.event.date.start,
            props.differentIn
        );
        width = (diff || 1) * cellWidth;

        left = Math.abs(
            current
                .startOf(propsTimeline.zoomLevel)
                .diff(props.event.date.start, props.differentIn) * cellWidth
        );

        return [left, width];
    }, []);

    return {left, width};
};
