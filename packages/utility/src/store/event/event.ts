import {types, Instance, SnapshotIn} from "mobx-state-tree";

export const eventDateRangeModel = types.model("eventDateRangeModel", {
    start: types.string,
    end: types.string,
});

export const eventModel = types.model("eventModel", {
    id: types.identifierNumber,
    title: types.string,
    date: eventDateRangeModel,
    disabled: types.optional(types.boolean, false),
});

export interface IEventModel extends Instance<typeof eventModel> {}
export interface IEventModelSnapshotIn extends SnapshotIn<typeof eventModel> {}
export interface IEventRangeDateSnapshotIn extends SnapshotIn<typeof eventDateRangeModel> {}