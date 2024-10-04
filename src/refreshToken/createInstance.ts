import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_Authenticated } from "../main";

// Refresh Token
const refreshToken = async () => {
    try {
        const res = await API_Authenticated.post("/v2/auth/refresh", {}, {
            withCredentials: true, // add cookie
        });
        return res.data;
    } catch (error) {
        console.log("Lỗi refresh token:", error);
    }
};

export const createAxios = (user: any, dispatch: any, stateSuccess: any) => {
    const newInstance = axios.create({
        baseURL: "http://127.0.0.1:8000",

        withCredentials: true, // Để axios gửi và nhận cookies

    });

    newInstance.interceptors.request.use(
        async (config) => {
            //   const user = useSelector((state) => state?.auth?.login?.currentUser);
            //   const dispatch = useDispatch();

            const date = new Date();
            const decodedToken: any = jwtDecode(user?.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                };
                dispatch(stateSuccess(refreshUser));
                // config.headers["Authorization"] = "Bearer " + data.accessToken;
                config.headers["token"] = "Bearer " + data.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    return newInstance;
};
