import {types} from "mobx-state-tree";
import {dayModel, IDayModel, IDayModelSnapIn} from "../day";
import {
    IEventModel,
    IEventModelSnapshotIn,
    IEventRangeDateSnapshotIn,
} from "../event";
import dayjs from "dayjs";
import {formats} from "../../const";
export const dayStore = types
    .model("dayStore", {
        days: types.optional(types.map(dayModel), {}),
    })
    .actions((store) => ({
        add(day: IDayModelSnapIn) {
            store.days.put(
                dayModel.create({
                    ...day,
                    date: dayjs(day.date).format(formats.primary_key),
                })
            );
        },
    }))
    .actions((store) => ({
        replace(days: IDayModelSnapIn[]) {
            store.days.clear();
            days.forEach((day) => {
                store.days.put(dayModel.create({...day}));
            });
        },
        moveEvent(newDate: IEventRangeDateSnapshotIn, event: IEventModel) {
            const moveEvent_ = (day?: IDayModel) => {
                day && day.removeEvent(event);
                for (
                    let i = 0;
                    i < dayjs(newDate.start).diff(newDate.end, "day");
                    i++
                ) {
                    const newDate_ = dayjs(newDate.start).add(i, "day");
                    const newDayModel = store.days.get(
                        newDate_.format(formats.primary_key)
                    );
                    if (newDayModel) {
                        newDayModel.addEvent(event);
                    } else {
                        store.add({
                            date: newDate_.format(formats.primary_key),
                            events: [event],
                        });
                    }
                }
            };

            for (
                let i = 0;
                i < dayjs(event.date.start).diff(event.date.end, "day");
                i++
            ) {
                const date = dayjs(event.date.start).add(i, "day");
                const day = store.days.get(date.format(formats.primary_key));
                moveEvent_(day);
            }
        },
        addEvent(events: IEventModelSnapshotIn[]) {
            events.forEach((event) => {
                for (
                    let i = 0;
                    i < dayjs(event.date.start).diff(event.date.end, "day");
                    i++
                ) {
                    const date = dayjs(event.date.start).add(i, "day");
                    const day = store.days.get(
                        dayjs(date).format(formats.primary_key)
                    );

                    if (day) {
                        day.addEvent(event);
                    } else {
                        store.add({
                            date: date.format(),
                            events: [event],
                        });
                    }
                }
            });
        },
    }))
    .views((store) => ({
        get(date: string) {
            return store.days.get(dayjs(date).format(formats.primary_key));
        },
    }));
