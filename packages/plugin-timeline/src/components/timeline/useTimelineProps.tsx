import React from "react";
import {Timeline} from "./timeline";

type TimelineProps = Parameters<typeof Timeline>["0"];
const TimelinePropsContext = React.createContext<TimelineProps | undefined>(
    undefined
);

interface IProps {
    value: TimelineProps;
    children: React.ReactNode;
}

export const useTimelineProps = () => {
    const context = React.useContext(TimelinePropsContext);

    if (context === undefined)
        throw new Error(
            "Please use useTimelineProps inside TimelinePropsProvider"
        );

    return context;
};

export const TimelinePropsProvider: React.FC<IProps> = (props) => {
    return (
        <TimelinePropsContext.Provider value={props.value}>
            {props.children}
        </TimelinePropsContext.Provider>
    );
};
