import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../API_Request/apiRequest";
import { Button } from "antd";

const ShowUsers = () => {
  // const axiosJWT = createAxios(user, dispatch, loginSuccess);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.login?.currentUser);
  const msg = useSelector((state: RootState) => state.user?.msg);
  console.log("MSG: ", msg);
  const [showMsg, setShowMsg] = useState(true);

  useEffect(() => {
    // Login if don't Login
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch);
    }
  }, []);

  const usersList = useSelector(
    (state: RootState) => state.user?.users?.allUsers
  );
  //   console.log("All Users: ", usersList);

  const handleDeleteUser = (userId: string) => {
    deleteUser(user?.accessToken, dispatch, userId);
  };

  // Hide Message after 4s
  useEffect(() => {
    if (msg) {
      const timeoutId = setTimeout(() => {
        setShowMsg(false);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [msg]);

  return (
    <div className="w-full h-full mt-[5rem] mx-[5rem] ">
      <div>
        {usersList?.map((user: any, index: number) => {
          return (
            <div className="flex mb-4 justify-around items-center">
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
            </div>
          );
        })}
      </div>
      <div>{showMsg && msg && <p>{msg}</p>}</div>
    </div>
  );
};

export default ShowUsers;
