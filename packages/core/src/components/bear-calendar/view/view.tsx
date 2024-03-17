import {PluginName, useCalendarProps} from "@bear-calendar/utility";
import React, {useEffect, useMemo, useState} from "react";
import classes from "./style.module.scss";
export const View: React.FC = () => {
    const calendarProps = useCalendarProps();
    const [activeView, setActiveView] = useState<PluginName>(
        calendarProps.view || calendarProps.plugin[0].name
    );
    const view = useMemo(() => {
        if (activeView) {
            const findView = calendarProps.plugin.find(
                (i) => i.name === activeView
            );

            if (findView && findView.view) return findView.view();
        }

        return <>View Not Found</>;
    }, [activeView]);

    useEffect(() => {
        if (calendarProps.view) setActiveView(calendarProps.view);
    }, [calendarProps.view]);

    return (
        <div className={classes.view}>
            {calendarProps.enableViewControl &&
                calendarProps.plugin.filter((i) => i.view).length > 1 && (
                    <div className={classes.viewControl}>
                        {calendarProps.plugin
                            .filter((i) => i.view)
                            .map((item) => (
                                <div
                                    className={classes.btn}
                                    onClick={() => setActiveView(item.name)}
                                >
                                    {item.name}
                                </div>
                            ))}
                    </div>
                )}

            <div className={classes.body}>{view}</div>
        </div>
    );
};
