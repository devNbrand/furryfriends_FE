import { useState } from "react";
import { verifyotp } from "../api/api";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const VerifyOTP = () => {
  const [data, setData] = useState({
    email: "akangkhasarkar2000@gmail.com",
    otp: 0,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyotp(data)
      .then((response) => {
        toast.success(response.data.message);
        navigate(from);
      })
      .catch((error) => {
        localStorage.removeItem("token");
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  return (
    <div className="w-screen min-h-screen grid place-content-center">
      <form
        className="flex relative flex-col items-center justify-center md:min-w-[600px] gap-4 md:border border-[#324d27] p-8 rounded md:shadow-lg md:bg-[#eaecdd]"
        onSubmit={handleSubmit}
      >
        <Link to="/">
        <FaHome className="text-2xl text-[#324d27] absolute left-4 top-4" />
      </Link>
        <h1 className="text-4xl font-bold">Verify your email</h1>
        <p className="text-center">
          Verify your email to join the Furry Friends Alliance!
        </p>

        <input
          type="number"
          placeholder="OTP"
          className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full"
          onChange={(e) => setData({ ...data, otp: Number(e.target.value) })}
          required
        />

        <button className="text-white font-bold bg-[#324d27] w-fit py-2 px-4 rounded shadow">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
