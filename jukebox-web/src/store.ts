import { configureStore } from "@reduxjs/toolkit";
import musicPlayerReducer from "./features/musicPlayer/musicPlayerSlice"
import groupSessionReducer from "./features/groupSessions/groupSessionSlice"
import messageBarReducer  from "./features/MessageBar/messageBarSlice";

const store = configureStore({
    reducer: {
        musicPlayer: musicPlayerReducer,
        groupSession: groupSessionReducer,
        messageBar: messageBarReducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>