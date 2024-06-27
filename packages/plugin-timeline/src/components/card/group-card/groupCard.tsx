import React, {useMemo} from "react";
import classes from "./style.module.scss";
import {Droppable, observer, useDayjs, useStore, View} from "@bear-calendar/utility";
import {useTimelineStore} from "../../timeline/useTimelineStore";
import {EventHandler} from "./event-handler";
import { enumZoomLevel } from "../../../types";

interface IProps {
    label: string;
    id: number;
    events: number[];
}
export const GroupCard: React.FC<IProps> = observer((props) => {
    const dayjs = useDayjs();
    const {
        dayStore: {days, getEventRange},
        current,
    } = useStore();
    const {zoomLevel} = useTimelineStore();

    const events = useMemo(() => {
        let start = dayjs();
        let end = dayjs();

        if (zoomLevel === enumZoomLevel.Day) {
            start = start.startOf("day");
            end = end.endOf("day");
        } else if (zoomLevel === enumZoomLevel.Week) {
            start = start.startOf("week");
            end = end.endOf("week");
        } else if (zoomLevel === enumZoomLevel.Month) {
            start = start.startOf("month");
            end = end.endOf("month");
        }

        return getEventRange(start.format(), end.format()).filter((i) =>
            props.events.includes(i.id)
        );
    }, [zoomLevel, {...days}, current]);
 
    return (
        <View className={classes.groupRow} horizontal>
            <View className={classes.groupLabel}>{props.label}</View>
            <View className={classes.groupEvents}>
                <Droppable id={""}>
                    <EventHandler events={events} />
                </Droppable>
            </View>
        </View>
    );
});
