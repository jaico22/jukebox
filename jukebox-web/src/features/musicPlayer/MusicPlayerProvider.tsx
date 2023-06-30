import React, { createContext, useEffect, useState } from "react";
import { MusicPlayerType } from "./models/MusicPlayerType";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { IMusicPlayer } from "./models/IMusicPlayer";
import { useMusicKit } from "./hooks/useMusicKit";

type MusicPlayerProviderProps = {
    children: JSX.Element | JSX.Element[]
}

export const MusicPlayerContext = createContext<IMusicPlayer | undefined>(undefined);

const MusicPlayerProvider = (props: MusicPlayerProviderProps) => {
    const musicKit = useMusicKit();
    const musicPlayerState = useSelector((state: RootState) => state.musicPlayer);
    const [musicPlayer, setMusicPlayer] = useState<IMusicPlayer | undefined>(undefined);
    useEffect(() => {
        if (musicPlayer === undefined)
        {
            switch (musicPlayerState.musicPlayerType) {
                case MusicPlayerType.AppleMusic:
                    setMusicPlayer(musicKit);
                    break;
            }
        }

    }, [musicPlayerState.musicPlayerType, musicKit, musicPlayer])
    return <MusicPlayerContext.Provider value={musicPlayer}>{props.children}</MusicPlayerContext.Provider>
}

export { MusicPlayerProvider }