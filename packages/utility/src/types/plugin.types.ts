export enum PluginName {
    Monthly = "Monthly",
    Yearly = "Yearly",
}

export interface Plugin {
    name: keyof typeof PluginName;
    view?: () => React.ReactNode;
    components?: () => React.ReactNode;
    footer?: () => React.ReactNode;
    context?: (
        children: React.ReactElement<any, any> | null
    ) => React.ReactElement<any, any> | null;
}
