import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MessageBarState {
    Message?: string | undefined;
    DisplayMessageBar: boolean;
}

const initialState : MessageBarState = {
    DisplayMessageBar: false
}

export const messageBarSlice = createSlice({
    name: 'messageBar',
    initialState,
    reducers: {
        setDisplayMessageBar: (state, action: PayloadAction<boolean>) => {
            state.DisplayMessageBar = action.payload
        },
        setMessage: (state, action: PayloadAction<string>) => {
            state.Message = action.payload
        }
    }
})

export const { setDisplayMessageBar, setMessage } = messageBarSlice.actions;
export default messageBarSlice.reducer;