import {types, Instance, SnapshotIn} from 'mobx-state-tree';

export const eventModel = types.model('eventModel', {
    id: types.identifierNumber,
    title: types.string,
    date: types.string,
    disabled: types.optional(types.boolean, false),
});

export interface IEventModel extends Instance<typeof eventModel> {}
export interface IEventModelSnapshotIn extends SnapshotIn<typeof eventModel> {}
