import React from "react";
import {Plugin, PluginName} from "@bear-calendar/utility";
import {Timeline} from "./components";

type IOption = Parameters<typeof Timeline>["0"];
export default class TimelinePlugin implements Plugin {
    name = PluginName.Monthly;
    options: IOption;
    constructor(options: IOption) {
        this.options = options;
    }

    view() {
        return <Timeline {...this.options} />;
    }

    footer() {
        return <div>HELLOOOO</div>;
    }
}
