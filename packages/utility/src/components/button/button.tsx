import React, { AllHTMLAttributes } from "react";
import classes from "./style.module.scss";

interface IProps {
    type: keyof typeof buttonTypes;
    children?: React.ReactNode;
}

export const Button: React.FC<IProps> = () => {

}

const buttonTypes = {
    default: [classes.button],
    ghost: [classes.button,classes.ghost],
    link: [classes.button,classes.link],
    text: [classes.button,classes.text],
}