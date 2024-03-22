import React, {useEffect, useState} from "react";
import {IEventModel} from "../../store";
import {useEventHandler} from "./useEventHandler";
import dayjs from "dayjs";
import classes from "./style.module.scss";
import {observer} from "mobx-react-lite";
import {BearCalendarMonthlyViewProps} from "../mount-view";

interface IProps {
    id: string;
    prevId: string;
    event: IEventModel;
    currentCellIndex: number;
    maxCellIndex: number;
    cellWidth: number;
    priority: number;
    calcDiffRange: () => number;
    renderItem: BearCalendarMonthlyViewProps["renderEvent"];
}
const findAsyncId = async (id: string) => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            const elm = document.querySelector(`.${id}`) as HTMLDivElement;
            if (elm) {
                resolve(elm);
                clearInterval(interval);
            }
        }, 0);
        setTimeout(() => clearInterval(interval), 100);
    });
};
export const EventLogic: React.FC<IProps> = observer((props) => {
    const store = useEventHandler();
    const [style, setStyle] = useState<React.CSSProperties>({
        visibility: "hidden",
    });
    const thisEvent = store.getById(props.event.id);

    useEffect(() => {
        (async () => {
            const prevElm = (await findAsyncId(props.id)) as HTMLDivElement;

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

    return (
        <div
            style={style}
            className={`${classes.eventLogic} ${props.id}`}
            onMouseEnter={() => {
                thisEvent.startHovering();
            }}
            onMouseLeave={() => {
                thisEvent.endHovering();
            }}
        >
            {props.renderItem(props.event, thisEvent.isHover)}
        </div>
    );
});
