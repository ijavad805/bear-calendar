import {toJS} from "mobx";
import {GroupCard} from "../../card";
import {useTimelineProps} from "../useTimelineProps";
import classes from "./style.module.scss";
import {observer, View} from "@bear-calendar/utility";
import React, {useEffect} from "react";
import {IDS} from "../ids";

export const Content = observer(() => {
    const {groups} = useTimelineProps();

    useEffect(() => {
        const headerElm = document.getElementById(IDS.header);
        const contentElm = document.getElementById(IDS.content);
        if (headerElm && contentElm) {
            contentElm.style.width = `${headerElm.offsetWidth}px`;
        }
    }, []);

    return (
        <View className={classes.content} id={IDS.content}>
            {groups.map((item, index) => (
                <GroupCard
                    label={item.label}
                    events={item.events}
                    key={`group-${index}`}
                />
            ))}
        </View>
    );
});
