import { useState } from "react";
// import { registerUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegisor = (event) => {
    event.preventDefault();
    const newUser = {
      email: email,
      password: password,
      username: username,
    };
    registerUser(newUser, dispatch, navigate);
  };
  return (
    <section className="mt-[6rem] flex flex-col items-center justify-center w-full">
      <div className="text-emerald-500 text-xl"> Sign up </div>
      <form onSubmit={handleRegisor} className="flex flex-col gap-5 w-[350px]">
        <label>EMAIL</label>
        <input
          className="pl-2 py-1 rounded-md"
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
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
          className="bg-emerald-500 mt-4 py-1 hover:bg-emerald-700 transition"
        >
          Create account
        </button>
      </form>
    </section>
  );
};

export default Register;
