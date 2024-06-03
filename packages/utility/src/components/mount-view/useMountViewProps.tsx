import React, {useContext, useMemo} from "react";
import {BearCalendarMonthlyViewProps} from "./monthly.types";

const MountViewContext = React.createContext<
    BearCalendarMonthlyViewProps | undefined
>(undefined);
interface IProps {
    value: BearCalendarMonthlyViewProps;
    children: React.ReactNode;
}
export const MountViewPropsProvider: React.FC<IProps> = (props) => {
    return (
        <MountViewContext.Provider value={props.value}>
            {props.children}
        </MountViewContext.Provider>
    );
};
export const useMountViewProps = () => {
    const model = useContext(MountViewContext);

    if (model === undefined)
        throw new Error(
            "the useMountViewProps should be use inside MountViewPropsProvider"
        );
    return model;
};
