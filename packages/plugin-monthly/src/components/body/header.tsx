import React from "react";
import {BearCalendarHeaderProps, observer, useCalendarProps} from "@bear-calendar/utility";
import classes from "./style/header.module.scss";

export const Header: React.FC<BearCalendarHeaderProps> = observer((props) => {
    const { extra} = useCalendarProps();

    // if (Components?.header)
    //     return <Components.header extra={extra} {...props} />;

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
