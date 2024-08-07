import { createSlice } from "@reduxjs/toolkit";

export type TypeCurrentUser = {
    id: string,
    username: string,
    email: string,
    admin: boolean
}

type TypeAuth = {
    login: {
        currentUser: TypeCurrentUser | null,
        isFetching: boolean,
        error: boolean,
    },
    register: {
        isFetching: boolean,
        error: boolean,
        success: boolean,
    },
    logout: {
        isFetching: boolean,
        error: boolean,
    },
}

const initialState: TypeAuth = {
    login: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    register: {
        isFetching: false,
        error: false,
        success: false,
    },
    logout: {
        isFetching: false,
        error: false,
    },
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // LOGIN
        loginStart: (state) => {
            state.login.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false
            state.login.currentUser = action.payload
            state.login.error = false
        },
        loginFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        },

        //REGISTER
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            // state.register.currentUser = action.payload;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },

        //LOGOUT
        logoutStart: (state) => {
            state.logout.isFetching = true;
        },
        logoutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
        },
        logoutFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
    }
})

export const {
    loginStart, loginSuccess, loginFailed,
    registerStart, registerSuccess, registerFailed,
    logoutStart, logoutSuccess, logoutFailed } = authSlice.actions
const authSliceH = authSlice.reducer
export default authSliceH