import {flow, types} from "mobx-state-tree";
import {eventModel} from "../../../store";
import {findByQueryAsync} from "../../../utility";

export const eventHandlerModel = types
    .model("eventHandlerModel", {
        event: types.identifierNumber,
        priority: types.maybeNull(types.number),
        mainId: types.maybeNull(types.string),
        lastId: types.maybeNull(types.string),
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
        setMainId(id: string | null) {
            self.mainId = id;
        },
        setLastId(id: string) {
            self.lastId = id;
        },
        startRender(cellWidth: number) {
            const mainId = self.mainId;
            const lastId = self.lastId;
            self.mainId = null;
            self.lastId = null;
            (async () => {
                if (mainId === null && lastId === null) return;
                const elm = (await findByQueryAsync(
                    `#${mainId}`
                )) as HTMLDivElement;
                const lastElmPlace = (await findByQueryAsync(
                    `#${lastId}`
                )) as HTMLDivElement;

                if (elm && lastElmPlace) {
                    const elmRect = elm.getBoundingClientRect();
                    const lastElmPlaceRect =
                        lastElmPlace.getBoundingClientRect();

                    const width =
                        lastElmPlaceRect.left - elmRect.left + cellWidth + "px";
                    elm.style.width = width;
                    elm.setAttribute("data-logic-is-working", width);
                    elm.style.visibility = "visible";
                    elm.style.zIndex = "1";
                }
            })();
         

            // in tree level it should be start to render
            // 1. when its placed in the more button
            // 2. when its placed at end of the row
            // 3. when it is end date
        },
    }));
