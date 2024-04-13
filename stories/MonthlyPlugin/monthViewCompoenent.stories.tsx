import {BearCalendar} from "@bear-calendar/core";
import MonthlyPlugin from "@bear-calendar/plugin-monthly";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import dayjs from "dayjs";
import {IEvent} from "@bear-calendar/utility";
import avatarICon from "./avatar.png";
import {CustomEvent} from "./custom-event";
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
            extraData: {
                avatar: avatarICon,
                type: Math.floor(Math.random() * 3),
            },
        });
    }

    return events;
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof BearCalendar> = {
    title: "Monthly Calendar Plugin",
    component: BearCalendar,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        fullscreen: true,
    },
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {},
    render(props) {
        return (
            <BearCalendar
                view={"Monthly"}
                config={{locale: "en"}}
                events={mockEvent()}
                onClickEvent={(event) => {
                    console.log("event click", event);
                }}
                {...props}
            />
        );
    },
};

export default meta;

type Story = StoryObj<typeof BearCalendar>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        plugin: [new MonthlyPlugin()],
    },
};

export const DisableDays: Story = {
    args: {
        plugin: [new MonthlyPlugin()],
        disabledDate(date) {
            return date.weekday() === 1;
        },
    },
};

export const CustomEventComponent: Story = {
    args: {
        plugin: [
            new MonthlyPlugin({
                renderEvent(props) {
                    return <CustomEvent {...(props as any)} />;
                },
            }),
        ],
    },
};

export const DragAndDropMonthEvent: Story = {
    args: {
        plugin: [new MonthlyPlugin()],
        onDropEvent: (event, newDate) => {
            console.log("event drop", event, newDate);
        },
    },
};

export const PerDayCustomStyleAndClass: Story = {
    args: {
        plugin: [new MonthlyPlugin()],
        onDropEvent: (event, newDate) => {
            console.log("event drop", event, newDate);

            return true;
        },
    },
};

export const PerEventCustomStyleAndClass: Story = {
    args: {
        plugin: [new MonthlyPlugin()],
    },
};
