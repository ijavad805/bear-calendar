import {PluginName, useCalendarProps} from "@bear-calendar/utility";
import React, {useEffect, useMemo, useState} from "react";
import classes from "./style.module.scss";
import {Footer} from "./footer";
export const View: React.FC = () => {
    const calendarProps = useCalendarProps();
    const [activeView, setActiveView] = useState<keyof typeof PluginName>(
        calendarProps.view || calendarProps.plugin[0].name
    );
    const view = useMemo(() => {
        if (activeView) {
            const findView = calendarProps.plugin.find(
                (i) => i.name === activeView
            );
            if (findView) return findView;
        }

        return null;
    }, [activeView]);

    useEffect(() => {
        if (calendarProps.view) setActiveView(calendarProps.view);
    }, [calendarProps.view]);

    if (!view) return <>Plugin not found</>;

    const render = () => {
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

                <div className={classes.body}>
                    {view.view ? view.view() : null}
                </div>
                <Footer
                    changeView={(name) => setActiveView(name)}
                    activePlugin={activeView}
                >
                    {view.footer ? view.footer() : null}
                </Footer>
            </div>
        );
    };

    return view.context ? view.context(render()) : render();
};
