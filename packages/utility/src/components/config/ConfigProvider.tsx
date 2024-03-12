import React, { useContext } from "react";
import { BearConfigProviderProps } from "./ConfigProvider.types";

const ConfigContext = React.createContext<BearConfigProviderProps>({
    locale: "en"
});

interface IProps{
    children: React.ReactNode;
    value: BearConfigProviderProps;
}
export const useConfig = () => {
    const context = useContext(ConfigContext);
    if(context === undefined) throw new Error("please use useConfig inside Provider Context");

    return context;
}
export const ProviderContext: React.FC<IProps> = (props) => {
    return (
        <ConfigContext.Provider value={props.value}>
            {props.children}
        </ConfigContext.Provider>
    )
}