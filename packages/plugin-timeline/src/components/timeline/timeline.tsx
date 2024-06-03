import React from "react";
import {TimelinePropsProvider} from "./useTimelineProps";
import {Content} from "./content";
import {IEventModel, View} from "@bear-calendar/utility";
import classes from "./style.module.scss";
import {Header} from "./header";
export interface IGroup {
    /**
     * the label of the group
     */
    label: string;

    /**
     * The list of event IDs should be included in this group, make sure the event exist on the events list
     * # Example
     * ```
     * <BearCalendar
     *      events={[
     *           id: 1,
     *           name: "test"
     *      ]}
     *      plugin={[
     *           Timeline({
     *                groups: [
     *                      {
     *                         label: "test",
     *                         events: [1]
     *                      }
     *               ]
     *          })]
     *      }
     * />
     * ```
     */
    events: number[];
}
export interface IProps {
    groups: IGroup[];
    zoomLevel: "month" | "day" | "week";

    /**
     * default is 5
     */
    maxEventPerGroup?: number;

    /**
     *
     */
    renderEvent?: (event: IEventModel) => React.ReactNode;
}
export const Timeline: React.FC<IProps> = (props) => {
    return (
        <TimelinePropsProvider value={props}>
            <View className={classes.timeline}>
                    <Header />
                    <Content />
            </View>
        </TimelinePropsProvider>
    );
};
