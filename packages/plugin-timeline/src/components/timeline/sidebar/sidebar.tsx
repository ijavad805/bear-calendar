import {GroupCard} from "../../card";
import {useTimelineProps} from "../useTimelineProps";
import classes from "./style.module.scss";
import React from "react";

export const Sidebar = () => {
    const {groups} = useTimelineProps();
    return (
        <div className={classes.sidebar}>
            {groups.map((item) => (
                <GroupCard label={item.label} />
            ))}
        </div>
    );
};
