import React, {useEffect, useState} from "react";
import {findByClassAsync} from "../../utility";
import {IEventLogicProps} from "./eventLogic";
import {useEventHandler} from "./useEventHandler";
import dayjs from "dayjs";

export const useEventPriority = (props: IEventLogicProps) => {
    const store = useEventHandler();
    const thisEvent = store.getById(props.event.id);
    const [style, setStyle] = useState<React.CSSProperties>({
        visibility: "hidden",
    });

    useEffect(() => {
        (async () => {
            const prevElm = (await findByClassAsync(
                props.id
            )) as HTMLDivElement;
            let top = 0;
            let width = props.cellWidth;
            const isStartRendering =
                thisEvent.isRendering === false ||
                dayjs(props.event.date.end).diff(
                    props.event.date.start,
                    "day"
                ) +
                    1 ===
                    props.calcDiffRange();

            if (prevElm) {
                top =
                    prevElm.offsetHeight * props.priority + props.priority * 2;
            }
            if (isStartRendering) {
                thisEvent.startRendering();
            } else if (
                thisEvent.isRendering === true &&
                props.currentCellIndex === props.maxCellIndex - 1
            ) {
                thisEvent.stopRendering();
            }

            if (isStartRendering) {
                const difDays = props.calcDiffRange();

                if (props.maxCellIndex - props.currentCellIndex > difDays) {
                    width = width * difDays;
                } else {
                    width =
                        width * (props.maxCellIndex - props.currentCellIndex);
                }
            }
            setStyle({
                visibility: isStartRendering ? "visible" : "hidden",
                zIndex: isStartRendering ? 1 : -1,
                userSelect: "none",
                WebkitUserSelect: "none",
                position: "absolute",
                top,
                width,
            });
        })();
    }, []);

    return {style};
};
