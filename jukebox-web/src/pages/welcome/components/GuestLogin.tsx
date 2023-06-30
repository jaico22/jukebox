import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MusicPlayerType } from "../../../features/musicPlayer/models/MusicPlayerType";
import { setMusicPlayer } from "../../../features/musicPlayer/musicPlayerSlice";
import { setSessionId as setGroupSessionId } from "../../../features/groupSessions/groupSessionSlice"
import { socket } from "../../../socket";

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
        <p>
            Enter Session Id: <input value={sessionId} onChange={(event) => setSesstionId(event.target.value)} placeholder="Session Id"></input>
            <button onClick={joinSession}>Lets Jam</button>
        </p>
    )
}

export default GuestLogin