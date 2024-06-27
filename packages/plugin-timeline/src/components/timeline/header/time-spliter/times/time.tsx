import {useDayjs, View} from "@bear-calendar/utility";
import React, {useEffect} from "react";
import classes from "./style.module.scss";
import {useTimelineStore} from "../../../useTimelineStore";
import {OpUnitType} from "dayjs";

interface IProps {
    date: string;
    renderMore: React.ReactNode;
    format: string;
}
export const Time: React.FC<IProps> = (props) => {
    const dayjs = useDayjs();
    const {canContentRender, eventsCtl, zoomLevel} = useTimelineStore();

    useEffect(() => {
        setTimeout(() => {
            const elm = document.querySelector(
                `.${classes.time}`
            ) as HTMLDivElement;
            if (elm && props.renderMore) {
                if (eventsCtl) {
                    eventsCtl.setEventStartEndPosition(
                        elm,
                        dayjs(props.date)
                            .startOf(zoomLevel.toLowerCase() as OpUnitType)
                            .format(),
                        dayjs(props.date)
                            .startOf(zoomLevel.toLowerCase() as OpUnitType)
                            .format()
                    );
                }
            }
        }, 50);
    }, [props]);

    return (
        <View>
            <View center className={classes.time}>
                {dayjs(props.date).format(props.format)}
            </View>
            {props.renderMore && props.renderMore}
        </View>
    );
};
