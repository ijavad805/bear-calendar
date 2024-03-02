import {types} from 'mobx-state-tree';
import {dayModel, IDayModelSnapIn} from '../day';
import {IEventModel} from '../event';
import dayjs from 'dayjs';
import {formats} from '../../const';
export const dayStore = types
    .model('dayStore', {
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
        moveEvent(newDate: string, event: IEventModel) {
            const day = store.days.get(
                dayjs(event.date).format(formats.primary_key)
            );
            if (day) {
                day.removeEvent(event);
                const newDayModel = store.days.get(
                    dayjs(newDate).format(formats.primary_key)
                );
                if (newDayModel) {
                    newDayModel.addEvent(event);
                } else {
                    store.add({
                        date: newDate,
                        events: [event],
                    });
                }
            }
        },
    }));
