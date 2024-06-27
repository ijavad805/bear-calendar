import React from "react";
import { View } from "../view";
import classes from "./style.module.scss";

interface IOption {
    label: string;
    value: string | number;
}
interface IProps {
    value: string | number;
    options: IOption[];
    onChange: (value: string | number) => void;
}
export const Slider: React.FC<IProps> = ({ value, options, onChange }) => {
    // Find the index of the current value in the options array
    const currentIndex = options.findIndex(option => option.value === value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newIndex = Number(event.target.value);
        onChange(options[newIndex].value);
    };

    return (
        <View>
            <input
                type="range"
                min={0}
                max={options.length - 1}
                value={currentIndex}
                onChange={handleChange}
                step="1"
                title="zoom lvl"
                className={classes.slider}
            />
        </View>
    );
};
