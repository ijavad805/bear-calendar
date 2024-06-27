import {BearCalendar} from "@bear-calendar/core";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import dayjs from "dayjs";
import {IEvent} from "@bear-calendar/utility";
import TimelinePlugin from "@bear-calendar/plugin-timeline";
export type IEventCustom = IEvent<{avatar: string; type: number}>;

const mockEvent = () => {
    const today = dayjs();
    // Generate mock data for events
    const events: IEventCustom[] = [];
    for (let i = 1; i <= 5; i++) {
        const startDate = today.add(i, "day").format("YYYY-MM-DD");
        const durationDays = Math.floor(Math.random() * 10); // Random duration up to 5 days
        const endDate = today
            .add(i + durationDays, "day")
            .format("YYYY-MM-DDTHH:mm:ss");
        events.push({
            id: i,
            title: `Event ${i}`,
            date: {
                start: startDate,
                end: endDate,
            },
            progress: Math.ceil(Math.random() * 100),
        });
    }

    return events;
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof BearCalendar> = {
    title: "Timeline Plugin",
    component: BearCalendar,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        fullscreen: true,
    },
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {},

    render(props) {
        return (
            <div style={{height: 600}}>
                <BearCalendar
                    view={"Monthly"}
                    config={{locale: "en"}}
                    events={mockEvent()}
                    onClickEvent={(event) => {
                        console.log("event click", event);
                    }}
                    {...props}
                />
            </div>
        );
    },
};

export default meta;

type Story = StoryObj<typeof BearCalendar>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        plugin: [
            new TimelinePlugin({
                groups: [
                    {
                        id: 1,
                        events: [1, 2, 3, 4],
                        label: "group 1",
                    },
                    {
                        id: 2,
                        events: [5, 6, 7, 8],
                        label: "group 2",
                    },
                    {
                        id: 3,
                        events: [9, 10, 11, 12],
                        label: "group 3",
                    },
                ],
                zoomLevel: "Day",
                
            }),
        ],
    },
};
