import {IEventModel, useStore} from "@bear-calendar/utility";
import {useMemo} from "react";
import {IEventHolderProps} from "./eventHolder";
import dayjs from "dayjs";
import {useTimelineStore} from "../../../timeline/useTimelineStore";

export const useEventHolder = (props: IEventHolderProps) => {
    const {eventsCtl, zoomLevel} = useTimelineStore();
    const {current} = useStore();
    const [left, width] = useMemo(() => {
        if (eventsCtl) {
            const event = eventsCtl
                .getEvents()
                .find((i) => i.reference.id === props.event.id);

            return [left, width];
        }

        return [null, null];
    }, [zoomLevel, eventsCtl]);

    return {left, width};
};
