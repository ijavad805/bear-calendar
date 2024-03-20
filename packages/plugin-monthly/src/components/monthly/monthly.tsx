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
            <MonthlyView current={current.format()} />
        </Body>
    );
});
