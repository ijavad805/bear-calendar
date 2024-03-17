export enum PluginName {
    Monthly = "Monthly",
    Yearly = "Yearly",
}

export interface Plugin {
    name: PluginName;
    view?: () => React.ReactNode;
    components?: () => React.ReactNode;
}
