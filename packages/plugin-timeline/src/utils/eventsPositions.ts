import {IEventModel, makeAutoObservable} from "@bear-calendar/utility";

class EventWithPosition {
    reference: IEventModel;
    left: number | null = null;
    width: number | null = null;

    constructor(reference: IEventModel) {
        makeAutoObservable(this);
        this.reference = reference;
    }

    /**
     * this method can calc the width by get two left of the header cards
     */
    setEventStartElement(leftSide: number | null, endSide: number | null) {
        if (leftSide !== null) {
            this.left = leftSide;
        }
        if (this.left !== null) {
            this.width = endSide ? Math.abs(this.left - endSide) : null;
        }
    }
}

export class EventsPositions {
    private sortedEvents: EventWithPosition[] = [];
    constructor() {
        makeAutoObservable(this);
    }

    /**
     * this method should be call only in change zoom, or current date and initiate
     * sort events and only store event in this range
     */
    setEvents(events: IEventModel[], range: {start: string; end: string}) {
        const rangeStart = new Date(range.start).getTime();
        const rangeEnd = new Date(range.end).getTime();

        this.sortedEvents = events
            .slice()
            .filter((event) => {
                const eventStart = new Date(event.date.start).getTime();
                const eventEnd = new Date(event.date.end).getTime();
                return (
                    (eventStart >= rangeStart && eventStart <= rangeEnd) ||
                    (eventEnd >= rangeStart && eventEnd <= rangeEnd) ||
                    (eventStart <= rangeStart && eventEnd >= rangeEnd)
                ); // Event spans the entire range
            })
            .sort((a, b) => {
                const dateA = new Date(a.date.start).getTime();
                const dateB = new Date(b.date.end).getTime();
                return dateA - dateB;
            })
            .map((item) => new EventWithPosition(item));
    }

    getEvents() {
        return this.sortedEvents;
    }

    setEventStartEndPosition(elm: HTMLDivElement, start: string, end: string) {
        const events = [];
        for (let i = 0; i < this.sortedEvents.length; i++) {
            const event = this.sortedEvents[i];
            if (
                new Date(event.reference.date.start) >= new Date(start) &&
                new Date(event.reference.date.end) <= new Date(end)
            ) {
                if (event.left === null && event.width === null) {
                    event.setEventStartElement(elm.offsetLeft, null);
                } else if (event.left !== null && event.width === null) {
                    event.setEventStartElement(null, elm.offsetLeft);
                }
                events.push(event);
            } else {
                if (events.length !== 0) {
                    break;
                }
            }
        }
    }
}
