import { IEventHandlerProps } from "../eventHandler";
import classes from "./style.module.scss";
import React, { useMemo } from "react";
import {useTranslate} from  "../../../locale";

const ShowMore: React.FC<IEventHandlerProps> = (props) => {
    const countShowMore = useMemo(() => props.events.length - props.maxRenderPerCell,[props.events]);
    const {t} = useTranslate()

    if(countShowMore <= 0) return;
    return (
        <div className={classes.showMore}>
            <div className={classes.button}></div>{t("more",[countShowMore.toString()])}
        </div>
    )
}