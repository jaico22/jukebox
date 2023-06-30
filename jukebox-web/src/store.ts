import { configureStore } from "@reduxjs/toolkit";
import musicPlayerReducer from "./features/musicPlayer/musicPlayerSlice"
import groupSessionReducer from "./features/groupSessions/groupSessionSlice"

const store = configureStore({
    reducer: {
        musicPlayer: musicPlayerReducer,
        groupSession: groupSessionReducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>