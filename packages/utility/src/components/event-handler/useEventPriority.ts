import React, {useEffect, useState} from "react";
import {IEventLogicProps} from "./eventLogic";
import {useEventHandler} from "./useEventHandler";
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
    const [rerender, forceRender] = useState({update: 0});

    useEffect(() => {
        (async () => {
            if (thisEvent.priority === null) return;
            if (props.priority === undefined) {
                setStyle({
                    visibility: "visible",
                    position: "relative",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                });

                return;
            }

            try {
                const prevElm = (await findByQueryAsync(
                    `.${props.id}`
                )) as HTMLDivElement;
                const currentElm = (await findByQueryAsync(
                    `#${props.uniqueId}`
                )) as HTMLDivElement;
                const prevCell = props.findNextCell(-1);

                let top = 0;

                if (prevElm) {
                    top =
                        prevElm.offsetHeight * props.priority +
                        props.priority * 2;
                }

                setStyle({
                    ...style,
                    top,
                });

                if (props.index >= props.maxRenderPerCell) return;

                const render = () => {
                    for (
                        let i = 0;
                        i + props.currentCellIndex < props.maxCellIndex;
                        i++
                    ) {
                        const nextCell = props.findNextCell(i);
                        if (nextCell === undefined) return;

                        const res = thisEvent.tryStartRender(
                            currentElm,
                            nextCell,
                            props.maxRenderPerCell,
                            props.calcDiffRange() - i === 1 ||
                                props.currentCellIndex + i ===
                                    props.maxCellIndex - 1,
                            props.currentCellIndex,
                            props.maxCellIndex
                        );

                        if (res) return;
                    }
                };

                if (
                    props.currentCellIndex === 0 ||
                    props.isStartFunc(props.event)
                ) {
                    render();
                } else if (props.currentCellIndex + 1 === props.maxCellIndex) {
                    render();
                } else if (
                    thisEvent.priority !== null &&
                    prevCell &&
                    prevCell.querySelector(
                        `div[data-test-id='show-more-btn']`
                    ) &&
                    thisEvent.priority >= props.maxRenderPerCell
                ) {
                    render();
                }
            } catch (e) {}
        })();
    }, [rerender]);

    useEffect(() => {
        const forceRerenderPage = () => forceRender({update: 0});
        forceRerenderPage();
        // Add event listener to window resize event
        window.addEventListener("resize", forceRerenderPage);

        // Remove event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", forceRerenderPage);
        };
    }, []);

    return {style};
};
