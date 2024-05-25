import React from "react";
import classes from "./style.module.scss";

interface IProps {
    start: Date;
    end: Date;
    step: string;
    format: string;
}
const Times = () => {
    return <div className={classes.times}></div>;
};
