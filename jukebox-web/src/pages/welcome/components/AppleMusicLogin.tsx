import React, { useEffect } from "react";
import { useMusicPlayer } from "../../../features/musicPlayer/hooks/useMusicPlayer";
import { useDispatch } from "react-redux";
import { setMusicPlayer } from "../../../features/musicPlayer/musicPlayerSlice";
import { MusicPlayerType } from "../../../features/musicPlayer/models/MusicPlayerType";

type AppleMusicLoginProps = {
    successCallback: () => void
}

const AppleMusicLogin = (props: AppleMusicLoginProps) => {
    const musicPlayer = useMusicPlayer();
    const dispatch = useDispatch();

    const login = () => {
        dispatch(setMusicPlayer(MusicPlayerType.AppleMusic))
    }

    useEffect(() => {
        musicPlayer?.authorize().then(() => {
            props.successCallback();
        })
    }, [musicPlayer, props])

    return <><button onClick={login}>Login to Apple Music</button></>
}

export default AppleMusicLogin