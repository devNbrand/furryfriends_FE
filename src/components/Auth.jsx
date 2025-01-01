import { signIn, signUp, sendotp } from "../api/api";
import toast from "react-hot-toast";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
const AuthForm = ({ type }) => {

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [data, setData] = useState({
    name: "",
    password: "",
    phone: "",
    email: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "Sign Up") {
      signUp(data)
        .then((response) => {
          toast.success(response.data.message);
          localStorage.setItem("token", response.data.token);
          sendotp(response.data.token)
            .then((response) => {
              toast.success(response.data.message);
            })
            .catch((error) => {
              toast.error(error.response.data.message);
              console.error(error);
            });
          setTimeout(() => {
            e.target.reset();
            window.location.href = "/verifyotp";
          }, 3000);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.error(error);
        });
    }

    if (type === "Sign In") {
      signIn(data)
        .then((response) => {
          toast.success(response.data.message);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("validUser", "true");
          e.target.reset();
          setTimeout(() => {
            window.location.href = from;
          }, 2000);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.error(error);
        });
    }
  };
  return (
    <form
      className="flex flex-col items-center relative justify-center md:min-w-[600px] gap-4 md:border border-[#324d27] p-8 rounded md:shadow-lg md:bg-[#eaecdd]"
      onSubmit={handleSubmit}
    >
      <Link to="/">
        <FaHome className="text-2xl text-[#324d27] absolute left-4 top-4" />
      </Link>
      <h1 className="text-5xl font-bold">{type}</h1>
      <p className="text-sm text-[#324d27]">
        {type === "Sign Up"
          ? "Create an account to get started"
          : "Sign in to your account to get started"}
      </p>
      {type == "Sign Up" ? (
        <input
          type="text"
          placeholder="Name"
          className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full"
          onChange={(e) => setData({ ...data, name: e.target.value })}
          required
        />
      ) : (
        ""
      )}
      <input
        type="email"
        placeholder="Email"
        className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full"
        onChange={(e) => setData({ ...data, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full"
        onChange={(e) => setData({ ...data, password: e.target.value })}
        required
      />
      {type == "Sign Up" ? (
        <input
          type="text"
          placeholder="Phone Number"
          className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full"
          onChange={(e) => setData({ ...data, phone: e.target.value })}
          required
        />
      ) : (
        ""
      )}
      <button className="text-white font-bold bg-[#324d27] w-fit py-2 px-4 rounded shadow">
        {type}
      </button>

      <div>
        {type == "Sign Up" ? (
          <p className="text-[#324d27] italic">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-[#324d27] font-bold hover:text-[#5fa541]"
            >
              Sign In
            </Link>
          </p>
        ) : (
          <p className="text-[#324d27] italic">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#324d27] font-bold hover:text-[#5fa541]"
            >
              Sign Up
            </Link>
          </p>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
