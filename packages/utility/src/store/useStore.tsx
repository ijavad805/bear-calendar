import React, {useContext, useMemo} from 'react';
import {IRootStore, rootStore} from './rootStore';
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
        throw new Error('Please use useStore inside CalendarStoreProvider');
    }

    return context;
};
