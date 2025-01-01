import { Link } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { logout } from "../api/api";

const Navbar = () => {
  const logOut = () => {
    localStorage.removeItem("token");
    logout();
    window.location.href = "/";
  };

  return (
    <div className="w-full py-2 flex items-center justify-between px-3 bg-[#eaecdd] border-b border-gray-500">
      <Link to="/" className="w-fit">
        <h1 className="text-xl font-bold heading w-fit">
          Furry Friends Alliance
        </h1>
      </Link>
      <div className="flex items-center gap-4 ml-auto">
        {" "}
        <Link to="/signin" className="w-fit">
          <button className="text-white font-bold bg-[#324d27] w-fit py-2 px-4 rounded shadow">
            Sign In
          </button>
        </Link>
        {localStorage.getItem("token") ? (
          <button
            className="text-white font-bold bg-[#324d27] w-fit py-2 px-4 rounded shadow"
            onClick={() => logOut()}
          >
            Log Out
          </button>
        ) : (
          <Link to="/signup" className="w-fit">
            <button className="text-white font-bold bg-[#324d27] w-fit py-2 px-4 rounded shadow">
              Sign Up
            </button>
          </Link>
        )}
        <Link to="/dashboard">
          <ImProfile className="text-2xl text-[#324d27]" size={35} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
