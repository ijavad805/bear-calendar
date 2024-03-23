import React, {useEffect, useState} from "react";
import {IEventLogicProps} from "./eventLogic";
import {useEventHandler} from "./useEventHandler";
import dayjs from "dayjs";
import {findByQueryAsync} from "../../utility";

export const useEventPriority = (props: IEventLogicProps) => {
    const store = useEventHandler();
    const thisEvent = store.getById(props.event.id);
    const [style, setStyle] = useState<React.CSSProperties>({
        visibility: "hidden",
        zIndex: -1,
        userSelect: "none",
        WebkitUserSelect: "none",
        position: "absolute",
    });

    useEffect(() => {
        (async () => {
            const prevElm = (await findByQueryAsync(
                `.${props.id}`
            )) as HTMLDivElement;
            let top = 0;

            if (prevElm) {
                top =
                    prevElm.offsetHeight * props.priority + props.priority * 2;
            }

            setStyle({
                ...style,
                top,
            });

            // 1, it might be placed in more option
            if(props.maxPerCellEvent <= props.index){
                thisEvent.startRender(props.cellWidth);
                return;
            }

            if (thisEvent.mainId === null) {
                thisEvent.setMainId(props.uniqueId);
                thisEvent.setLastId(props.uniqueId);
            } else {
                thisEvent.setLastId(props.uniqueId);
            }

            // 2. it is last of the cells
            if (props.currentCellIndex === props.maxCellIndex - 1) {
                thisEvent.startRender(props.cellWidth);
            } else if (props.calcDiffRange() === 1) {
                // 3. it is end date
                thisEvent.startRender(props.cellWidth);
            }



       
        })();
    }, []);

    return {style};
};
