import React, {useMemo} from "react";
import classes from "./style.module.scss";
import {IEventCustom} from "../monthViewCompoenent.stories";
import dayjs from "dayjs";

interface IProps {
    isHover: boolean;
    isDragging: boolean;
    event: IEventCustom;
}
export const CustomEvent: React.FC<IProps> = (props) => {
    const isOneDayEvent = useMemo(
        () => dayjs(props.event.date.start).isSame(props.event.date.end, "day"),
        []
    );

    // TODO :: isHover
    // TODO :: isDragging
    return (
        <div
            className={`${classes.customEvent} ${
                props.event.extraData?.type === 1
                    ? classes.type1
                    : classes.type2
            } ${isOneDayEvent ? classes.isOneDay : ""}`}
        >
            <div className={classes.avatar}>
                <img
                    src={
                        props.event.extraData
                            ? props.event.extraData.avatar
                            : undefined
                    }
                    alt={""}
                />
            </div>
            <div className={classes.name}>{props.event.title}</div>
        </div>
    );
};
