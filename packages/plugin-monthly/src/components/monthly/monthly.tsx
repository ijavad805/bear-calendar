import React from "react";
import {
    BearCalendarMonthlyViewProps,
    MonthlyView,
    observer,
    useCalendarProps,
    useStore,
} from "@bear-calendar/utility";
import {Body} from "../body";
import classes from "./style/style.module.scss";
import Cell from "./cell";

interface IProps extends Partial<BearCalendarMonthlyViewProps> {}
export const Monthly: React.FC<IProps> = observer((props) => {
    const {current, changeCurrent} = useStore();

    return (
        <Body
            onNext={() => {
                changeCurrent(current.add(1, "month"));
            }}
            onPrev={() => {
                changeCurrent(current.add(-1, "month"));
            }}
            title={
                <div className={classes.title}>
                    {current.format("MMMM")}
                    <div className={classes.year}>{current.format("YYYY")}</div>
                </div>
            }
        >
            <MonthlyView
                current={current.format()}
                renderCell={
                    props.renderCell
                        ? props.renderCell
                        : (props) => <Cell {...props} />
                }
                renderEvent={
                    props.renderEvent
                        ? props.renderEvent
                        : ({event, isHover, isDragging}) => (
                              <div
                                  className={`${classes.eventsItem} ${
                                      isHover ? classes.hover : ""
                                  }`}
                              >
                                  {event.title}
                              </div>
                          )
                }
            />
        </Body>
    );
});
