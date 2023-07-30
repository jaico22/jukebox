import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MusicPlayerType } from "../../../features/musicPlayer/models/MusicPlayerType";
import { setMusicPlayer } from "../../../features/musicPlayer/musicPlayerSlice";
import styles from "./logincomponents.module.css"
import Input from "../../../components/input";
import Button from "../../../components/button";
import { useGroupSession } from "../../../features/groupSessions/hooks/useGroupSession";

type Props = {
    successCallback: () => void
}
const GuestLogin = (props: Props) => {
    const [sessionId, setSesstionId] = useState<string>("");
    const dispatch = useDispatch();
    const groupSession = useGroupSession();

    const joinSession = () => {
        // TODO, we'll have to determine a music player at some point
        dispatch(setMusicPlayer(MusicPlayerType.AppleMusic))

        // Tell backend we're joining 
        groupSession?.joinSession(sessionId);
        
        props.successCallback();
    }
    return (
        <p className={styles.sessionInputContainer}>
            <Input 
                setValue={(v) => setSesstionId(v)} 
                value={sessionId} placeholder="Session Id..." 
                fontSize="2em"
            />
            <Button fontSize="2em" onClick={joinSession} label="Go" />
        </p>
    )
}

export default GuestLogin