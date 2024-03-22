import React from "react";
import {
    MonthlyView,
    observer,
    useCalendarProps,
    useStore,
} from "@bear-calendar/utility";
import {Body} from "../body";
import classes from "./style.module.scss";

export const Monthly = observer(() => {
    const mainProps = useCalendarProps();
    const {current, changeCurrent} = useStore();

    return (
        <Body
            onNext={() => {
                changeCurrent(current.add(1, "month"));
            }}
            onPrev={() => {
                changeCurrent(current.add(-1, "month"));
            }}
            title={
                <div className={classes.title}>
                    {current.format("MMMM")}
                    <div className={classes.year}>{current.format("YYYY")}</div>
                </div>
            }
        >
            <MonthlyView
                current={current.format()}
                renderCell={(props) => (
                    <div className={classes.cell}>
                        <div className={classes.header}>
                            <div className={classes.month}>
                                {props.day.format("MMM")}
                            </div>
                            <div className={classes.day}>
                                {props.day.format("DD")}
                            </div>
                        </div>
                        <div className={classes.body}>{props.events}</div>
                    </div>
                )}
                renderEvent={(event, attr) => (
                    <div className={classes.event} {...attr}>
                        {event.title}
                    </div>
                )}
            />
        </Body>
    );
});
