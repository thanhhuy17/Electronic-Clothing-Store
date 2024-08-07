import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: {
        allUsers: [],
        isFetching: false,
        error: false,
    },
    msg: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // GET ALL USER
        getUsersStart: (state) => {
            state.users.isFetching = true;
        },
        getUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
        },
        getUsersFalse: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        // DELETE USER
        deleteUserStart: (state) => {
            state.users.isFetching = true;
        },
        deleteUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.msg = action.payload;
        },
        deleteUserFalse: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        },
    }
})

export const {getUsersStart, getUsersSuccess, getUsersFalse, deleteUserStart, deleteUserSuccess, deleteUserFalse} = userSlice.actions
const userSliceH = userSlice.reducer
export default userSliceH