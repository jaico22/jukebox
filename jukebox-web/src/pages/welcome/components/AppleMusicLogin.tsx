import React, { useEffect, useState } from "react";
import { useMusicPlayer } from "../../../features/musicPlayer/hooks/useMusicPlayer";
import { useDispatch } from "react-redux";
import { setMusicPlayer } from "../../../features/musicPlayer/musicPlayerSlice";
import { MusicPlayerType } from "../../../features/musicPlayer/models/MusicPlayerType";
import styles from "./logincomponents.module.css"
import { setDisplayMessageBar, setMessage } from "../../../features/MessageBar/messageBarSlice";

type AppleMusicLoginProps = {
    successCallback: () => void
}

const AppleMusicLogin = (props: AppleMusicLoginProps) => {
    const [loginRequested, setLoginRequested] = useState(false);
    const musicPlayer = useMusicPlayer();
    const dispatch = useDispatch();

    const login = () => {
        dispatch(setMusicPlayer(MusicPlayerType.AppleMusic))
        dispatch(setMessage("🔔 Heads up: You'll need popups enabled to login with Apple Music"))
        dispatch(setDisplayMessageBar(true))
        setLoginRequested(true);
    }

    useEffect(() => {
        if (loginRequested && musicPlayer) {
            musicPlayer.authorize().then(() => {
                dispatch(setDisplayMessageBar(false))
                props.successCallback();
            })
        }
    }, [musicPlayer, props, loginRequested])

    return <><img onClick={login} className={styles.signInIcon} src="Apple_Music_icon.svg.png" alt="Apply Music Signin"/></>
}

export default AppleMusicLogin