import React from "react"
import { MonthlyView, useCalendarProps } from "@bear-calendar/utility"
import { Body } from "../body";

export const Monthly = () => {
    const mainProps = useCalendarProps();

    return (
        <Body>
            <MonthlyView current={mainProps.defaultCurrent}/>
        </Body>
    )
}