
import { loginFailed, loginStart, loginSuccess } from "../reducer/authSlice"
import { API_Authenticated } from "../main"

// type TypeLogin = {
//     user: string
//     dispatch: string
//     navigate: string
// }

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await API_Authenticated.post("/v2/auth/login", user)
        dispatch(loginSuccess(res.data))
        navigate("/home")
    } catch (err) {
        dispatch(loginFailed())
    }
}