import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,      // firebase user object
    role: null,      // admin / branch / user
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user || null;
            state.role = action.payload.role || null;
            state.isLoggedIn = !!action.payload.user;
        },
        logout: (state) => {
            state.user = null;
            state.role = null;
            state.isLoggedIn = false;
        },
    },
});

export const {setUser, logout} = authSlice.actions;
export default authSlice.reducer;