import {Instance, types} from "mobx-state-tree";
import {eventHandlerModel} from "./eventHandlerModel";
import {IEventModel} from "../../../store";

export const eventHandlerStore = types
    .model("eventHandlerStore", {
        events: types.optional(types.map(eventHandlerModel), {}),
    })
    .actions((store) => ({
        initialize(events: IEventModel[]) {
            store.events.replace(
                events.map((i) =>
                    eventHandlerModel.create({event: i.id, priority: null})
                )
            );
        },
    }))
    .views((store) => ({
        getById(id: number) {
            const tmp = store.events.get(id);
            if (tmp === undefined)
                throw new Error(
                    "Event not found in the store something is wrong"
                );

            return tmp;
        },
    }));

export interface IEventHandlerStore
    extends Instance<typeof eventHandlerStore> {}
