import {Instance, SnapshotIn, SnapshotOut, types} from "mobx-state-tree";
import {eventModel, IEventModel, IEventModelSnapshotIn} from "../event";

export const dayModel = types
    .model("dayModel", {
        date: types.identifier,
        events: types.optional(types.array(eventModel), []),
    })
    .actions((store) => ({
        removeEvent(event: IEventModel) {
            const findEvent = store.events.find((i) => i.id === event.id);
            if (findEvent) store.events.remove(findEvent);
        },
        addEvent(event: IEventModelSnapshotIn) {
            store.events.push(eventModel.create(event));
        },
    }))
    .views((store) => ({
        get hasEvents() {
            return store.events.length !== 0;
        },
    }));

export interface IDayModel extends Instance<typeof dayModel> {}
export interface IDayModelSnapshot extends SnapshotOut<typeof dayModel> {}
export interface IDayModelSnapIn extends SnapshotIn<typeof dayModel> {}
