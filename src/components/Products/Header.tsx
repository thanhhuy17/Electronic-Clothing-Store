import { GiShoppingCart } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { logoutUser } from "../../API_Request/apiRequest";
import { createAxios } from "../../refreshToken/createInstance";
import { logoutSuccess } from "../../reducer/authSlice";

const Header = () => {
  const user = useSelector(
    (state: RootState) => state.auth?.login?.currentUser?.username
  );
  const user1 = useSelector(
    (state: RootState) => state.auth?.login?.currentUser
  );
  const admin = useSelector(
    (state: RootState) => state.auth?.login?.currentUser?.admin
  );

  // console.log(user);
  const numberProduct = useSelector(
    (state: RootState) => state.product?.proNumber
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user1, dispatch, logoutSuccess);
  const handleLogout = () => {
    logoutUser(navigate, user1?._id, axiosJWT, dispatch, user1?.accessToken);
  };
  return (
    <div
      className="fixed flex items-center top-0 px-20 text-emerald-400 text-xl font-bold
    w-full h-14 bg-opacity-75 z-40 bg-neutral-700 shadow-md shadow-neutral-300 justify-between"
    >
      <div>
        {user ? (
          <Link to={"/home"}>
            <h2>FakeShop</h2>
          </Link>
        ) : (
          <h2>FakeShop</h2>
        )}
      </div>
      <div className="flex justify-center items-center hover:cursor-pointer">
        <GiShoppingCart size={"2.5rem"} />
        <span className="text-red-600 text-2xl bg-white px-3 rounded-full">
          {numberProduct}
        </span>
      </div>

      <div className="flex gap-3 text-[.9rem]">
        {user ? (
          <div className="flex gap-3">Hi, {user}</div>
        ) : (
          <div className="flex gap-3">
            <Link to={"/register"}>
              <p>Register</p>
            </Link>
            <Link to={"/login"}>
              <p>Login</p>
            </Link>
          </div>
        )}

        {user && admin ? (
          <Link to={"/users"}>
            <button>Users</button>
          </Link>
        ) : (
          ""
        )}

        {user ? (
          // <Link to={"/"} onClick={handleLogout}>
          //   Logout
          // </Link>
          <button onClick={() => handleLogout()}>Logout</button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Header;
