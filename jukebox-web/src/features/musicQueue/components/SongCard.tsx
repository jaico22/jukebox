import React from "react";
import { Song } from "../../musicPlayer/models/song";
import styles from './SongCard.module.css'

type SongCardProps = {
    Song : Song
}

const SongCard = (props: SongCardProps) => {
    return <div className={styles.cardContainer}>
        <div><b>{props.Song.name}</b></div>
        <div>-</div>
        <div><i>{props.Song.artist}</i></div>
    </div>
}

export default SongCard