import {BearCalendar} from "@bear-calendar/core";
import MonthlyPlugin from "@bear-calendar/plugin-monthly";
import type {Meta, StoryObj} from "@storybook/react";

import React from "react";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof BearCalendar> = {
    title: "Monthly Calendar",
    component: BearCalendar,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        fullscreen: true,
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {},
    render(props) {
        return (
            <BearCalendar
                plugin={[new MonthlyPlugin()]}
                view={"Monthly"}
                config={{locale: "en"}}
                events={[
                    {
                        id: 1,
                        title: "test 1",
                        date: {
                            start: "2024-03-10",
                            end: "2024-03-15",
                        },
                    },
                    {
                        id: 2,
                        title: "test 2",
                        date: {
                            start: "2024-03-12",
                            end: "2024-03-27",
                        },
                    },
                    {
                        id: 3,
                        title: "test 3",
                        date: {
                            start: "2024-03-14",
                            end: "2024-03-15",
                        },
                    },
                    {
                        id: 4,
                        title: "test 4",
                        date: {
                            start: "2024-03-15",
                            end: "2024-03-17",
                        },
                    },
                ]}
            />
        );
    },
};

export default meta;

type Story = StoryObj<typeof BearCalendar>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {},
};
