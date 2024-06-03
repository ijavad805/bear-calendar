import React, {useMemo} from "react";
import classes from "./style.module.scss";
import dayjs from "dayjs";
import {View} from "@bear-calendar/utility";

interface IProps {
    start: dayjs.Dayjs;
    end: dayjs.Dayjs;
    step: (lastPoint: dayjs.Dayjs) => dayjs.Dayjs;
    format: string;
}
export const Times: React.FC<IProps> = (props) => {
    const times = useMemo(() => {
        let modified = dayjs(props.start);
        const tmp = [];

        while (!modified.isAfter(props.end)) {
            tmp.push(modified.toISOString());
            modified = props.step(modified);
        }

        return tmp;
    }, [props.end, props.start]);

    return (
        <View className={classes.times} horizontal>
            {times.map((i) => (
                <View center className={classes.time}>
                    {dayjs(i).format(props.format)}
                </View>
            ))}
        </View>
    );
};
