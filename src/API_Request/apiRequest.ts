
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from "../reducer/authSlice"
import { API_Authenticated } from "../main"
import { deleteUserFalse, deleteUserStart, deleteUserSuccess, getUsersFalse, getUsersStart, getUsersSuccess } from "../reducer/userSlice"

// type TypeRequest = {
//     user: any
//     dispatch: any
//     navigate: any
// }

// API LOGIN
export const loginUser = async (user: any, dispatch: any, navigate: any) => {
    dispatch(loginStart())
    try {
        const res = await API_Authenticated.post("/v2/auth/login", user)
        dispatch(loginSuccess(res.data))
        // localStorage.setItem("refreshToken", JSON.stringify(res.data.refreshToken))
        // document.cookie = `refreshToken=${res.data.refreshToken}; max-age=3600`;
        navigate("/home")
    } catch (err) {
        dispatch(loginFailed())
    }
}

// API REGISTER USER
export const registerUser = async (user: any, dispatch: any, navigate: any) => {
    dispatch(registerStart())
    try {
        await API_Authenticated.post("/v2/auth/register", user)
        dispatch(registerSuccess())
        navigate("/login")
    } catch (err) {
        dispatch(registerFailed())
    }
}

// GET ALL USERS
// export const getAllUsers = async (accessToken: any, dispatch: any, axiosJWT: any) => {
//     dispatch(getUsersStart())
//     try {
//         const res = await axiosJWT.get("/v2/user", { headers: { token: `Bearer ${accessToken}` } })
//         dispatch(getUsersSuccess(res.data))
//     } catch (err) {
//         dispatch(getUsersFalse())
//     }
// }

export const getAllUsers = async (accessToken: any, dispatch: any, axiosJWT: any) => {
    dispatch(getUsersStart())
    try {
        const res = await axiosJWT.get("/v2/user", { headers: { token: `Bearer ${accessToken}` } })
        dispatch(getUsersSuccess(res.data))
    } catch (err) {
        dispatch(getUsersFalse())
    }
}

//DELETE USER
export const deleteUser = async (accessToken: any, dispatch: any, userId: any, axiosJWT: any) => {
    dispatch(deleteUserStart())
    try {
        const res = await axiosJWT.delete("/v2/user/" + userId, {
            headers: { token: `Bearer ${accessToken}` }
        })
        dispatch(deleteUserSuccess(res.data))
    } catch (err: any) {
        dispatch(deleteUserFalse(err.response.data))
    }
}

//LOGOUT
export const logoutUser = async (
    navigate: any,
    id: any,
    axiosJWT: any,
    dispatch: any,
    accessToken: any
) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post("/v2/auth/logout", id, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(logoutSuccess());
        navigate("/");
    } catch (err: any) {
        dispatch(logoutFailed(err.response.data));
    }
};