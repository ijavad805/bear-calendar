import {Instance, types} from "mobx-state-tree";
import {eventHandlerModel} from "./eventHandlerModel";
import {IEventModel, eventModel} from "../../../store";
import dayjs from "dayjs";
import {toJS} from "mobx";

export const eventHandlerStore = types
    .model("eventHandlerStore", {
        events: types.optional(types.map(eventHandlerModel), {}),
        draggingEvent: types.maybeNull(eventModel),
        droppingEventDays: types.optional(types.array(types.string), []),
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
        startDragging(event: IEventModel) {
            store.draggingEvent = eventModel.create(toJS(event));
        },
        maybeDroppingIn(newStartDate: string, newEndDate: string) {
            store.droppingEventDays.replace([newStartDate, newEndDate]);
        },
        stopDragging() {
            store.droppingEventDays.replace([]);
            store.draggingEvent = null;
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
        isThisDayDropping(day: string) {
            if (store.droppingEventDays.length < 2) return false;

            return (
                (dayjs(day).isAfter(store.droppingEventDays[0], "day") &&
                    dayjs(day).isBefore(store.droppingEventDays[1], "day")) ||
                dayjs(day).isSame(store.droppingEventDays[0], "day") ||
                dayjs(day).isSame(store.droppingEventDays[1], "day")
            );
        },
    }));

export interface IEventHandlerStore
    extends Instance<typeof eventHandlerStore> {}
