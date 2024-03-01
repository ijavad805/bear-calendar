import {types, Instance} from 'mobx-state-tree';
import {dayStore} from './day-store';

export const rootStore = types.model('rootStore', {
    dayStore: types.optional(dayStore, {}),
});

export interface IRootStore extends Instance<typeof rootStore> {}
