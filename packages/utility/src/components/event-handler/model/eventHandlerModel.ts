import {types} from "mobx-state-tree";
import {eventModel} from "../../../store";

export const eventHandlerModel = types
    .model("eventHandlerModel", {
        event: types.identifierNumber,
        priority: types.maybeNull(types.number),
        isRendering: types.optional(types.boolean, false),
        isHover: types.optional(types.boolean, false),
    })
    .actions((self) => ({
        setPriority(index: number) {
            if (self.priority === null) {
                self.priority = index;
            }
        },
        startRendering() {
            self.isRendering = true;
        },
        stopRendering() {
            self.isRendering = false;
        },
        startHovering() {
            self.isHover = true;
        },
        endHovering() {
            self.isHover = false;
        },
    }));
