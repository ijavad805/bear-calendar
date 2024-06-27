import React from "react";
import {View} from "@bear-calendar/utility";
import {Times} from "./times";
import dayjs from "dayjs";

type ITimesProps = Parameters<typeof Times>["0"];

export interface ISplice extends ITimesProps {
    children?: (newTime: dayjs.Dayjs) => ISplice;
}

export interface IProps {
    splice: ISplice;
}

/**
 * nested times, like hours of a week
 * @param props
 * @returns
 */
export const TimeSplicer: React.FC<IProps> = (props) => {
    
    return (
        <View>
            <Times
                start={props.splice.start}
                end={props.splice.end}
                step={props.splice.step}
                format={props.splice.format}
                renderMore={(time) => {
                    if (!props.splice.children) return null;
                    return <TimeSplicer splice={props.splice.children(time)} />;
                }}
            />
        </View>
    );
};
