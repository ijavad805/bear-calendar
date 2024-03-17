import React from "react";
import {BearCalendarBodyProps} from "./body.types";
import {observer} from "@bear-calendar/utility";
import classes from "./style/body.module.scss";
import {Header} from "./header";

export const Body: React.FC<BearCalendarBodyProps> = observer((props) => {
    return (
        <div className={classes.body}>
            <Header
                onNext={props.onNext}
                onPrev={props.onPrev}
                title={props.title}
            />
            <div className={classes.body}>{props.children}</div>
        </div>
    );
});
