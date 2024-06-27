import React from "react";
import {Content} from "./content";
import {IEventModel, View} from "@bear-calendar/utility";
import classes from "./style.module.scss";
import {Header} from "./header";
import { enumZoomLevel } from "../../types";
export interface IGroup {
    /**
     * should be unique
     */
    id: number;

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
    zoomLevel: keyof typeof enumZoomLevel;

    /**
     * default is 5
     */
    maxEventPerGroup?: number;

    dragOptions?: {
        canMoveToAnotherGroup: boolean;
    };

    /**
     * on drop the event on another time or group
     */
    onDrop?: (event: IEventModel, groupId: number) => void;

    /**
     *
     */
    renderEvent?: (event: IEventModel) => React.ReactNode;
}
export const Timeline: React.FC<IProps> = (props) => {
    return (
        <View className={classes.timeline}>
            <Header />
            <Content />
        </View>
    );
};
