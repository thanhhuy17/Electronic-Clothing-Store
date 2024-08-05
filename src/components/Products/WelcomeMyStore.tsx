import { Button } from "antd";
import { Link } from "react-router-dom";

const WelcomeMyStore = () => {
  return (
    <div
      className="w-full h-full px-20 mt-[20%]  flex flex-col items-center
   justify-center text-5xl font-bold text-emerald-500 "
    >
      Welcome My Store
      <div className="flex gap-5 my-[5rem]">
        <Link to={"/login"}>
          <Button size="large">Login</Button>
        </Link>
        <Link to={"/register"}>
          <Button size="large">Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeMyStore;
