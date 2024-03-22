import {BearCalendarMonthlyViewRenderCellProps} from "@bear-calendar/utility";
import classes from "./style/cell.module.scss";
import React from "react";

const Cell: React.FC<BearCalendarMonthlyViewRenderCellProps> = (props) => {
    const cellClasses = () => {
        const tmp = [classes.cell];
        if (props.isPast) {
            tmp.push(classes.past);
        }
        if (props.isDisabled) {
            tmp.push(classes.disabled);
        }
        if (props.isToday) {
            tmp.push(classes.today);
        }
        if (props.isDropping) {
            tmp.push(classes.dropping);
        }

        return tmp.join(" ");
    };

    return (
        <div className={cellClasses()}>
            <div className={classes.header}>
                <div className={classes.month}>{props.day.format("MMM")}</div>
                <div className={classes.day}>{props.day.format("DD")}</div>
            </div>
            <div className={classes.events}>{props.eventsNode}</div>
        </div>
    );
};
export default Cell;
