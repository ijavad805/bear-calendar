import React, {useMemo} from "react";
import {useTimelineStore} from "../useTimelineStore";
import {observer, useDayjs, useStore, View} from "@bear-calendar/utility";
import {Times} from "./time-spliter/times";
import classes from "./style.module.scss";
import {IDS} from "../ids";
import {TimeSplicer} from "./time-spliter";

export const Header = observer(() => {
    const props = useTimelineStore();
    const {current} = useStore();
    const {start, end, format, step, children} = useMemo(() => {
        return props.timeAreaAndSections(current);
    }, [current, props.zoomLevel]);

    return (
        <View className={classes.header} id={IDS.header} horizontal>
            <View className={classes.current} center>
                {start.format("YYYY-MM-DD")} - {end.format("YYYY-MM-DD")}{" "}
            </View>
            <TimeSplicer
                splice={{
                    start,
                    end,
                    format,
                    step,
                    children,
                }}
            />
        </View>
    );
});
