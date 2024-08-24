import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../API_Request/apiRequest";
import { Button } from "antd";
import { createAxios } from "../../refreshToken/createInstance";
import { loginSuccess } from "../../reducer/authSlice";

const ShowUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.login?.currentUser);
  const msg = useSelector((state: RootState) => state.user?.msg);
  // console.log("MSG: ", msg);
  const [showMsg, setShowMsg] = useState(false);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    // Login if don't Login
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);

  const usersList = useSelector(
    (state: RootState) => state.user?.users?.allUsers
  );
  //   console.log("All Users: ", usersList);

  const handleDeleteUser = (userId: string) => {
    deleteUser(user?.accessToken, dispatch, userId, axiosJWT);
    setShowMsg(true);
    // Gọi lại API để cập nhật danh sách người dùng
    getAllUsers(user?.accessToken, dispatch, axiosJWT);
  };

  // Hide Message after 4s
  useEffect(() => {
    if (showMsg) {
      const timeoutId = setTimeout(() => {
        setShowMsg(false);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [showMsg]);

  return (
    <div className="w-full h-full mt-[5rem] mx-[5rem] ">
      <div>
        <div>
          Your role:
          <span className="text-emerald-500 font-bold">
            {user?.admin ? "Admin" : "User"}
          </span>
        </div>
        {usersList?.map((user: any, index: number) => {
          return (
            <main
              key={user?._id}
              className="flex mb-4 justify-around items-center"
            >
              <div className="flex gap-2">
                <div>{index + 1}. </div>
                <div>{user?.username}</div>
              </div>
              <div>
                <Button
                  type="default"
                  danger
                  ghost
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </Button>
              </div>
            </main>
          );
        })}
      </div>
      {/* <div>{showMsg && msg && <p>{msg}</p>}</div> */}
      <div>{showMsg && <p>{msg}</p>}</div>
    </div>
  );
};

export default ShowUsers;
