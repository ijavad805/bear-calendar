import React from "react";
import classes from "./style.module.scss";

interface IProps {
    label: string;
}
export const GroupCard: React.FC<IProps> = (props) => {
    return <div className={classes.groupItem}>{props.label}</div>;
};
