import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../API_Request/apiRequest";
// import { loginUser } from "../../redux/apiRequest";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
  };
  return (
    <section className="mt-[6rem] flex flex-col items-center justify-center w-full">
      <div className="text-emerald-500 text-xl"> Log in</div>
      <form onSubmit={handleLogin} className="flex flex-col gap-5 w-[350px]">
        <label>USERNAME</label>
        <input
          className="pl-2 py-1 rounded-md"
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>PASSWORD</label>
        <input
          className="pl-2 py-1 rounded-md"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="mb-4 bg-emerald-500 mt-4 py-1 hover:bg-emerald-700 transition"
        >
          Continue
        </button>
      </form>
      <div className=""> Don't have an account yet? </div>
      <Link className="" to="/register">
        Register one for free
      </Link>
    </section>
  );
};

export default Login;
