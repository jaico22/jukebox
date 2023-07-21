import React from "react";
import styles from "./styles.module.css"
import { RootState } from "../../store";
import { useSelector } from "react-redux";


const MessageBar = () => {
    const messageBarState = useSelector((state: RootState) => state.messageBar);
    return <>{messageBarState.DisplayMessageBar && (<div className={styles.messsageBarContainer}>{messageBarState.Message}</div>)}</>
}

export default MessageBar 