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
            {props.event.progress !== undefined && (
                <View
                    className={classes.progress}
                    horizontal
                    spaceBetween
                    center
                >
                    <View
                        className={classes.fill}
                        style={{width: `${props.event.progress}%`}}
                    />
                    <span className={classes.label}>
                        {props.event.progress}%
                    </span>
                </View>
            )}
            <View horizontal className={classes.container}>
                <View className={classes.title}>{props.event.title}</View>
            </View>
        </View>
    );
};
