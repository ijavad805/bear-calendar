import React from "react";
import {Plugin, PluginName} from "@bear-calendar/utility";

// type IOption = Parameters<typeof Monthly>["0"];
export default class YearlyPlugin implements Plugin {
    name = PluginName.Yearly;
    constructor() {
    }
    view() {
        return <></>;
    }
}