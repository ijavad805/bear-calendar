import {Instance, types} from "mobx-state-tree";
import {eventHandlerModel} from "./eventHandlerModel";
import {IEventModel} from "../../../store";

export const eventHandlerStore = types
    .model("eventHandlerStore", {
        events: types.optional(types.map(eventHandlerModel), {}),
    })
    .actions((store) => ({
        initialize(events: IEventModel[]) {
            events.forEach((i) => {
                store.events.put(
                    eventHandlerModel.create({event: i.id, priority: null})
                );
            });
        },
        addEvent(id: number) {
            if (store.events.get(id) !== undefined) return;
            store.events.put(
                eventHandlerModel.create({event: id, priority: null})
            );
        },
    }))
    .views((store) => ({
        getById(id: number) {
            let tmp = store.events.get(id);
            if (tmp === undefined) {
                store.addEvent(id);
                tmp = store.events.get(id);

                if (tmp === undefined) throw new Error("Cant find event");
            }

            return tmp;
        },
    }));

export interface IEventHandlerStore
    extends Instance<typeof eventHandlerStore> {}
