import React, {useEffect, useMemo} from "react";
import classes from "./style.module.scss";
import dayjs from "dayjs";
import {observer, View} from "@bear-calendar/utility";
import {useTimelineStore} from "../../../useTimelineStore";
import {Time} from "./time";

export interface IProps {
    start: dayjs.Dayjs;
    end: dayjs.Dayjs;
    format: string;
    renderMore?: (time: dayjs.Dayjs) => React.ReactNode;
    step: (lastPoint: dayjs.Dayjs) => dayjs.Dayjs;
}
export const Times: React.FC<IProps> = observer((props) => {
    const store = useTimelineStore();
    const times = useMemo(() => {
        let modified = dayjs(props.start);
        const tmp: string[] = [];

        while (!modified.isAfter(props.end)) {
            tmp.push(modified.toISOString());
            modified = props.step(modified);
        }

        return tmp;
    }, [props.end, props.start]);

    return (
        <View className={classes.times} horizontal>
            {times.map((i) => (
                <Time
                    date={i}
                    format={props.format}
                    renderMore={
                        props.renderMore ? props.renderMore(dayjs(i)) : null
                    }
                />
            ))}
        </View>
    );
});
