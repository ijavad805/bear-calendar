import React, {MouseEventHandler} from "react";
import classes from "./style.module.scss";

interface IProps {
    type?: keyof typeof buttonTypes;
    size?: keyof typeof buttonSizes;
    children?: React.ReactNode;
    className?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    testId?: string;
}

export const Button: React.FC<IProps> = ({
    type = "default",
    size = "md",
    ...props
}) => {
    return (
        <div
            className={`${buttonTypes[type].join(" ")} ${props.className} ${
                buttonSizes[size]
            }`}
            onClick={props.onClick}
            data-test-id={props.testId}
        >
            {props.children}
        </div>
    );
};

const buttonTypes = {
    default: [classes.button],
    ghost: [classes.button, classes.ghost],
    link: [classes.button, classes.link],
    text: [classes.button, classes.text],
};

const buttonSizes = {
    sm: classes.sm,
    md: classes.md,
    lg: classes.lg,
};
