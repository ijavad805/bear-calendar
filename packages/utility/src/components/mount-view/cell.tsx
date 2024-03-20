import React from "react";
import {observer, useDateTools, useDayjs} from "../../utility";
import classes from "./style/cell.module.scss";
import {Dayjs} from "dayjs";
import {useStore} from "../../store";

interface IProps {
    date: string;
    disabled?: boolean;
    onClick?: () => void;
    cellIndexInWeek: number;
}
const Cell: React.FC<IProps> = observer((props) => {
    const dayjs = useDayjs();
    const {
        dayStore: {get},
    } = useStore();
    const thisDay = dayjs(props.date);
    const thisDayStore = get(thisDay.calendar("gregory").format());
    const cellClasses = () => {
        const tmp: string[] = [classes.cell];

        if (thisDay.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")) {
            tmp.push(classes.today);
        }
        if (thisDay.format("YYYY-MM-DD") < dayjs().format("YYYY-MM-DD")) {
            tmp.push(classes.past);
        }
        if (props.disabled) {
            tmp.push(classes.disabled);
        }

        return tmp.join(" ");
    };

    return (
        <td className={cellClasses()}>
            <div className={classes.header}>
                <div className={classes.month}>{thisDay.format("MMM")}</div>
                <div className={classes.day}>{thisDay.format("DD")}</div>
            </div>
            <div className={classes.body}>
                {thisDayStore && (
                    <div className={classes.events}>
                        {thisDayStore.events.map((i) => (
                            <div className={classes.event}>{i.title}</div>
                        ))}
                    </div>
                )}
            </div>
        </td>
    );
});

export default Cell;
