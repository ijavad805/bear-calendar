import React from "react";
import {
    BearCalendarHeaderProps,
    observer,
    useCalendarProps,
} from "@bear-calendar/utility";
import classes from "./style/header.module.scss";

export const Header: React.FC<BearCalendarHeaderProps> = observer((props) => {
    const {extra} = useCalendarProps();

    // if (Components?.header)
    //     return <Components.header extra={extra} {...props} />;

    return (
        <div className={classes.header}>
            <div className={classes.controllers}>
                <div className={classes.controller} onClick={props.onPrev}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M15.7071 18.7071C15.3166 19.0976 14.6834 19.0976 14.2929 18.7071L7.29289 11.7071C6.90237 11.3166 6.90237 10.6834 7.29289 10.2929L14.2929 3.29289C14.6834 2.90237 15.3166 2.90237 15.7071 3.29289C16.0976 3.68342 16.0976 4.31658 15.7071 4.70711L9.41421 11L15.7071 17.2929C16.0976 17.6834 16.0976 18.3166 15.7071 18.7071Z"
                            fill="#000000"
                        />
                    </svg>
                </div>
                <div className={classes.title}>{props.title}</div>
                <div className={classes.controller} onClick={props.onNext}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L14.5858 11L8.29289 4.70711C7.90237 4.31658 7.90237 3.68342 8.29289 3.29289C8.68342 2.90237 9.31658 2.90237 9.70711 3.29289L16.7071 10.2929C17.0976 10.6834 17.0976 11.3166 16.7071 11.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071Z"
                            fill="#000000"
                        />
                    </svg>
                </div>
            </div>
            <div className={classes.extra}>{extra}</div>
        </div>
    );
});
