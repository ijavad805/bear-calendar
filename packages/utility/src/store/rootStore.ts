import {types, Instance} from "mobx-state-tree";
import {dayStore} from "./day-store";
import dayjs, {Dayjs} from "dayjs";

export const rootStore = types
    .model("rootStore", {
        current: types.optional(types.frozen<Dayjs>(), dayjs()),
        dayStore: types.optional(dayStore, {}),
    })
    .actions((store) => ({
        changeCurrent(newDate: Dayjs) {
            store.current = newDate;
        },
    }));

export interface IRootStore extends Instance<typeof rootStore> {}
