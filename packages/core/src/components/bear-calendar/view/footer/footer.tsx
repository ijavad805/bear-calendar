import classes from "./style.module.scss";
import {
    joinClass,
    PluginName,
    useCalendarProps,
    View,
} from "@bear-calendar/utility";
import React, {useMemo, useState} from "react";

interface IProps {
    children: React.ReactNode;
    activePlugin: keyof typeof PluginName;
    changeView: (name: keyof typeof PluginName) => void;
}

export const Footer: React.FC<IProps> = ({
    children,
    changeView,
    activePlugin,
}) => {
    const props = useCalendarProps();

    return (
        <View className={classes.footer} horizontal spaceBetween center>
            {props.plugin.length > 1 && (
                <View space="tiny" horizontal>
                    {props.plugin.map((item) => (
                        <View
                            center
                            className={joinClass(classes.plugin, [
                                activePlugin === item.name,
                                classes.active,
                            ])}
                            onClick={changeView.bind(window, item.name)}
                        >
                            {item.name.split("")[0]}
                        </View>
                    ))}
                </View>
            )}
            {children}
        </View>
    );
};
