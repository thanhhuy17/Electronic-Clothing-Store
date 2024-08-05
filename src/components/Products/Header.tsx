import { GiShoppingCart } from "react-icons/gi";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      className="fixed flex items-center top-0 px-20 text-emerald-400 text-xl font-bold
    w-full h-14 bg-opacity-75 z-40 bg-neutral-700 shadow-md shadow-neutral-300 justify-between"
    >
      <div>
        <h2>FakeShop</h2>

        {/* <Link to={"/"}>
          <h2>FakeShop</h2>
        </Link> */}
      </div>
      <div className="flex justify-center items-center hover:cursor-pointer">
        <GiShoppingCart size={"2.5rem"} />
        <span className="text-red-600 text-2xl bg-white px-3 rounded-full">
          {/* {numberProduct} */}
        </span>
      </div>
      <div className="flex gap-3">
        <button>Register</button>
        <button>Login</button>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Header;
