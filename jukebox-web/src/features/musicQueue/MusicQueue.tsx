import React from "react";
import SongCard from "./components/SongCard";
import styles from './MusicQueue.module.css'
import { Song } from "../musicPlayer/models/song";

type Props = {
    QueueItems: Song[]
}

const MusicQueue = (props: Props) => {
    return <div className={styles.queueContainer}>
            <h1>Up Next...</h1>
            {props.QueueItems?.map((song, idx) => {
                if (idx > 0) {
                    return (<SongCard Song={song} key={song.id} />)
                }
            })}
        </div>
}

export default MusicQueue