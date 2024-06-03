import React, {useMemo} from "react";
import classes from "./style.module.scss";
import {observer, useDayjs, useStore, View} from "@bear-calendar/utility";
import {useTimelineProps} from "../../timeline/useTimelineProps";
import {EventHandler} from "./event-handler";

interface IProps {
    label: string;
    events: number[];
}
export const GroupCard: React.FC<IProps> = observer((props) => {
    const dayjs = useDayjs();
    const {
        dayStore: {days, getEventRange},
        current,
    } = useStore();
    const {zoomLevel} = useTimelineProps();

    const events = useMemo(() => {
        let start = dayjs();
        let end = dayjs();

        if (zoomLevel === "day") {
            start = start.startOf("day");
            end = end.endOf("day");
        } else if (zoomLevel === "week") {
            start = start.startOf("week");
            end = end.endOf("week");
        } else if (zoomLevel === "month") {
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
                <EventHandler events={events} />
            </View>
        </View>
    );
});
