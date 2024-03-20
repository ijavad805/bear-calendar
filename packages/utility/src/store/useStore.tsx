import React, {useContext, useEffect, useMemo} from "react";
import {IRootStore, rootStore} from "./rootStore";
import {onSnapshot} from "mobx-state-tree";
import { toJS } from "mobx";
const RootStoreContext = React.createContext<IRootStore | undefined>(undefined);

interface IProps {
    children: React.ReactNode;
}
export const CalendarStoreProvider: React.FC<IProps> = (props) => {
    const model = useMemo(() => rootStore.create({}), []);
    return (
        <RootStoreContext.Provider value={model}>
            {props.children}
        </RootStoreContext.Provider>
    );
};
export const useStore = () => {
    const context = useContext(RootStoreContext);

    if (!context) {
        throw new Error("Please use useStore inside CalendarStoreProvider");
    }

    return context;
};

export const useInitStore = () => {
    const store = useStore();

    useEffect(() => {
        if (__DEV__) {
            console.log("MODEL --> ", toJS(store));
            const unsubscribe = onSnapshot(store, (changed) =>
                console.log("MODEL --> ", toJS(changed))
            );
            () => unsubscribe();
        }
    }, []);
};
