import {IEventHandlerProps} from "../eventHandler";
import classes from "./style.module.scss";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {useTranslate} from "../../../locale";
import {Button} from "../../button";
import {EventLogic} from "../eventLogic";
import {observer, useOutsideClick} from "../../../utility";

let prevElmId = ``;

export const ShowMore: React.FC<IEventHandlerProps> = observer((props) => {
    const countShowMore = useMemo(
        () => props.events.length - props.maxRenderPerCell,
        [props.events]
    );
    const {t} = useTranslate();
    const [visible, setVisible] = useState(false);
    const [style, setStyle] = useState<React.CSSProperties>({
        display: "none",
    });
    const ref = useRef(null);

    useEffect(() => {
        const cellElm = props.findNextCell(0);

        if (cellElm) {
            setStyle({
                bottom: 0 + "px",
            });
        }
    }, [props.events]);

    useOutsideClick(ref, () => setVisible(false));

    if (countShowMore <= 0) return null;
    return (
        <div
            className={classes.showMore}
            style={style}
            ref={ref}
            data-test-id={"show-more-btn"}
        >
            <Button
                className={classes.button}
                type="ghost"
                size="sm"
                onClick={() => setVisible(true)}
            >
                {t("more", [countShowMore.toString()])}
            </Button>
            {visible && (
                <div className={`${classes.events}`}>
                    {props.events.map((event, index) => {
                        const id = `bear-calendar-event-handler-${event.id}`;
                        const uniqueId = `bear-calendar-event-handler-${
                            event.id
                        }-${Math.ceil(Math.random() * 100)}`;
                        const prevId_ = prevElmId;
                        prevElmId = id;

                        return (
                            <EventLogic
                                prevId={prevId_}
                                id={id}
                                uniqueId={uniqueId}
                                event={event}
                                currentCellIndex={props.currentCellIndex}
                                maxCellIndex={props.maxCellIndex}
                                calcDiffRange={() => props.calcDiffRange(event)}
                                renderItem={props.renderItem}
                                key={`${index}-${id}`}
                                index={index}
                                maxRenderPerCell={props.maxRenderPerCell}
                                findNextCell={props.findNextCell}
                                isStartFunc={props.isStartFunc}
                                setHeightForCell={() => {}}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
});
