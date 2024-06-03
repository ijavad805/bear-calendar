import classes from "./style.module.scss";
import React from "react";
import {IEventModel} from "../../store";
import {View} from "../view";

interface IProps {
    event: IEventModel;
}
export const EventCard: React.FC<IProps> = (props) => {
    return (
        <View className={classes.eventsItem} horizontal>
            <View className={classes.title}>{props.event.title}</View>
        </View>
    );
};
