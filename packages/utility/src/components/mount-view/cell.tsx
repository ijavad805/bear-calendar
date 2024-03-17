import React from "react";
import {useDayjs} from "../../utility";
import classes from "./style/cell.module.scss";

interface IProps {
    date: string;
    disabled?: boolean;
    onClick?: () => void;
    cellIndexInWeek: number;
}
const Cell: React.FC<IProps> = (props) => {
    const dayjs = useDayjs();
    return <td className={classes.cell}>{dayjs(props.date).format("DD")}</td>;
};


export default Cell;