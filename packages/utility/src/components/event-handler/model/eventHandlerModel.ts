import {flow, types} from "mobx-state-tree";
import {eventModel} from "../../../store";
import {findByQueryAsync} from "../../../utility";

export const eventHandlerModel = types
    .model("eventHandlerModel", {
        event: types.identifierNumber,
        priority: types.maybeNull(types.number),
        isHover: types.optional(types.boolean, false),
    })
    .actions((self) => ({
        setPriority(index: number) {
            if (self.priority === null) {
                self.priority = index;
            }
        },
        startHovering() {
            self.isHover = true;
        },
        endHovering() {
            self.isHover = false;
        },
        tryStartRender(
            currentEvent: HTMLDivElement,
            nextCell: HTMLDivElement,
            max: number,
            isEnd: boolean,
            current: number,
            maxCell: number
        ) {
            if (self.priority === null) return;

            const haveShowMore =
                nextCell.querySelector(`div[data-test-id="show-more-btn"]`) !==
                null;

            const render = (isEnd: boolean) => {
                const rectNext = nextCell.getBoundingClientRect();
                const rectEvent = currentEvent.getBoundingClientRect();
                const widthIdIsEnd = isEnd ? rectNext.width - 2 : 0;

                currentEvent.style.width =
                    rectNext.left - rectEvent.left + widthIdIsEnd + "px";
                currentEvent.style.visibility = "visible";
                currentEvent.style.zIndex = Math.abs(
                    maxCell - current
                ).toString();
            };

            if (haveShowMore) {
                if (self.priority > max) {
                    render(false);
                    return true;
                }
            }
            if (isEnd) {
                render(true);
                return true;
            }

            return false;
        },
    }));
