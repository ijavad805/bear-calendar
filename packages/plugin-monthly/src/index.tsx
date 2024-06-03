import React from "react";
import {Plugin, PluginName} from "@bear-calendar/utility";
import {Monthly} from "./components";

type IOption = Parameters<typeof Monthly>["0"];
export default class MonthlyPlugin implements Plugin {
    name = PluginName.Monthly;
    options: IOption | undefined;
    constructor(options?: IOption) {
        this.options = options;
    }
    view() {
        return <Monthly {...this.options} />;
    }
}
