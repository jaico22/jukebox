import React, { useEffect } from "react";
import MusicPlayer from "../../features/musicPlayer/MusicPlayer";
import MusicQueue from "../../features/musicQueue/MusicQueue";
import { useNavigate } from "react-router-dom";
import { useMusicPlayer } from "../../features/musicPlayer/hooks/useMusicPlayer";
import routes from "../routes";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Search } from "../../features/search/Search";
import styles from './player.module.css'

const Player = () => {
    const navigate = useNavigate();
    const musicPlayer = useMusicPlayer();
    const musicPlayerState = useSelector((state: RootState) => state.musicPlayer);

    // If user has not selected a music player, take them back to the main page
    useEffect(() => {
        if (!musicPlayer) {
            navigate(routes.welcome)
        }
    }, [musicPlayer, navigate])

    // If no songs are in queue, initalize the queue
    useEffect(() => {
        const queue = musicPlayerState.queue ?? [];
        if (queue.length === 0 && musicPlayerState.isReady) {
            musicPlayer?.initializeQueue();
        }
    }, [musicPlayerState.queue, musicPlayer, musicPlayerState.isReady])

    
    return <div>
        <Search />
        <div className={styles.content}>
            <MusicPlayer />
            <div className={styles.queueContainer}>
                <MusicQueue QueueItems={musicPlayerState.queue ?? []} />
            </div>
        </div>  
    </div>
}

export default Player;