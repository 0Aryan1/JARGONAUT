import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData : null,
    checked : false // true once the initial session check has finished
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
            state.checked = true;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.checked = true;
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;