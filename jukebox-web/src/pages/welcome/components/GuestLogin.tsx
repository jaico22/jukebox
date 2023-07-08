import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MusicPlayerType } from "../../../features/musicPlayer/models/MusicPlayerType";
import { setMusicPlayer } from "../../../features/musicPlayer/musicPlayerSlice";
import { setSessionId as setGroupSessionId } from "../../../features/groupSessions/groupSessionSlice"
import { socket } from "../../../socket";
import styles from "./logincomponents.module.css"
import Input from "../../../components/input";

type Props = {
    successCallback: () => void
}
const GuestLogin = (props: Props) => {
    const [sessionId, setSesstionId] = useState<string>("");
    const dispatch = useDispatch();

    const joinSession = () => {
        // TODO, we'll have to determine a music player at some point
        dispatch(setMusicPlayer(MusicPlayerType.AppleMusic))

        // Tell backend we're joining 
        socket.emit("JoinSession", {
            sessionId: sessionId
        });

        dispatch(setGroupSessionId(sessionId));
        
        props.successCallback();
    }
    return (
        <p className={styles.sessionInputContainer}>
            <Input 
                setValue={(v) => setSesstionId(v)} 
                value={sessionId} placeholder="Session Id..." 
                fontSize="2em"
            />
            <button className={styles.sessionInputConfirm} onClick={joinSession}>Go</button>
        </p>
    )
}

export default GuestLogin