import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface TAuthState {
    user: any;
    token: null | string
}

const initialState: TAuthState = {
    token: null,
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log({ state });
            console.log({ action });
        }
    }
});

export const { setUser } = authSlice.actions;

export const useCurrentToken = ((state: RootState) => state.auth.token);
export const useCurrentUser = ((state: RootState) => state.auth.user);