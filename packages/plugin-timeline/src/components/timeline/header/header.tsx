import React, {useMemo} from "react";
import {useTimelineProps} from "../useTimelineProps";
import {useStore, View} from "@bear-calendar/utility";
import {Times} from "./times";
import dayjs from "dayjs";
import classes from "./style.module.scss";
import {IDS} from "../ids";

export const Header = () => {
    const props = useTimelineProps();
    const {current} = useStore();

    const [start, end, format, stepFunc] = useMemo(() => {
        let end;
        let start;
        let format;
        let stepFunc;
        switch (props.zoomLevel) {
            case "day":
                start = dayjs(current).startOf("day");
                end = dayjs(current).endOf("day");
                format = "HH:mm";
                stepFunc = (date: dayjs.Dayjs) => date.add(30, "minutes");
                break;
            case "week":
                start = dayjs(current).startOf("week");
                end = dayjs(current).endOf("week");
                format = "dddd";
                stepFunc = (date: dayjs.Dayjs) => date.add(1, "day");
                break;
            case "month":
                start = dayjs(current).startOf("month");
                end = dayjs(current).endOf("month");
                format = "DD";
                stepFunc = (date: dayjs.Dayjs) => date.add(1, "day");
                break;
        }

        return [start, end, format, stepFunc];
    }, []);

    return (
        <View className={classes.header} id={IDS.header} horizontal>
            <View className={classes.current} center>
                {start.format("YYYY-MM-DD")} - {end.format("YYYY-MM-DD")}{" "}
            </View>
            <Times start={start} end={end} format={format} step={stepFunc} />
        </View>
    );
};
