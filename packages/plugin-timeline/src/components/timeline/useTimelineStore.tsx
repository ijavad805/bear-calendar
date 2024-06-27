import React, {useMemo, useState} from "react";
import {Timeline} from "./timeline";
import {enumZoomLevel} from "../../types";
import {makeAutoObservable} from "@bear-calendar/utility";
import dayjs, {Dayjs} from "dayjs";
import {TimeSplicer} from "./header/time-spliter";
import {EventsPositions} from "../../utils";

type TimelineProps = Parameters<typeof Timeline>["0"];

class TimelineStoreObserver {
    zoomLevel: enumZoomLevel = enumZoomLevel.Month;
    props: TimelineProps;
    eventsStartFrom: number = -1;
    eventsCtl: EventsPositions | null = null;

    constructor(props: TimelineProps) {
        makeAutoObservable(this);
        this.props = props;
        this.zoomLevel = enumZoomLevel[props.zoomLevel];
        this.eventsCtl = new EventsPositions();
    }

    onChangeZoomLevel(level: enumZoomLevel) {
        this.zoomLevel = level;
    }

    /**
     * get header times depend on the zoom level and
     * @param current
     * @param zoomLevel
     * @returns
     */
    timeAreaAndSections(current: Dayjs, zoomLevel = this.zoomLevel) {
        let end = dayjs();
        let start = dayjs();
        let format: string;
        let step: (date: dayjs.Dayjs) => dayjs.Dayjs;
        let children: Parameters<typeof TimeSplicer>["0"]["splice"]["children"];

        switch (zoomLevel) {
            case enumZoomLevel.Day:
                start = dayjs(current).startOf("day");
                end = dayjs(current).endOf("day");
                format = "HH:mm";
                step = (date: dayjs.Dayjs) => date.add(30, "minutes");
                break;
            case enumZoomLevel.Week:
                start = dayjs(current).startOf("week");
                end = dayjs(current).endOf("week");
                format = "dddd";
                step = (date: dayjs.Dayjs) => date.add(1, "day");
                children = (newTime: dayjs.Dayjs) =>
                    this.timeAreaAndSections(newTime, enumZoomLevel.Day);
                break;
            case enumZoomLevel.Month:
                start = dayjs(current).startOf("month");
                end = dayjs(current).endOf("month");
                format = "DD";
                step = (date: dayjs.Dayjs) => date.add(1, "day");
                break;
            default:
                start = dayjs(current).startOf("day");
                end = dayjs(current).endOf("day");
                format = "HH:mm";
                step = (date: dayjs.Dayjs) => date.add(30, "minutes");
                break;
        }

        return {start, end, format, step, children};
    }

    get canContentRender() {
        // TODO :: should be render after event calc
        return true;
    }
}

const TimelineStoreContext = React.createContext<
    TimelineStoreObserver | undefined
>(undefined);

interface IProps {
    value: TimelineProps;
    children: React.ReactNode;
}

export const useTimelineStore = () => {
    const context = React.useContext(TimelineStoreContext);

    if (context === undefined)
        throw new Error(
            "Please use useTimelineStore inside TimelinePropsProvider"
        );

    return context;
};

export const TimelineStoreProvider: React.FC<IProps> = ({
    value: {maxEventPerGroup = 5, ...values},
    ...props
}) => {
    const store = useMemo(
        () => new TimelineStoreObserver({maxEventPerGroup, ...values}),
        []
    );

    return (
        <TimelineStoreContext.Provider value={store}>
            {props.children}
        </TimelineStoreContext.Provider>
    );
};
