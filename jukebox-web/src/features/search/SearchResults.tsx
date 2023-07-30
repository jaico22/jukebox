import React, { useRef } from "react";
import styles from "./search.module.css"
import { SearchResult } from "./models/SearchResult";
import { useMusicPlayer } from "../musicPlayer/hooks/useMusicPlayer";
import { useOutsideClickHandler } from "../../hooks/useOutsideClickHandler";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useGroupSession } from "../groupSessions/hooks/useGroupSession";
import { Song } from "../musicPlayer/models/song";

type SearchModalProps = {
    results: SearchResult[],
    onClose: () => void;
}

const SearchResults = (props: SearchModalProps) => {
    const musicPlayer = useMusicPlayer();
    const groupSession = useGroupSession();
    const wrapperRef = useRef(null);
    const groupSessionState = useSelector((state: RootState) => state.groupSession);

    useOutsideClickHandler(wrapperRef, () => {
        if (props.results.length > 0)
        {
            props.onClose();
        }
    });

    const playNext = (song: Song) => {
        if (groupSessionState.isGuest) {
            groupSession?.addNextSong(groupSessionState.sessionId ?? "" ,song);
            return;
        }
        musicPlayer?.playNext(song.id)
    }

    const playLast = (song: Song) => {
        if (groupSessionState.isGuest) {
            // TODO: The thing
            return;
        }
        musicPlayer?.playLast(song.id)
    }

    return (<div className={styles.searchResultsContainer} ref={wrapperRef}>
        {props.results.length > 0 &&
            (<div className={styles.searchResults} id='search-results'>
            {props.results.map((result, index) => (
                <div className={styles.searchResult} key={index}>
                    <b>{result.song.name} - {result.song.artist}</b>
                    <div className={styles.searchResultControls}>
                        <button className={styles.button} onClick={() => playNext(result.song)}>Play Next</button>
                        <button className={styles.button} onClick={() => playLast(result.song)}>Play Last</button>
                    </div>
                </div>
            ))}
        </div>)}
    </div>)
}

export { SearchResults }