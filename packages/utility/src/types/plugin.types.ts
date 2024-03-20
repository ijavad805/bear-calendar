export enum PluginName {
    Monthly = "Monthly",
    Yearly = "Yearly",
}

export interface Plugin {
    name:  keyof typeof PluginName;
    view?: () => React.ReactNode;
    components?: () => React.ReactNode;
}
