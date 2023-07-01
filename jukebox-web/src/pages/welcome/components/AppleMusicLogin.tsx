import React, { useEffect } from "react";
import { useMusicPlayer } from "../../../features/musicPlayer/hooks/useMusicPlayer";
import { useDispatch } from "react-redux";
import { setMusicPlayer } from "../../../features/musicPlayer/musicPlayerSlice";
import { MusicPlayerType } from "../../../features/musicPlayer/models/MusicPlayerType";
import styles from "./logincomponents.module.css"

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

    return <><img onClick={login} className={styles.signInIcon} src="Apple_Music_icon.svg.png" alt="Apply Music Signin"/></>
}

export default AppleMusicLogin