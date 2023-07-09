import React from "react"
import { useMusicPlayer } from "./hooks/useMusicPlayer";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useGroupSession } from "../groupSessions/hooks/useGroupSession";
import styles from "./musicPlayer.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCaretLeft, faCirclePlay, faSquareCaretRight, faCirclePause } from '@fortawesome/free-solid-svg-icons'
import SessionController from "../sessionController/SessionController";
  
const MusicPlayer = () => {
    const musicPlayerState = useSelector((state: RootState) => state.musicPlayer);

    const musicPlayer = useMusicPlayer();
    const groupSession = useGroupSession();

    const playMusic = () => {
        musicPlayer?.play();
    }

    const pause = () => {
        musicPlayer?.pause();
    }

    const skip = () => {
        musicPlayer?.skip();
    }

    const previous = () => {
        musicPlayer?.previous();
    }
    
    const nowplayingItem = musicPlayerState.nowPlaying ?? musicPlayerState.queue?.at(0);

    const albumCoverUrl = nowplayingItem?.albumCoverUrl?.replace('{w}', '600')?.replace('{h}', '600');


    return (<div className={styles.container}>
        <div className={styles.albumImgContianer}>
            <img src={albumCoverUrl} className={styles.albumImg} />
            <img src={albumCoverUrl} className={styles.albumImgUnderlay} />
        </div>
        <span className={styles.songName}>{nowplayingItem?.name ?? "None"}</span>
        <div className={styles.controls}>
            <FontAwesomeIcon icon={faSquareCaretLeft} onClick={previous} className={styles.control} />
            {!musicPlayerState.isPlaying && (<FontAwesomeIcon icon={faCirclePlay} onClick={playMusic} className={styles.control} />)}
            {musicPlayerState.isPlaying && (<FontAwesomeIcon icon={faCirclePause} onClick={pause} className={styles.control} />)}
            <FontAwesomeIcon icon={faSquareCaretRight} onClick={skip} className={styles.control} />
            <SessionController className={styles.control}/>
        </div>

        <i>Group Session Id: {(groupSession?.groupSessionId)}</i>
    </div>)
}

export default MusicPlayer;