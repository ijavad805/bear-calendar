import React from "react";
import {Plugin, PluginName} from "@bear-calendar/utility";
import {Monthly} from "./components";

export default class MonthlyPlugin implements Plugin {
    name = PluginName.Monthly;
    view() {
        return <Monthly />;
    }
}
