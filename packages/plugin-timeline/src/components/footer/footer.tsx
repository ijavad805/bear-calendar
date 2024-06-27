import {observer, Slider, View} from "@bear-calendar/utility";
import React, {useState} from "react";
import {useTimelineStore} from "../timeline";
import {enumZoomLevel} from "../../types";

export const Footer = observer(() => {
    const store = useTimelineStore();

    return (
        <View>
            <Slider
                options={[
                    {
                        label: "Day View",
                        value: enumZoomLevel.Day,
                    },
                    {
                        label: "Weak View",
                        value: enumZoomLevel.Week,
                    },
                    {
                        label: "Month View",
                        value: enumZoomLevel.Month,
                    },
                    {
                        label: "Year View",
                        value: enumZoomLevel.Year,
                    },
                ]}
                onChange={(e) => {
                    store.onChangeZoomLevel(e as enumZoomLevel);
                }}
                value={store.zoomLevel}
            />
        </View>
    );
});
