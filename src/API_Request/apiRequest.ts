
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from "../reducer/authSlice"
import { API_Authenticated } from "../main"
import { getUsersFalse, getUsersStart, getUsersSuccess } from "../reducer/userSlice"

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
export const getAllUsers = async (accessToken: any, dispatch: any, axiosJWT: any) => {
    dispatch(getUsersStart())
    try {
        const res = await axiosJWT.get("/v2/user", { headers: { token: `Bearer ${accessToken}` } })
        dispatch(getUsersSuccess(res.data))
    } catch (err) {
        dispatch(getUsersFalse())
    }
}