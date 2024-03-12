import React from "react";
import {observer} from "@bear-calendar/utility";
import {BearCalendarHeaderProps} from "../bear-calendar";
import {useCalendarProps} from "../bear-calendar/context";
import classes from "./style/header.module.scss";

export const Header: React.FC<BearCalendarHeaderProps> = observer((props) => {
    const {components: Components, extra} = useCalendarProps();

    if (Components?.header)
        return <Components.header extra={extra} {...props} />;

    return (
        <div className={classes.header} {...props}>
            <div className={classes.controllers}>
                <div className={classes.controller} onClick={props.onNext}>
                    {">"}
                </div>
                <div className={classes.title}>{props.title}</div>
                <div className={classes.controller}>{"<"}</div>
            </div>
            <div className={classes.extra}>{extra}</div>
        </div>
    );
});
