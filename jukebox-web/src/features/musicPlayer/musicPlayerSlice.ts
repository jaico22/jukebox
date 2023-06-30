import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "./models/song";
import { MusicPlayerType } from "./models/MusicPlayerType";

interface MusicPlayerState {
    isReady: boolean,
    nowPlaying?: Song,
    queue?: Song[],
    musicPlayerType?: MusicPlayerType
    isPlaying?: boolean;
}

const initialState: MusicPlayerState = {
    isReady: false,
}

export const musicPlayerSlice = createSlice({
    name: 'musicPlayer',
    initialState,
    reducers: {
        setIsReady: (state, action: PayloadAction<boolean>) => {
            state.isReady = action.payload;
        },
        setCurrentSong: (state, action: PayloadAction<Song>) => {
            state.nowPlaying = action.payload
        },
        setQueue: (state, action: PayloadAction<Song[]>) => {
            state.queue = action.payload;
        },
        addToQueue: (state, action: PayloadAction<Song>) => {
            if (!state.queue)
                state.queue = [action.payload];
            else
                state.queue?.push(action.payload)
        },
        setMusicPlayer: (state, action: PayloadAction<MusicPlayerType>) => {
            state.musicPlayerType = action.payload
        },
        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload
        }
    }
})

export const { setIsReady, setCurrentSong, addToQueue, setQueue, setMusicPlayer, setIsPlaying } = musicPlayerSlice.actions;


export default musicPlayerSlice.reducer;