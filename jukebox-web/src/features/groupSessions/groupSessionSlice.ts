import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Song } from "../musicPlayer/models/song";

interface GropSessionState {
    isConnected: boolean;
    sessionId?: string;
    readOnlyQueue?: Song[];
    isGuest?: boolean;
    isSessionActive: boolean;
}

const initialState: GropSessionState = {
    isConnected: false,
    isSessionActive: false
}

export const groupSessionSlice = createSlice({
    name: 'groupSession',
    initialState,
    reducers: {
        setSessionId: (state, action: PayloadAction<string>) => {
            state.sessionId = action.payload
            state.isSessionActive = true;
        },
        setIsConnected: (state, action: PayloadAction<boolean>) => {
            state.isConnected = action.payload;
        },
        setQueue: (state, action: PayloadAction<Song[]>) => {
            state.readOnlyQueue = action.payload;
        },
        setIsGuest: (state, action: PayloadAction<boolean>) => {
            state.isGuest = action.payload
        },
        setIsSessionActive: (state, action: PayloadAction<boolean>) => {
            state.isSessionActive = action.payload
        }
    }
})

export const { setSessionId, setIsConnected, setQueue, setIsGuest, setIsSessionActive } = groupSessionSlice.actions;

export default groupSessionSlice.reducer;