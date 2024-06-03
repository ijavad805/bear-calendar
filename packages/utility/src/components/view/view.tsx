import React from "react";
import classes from "./style.module.scss";
import {joinClass} from "../../utility";

interface IProps {
    center?: boolean;
    horizontal?: boolean;
    spaceBetween?: boolean;
    className?: string;
    space?: keyof typeof $spaces;
    onClick?: () => void;
    children?: React.ReactNode;
    id?: string;
    style?: React.CSSProperties;
}

export const View: React.FC<IProps> = (props) => {
    return (
        <div
            className={joinClass(
                classes.view,
                [props.center, classes.center],
                [props.spaceBetween, classes.spaceBetween],
                [props.horizontal, classes.horizontal],
                [
                    props.space !== undefined,
                    props.space ? $spaces[props.space] : "",
                ],
                [props.onClick !== undefined, classes.clickable],
                props.className
            )}
            id={props.id}
            style={props.style}
        >
            {props.children}
        </div>
    );
};

const $spaces = {
    tiny: classes.tiny,
    small: classes.small,
    medium: classes.medium,
    large: classes.large,
};
