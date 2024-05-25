import React from "react";
import {TimelinePropsProvider} from "./useTimelineProps";

export interface IGroup {
    label: string; // the label of the group
    events: number[]; // the list ids of the events should be include on this group
}
export interface IProps {
    groups: IGroup[];
    zoomLevel: "month" | "day" | "week";
}
export const Timeline: React.FC<IProps> = (props) => {
    return (
        <TimelinePropsProvider value={props}>
            <div>
                
            </div>
        </TimelinePropsProvider>
    );
};
