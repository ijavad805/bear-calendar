import React from "react";
import {useDayjs} from "../../utility";
import classes from "./style/cell.module.scss";

interface IProps {
    date: string;
    disabled?: boolean;
    onClick?: () => void;
    cellIndexInWeek: number;
}
export const Cell: React.FC<IProps> = (props) => {
    const dayjs = useDayjs();
    return <td className={classes.cell}>{dayjs(props.date).format("DD")}</td>;
};
