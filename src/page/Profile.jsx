import { useEffect, useState } from "react";
import { profile } from "../api/api";
import Navbar from "../components/Navbar";
import { FaPaw } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { TbBowlFilled } from "react-icons/tb";
import { data } from "autoprefixer";
import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
const Profile = () => {
  const [profileData, setProfileData] = useState();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profile();
        setProfileData(response.data.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    console.log(profileData);
  };

  return (
    <>
      <Navbar />
      <section className="flex gap-3 m-4  overflow-x-scroll cards">
        <div className="py-2 flex px-3 bg-[#eaecdd] border-b flex-col justify-around gap-2 h-[200px] w-fit border-[#324d27] rounded-xl mx-3">
        <Link to="/">
            <FaHome size={25} />
          </Link>
          <Link to="/dashboard">
          <FaPaw size={25} />
          </Link>
          <Link to="/dashboard/profile">
            <CgProfile size={25} />
          </Link>
          <TbBowlFilled size={25} />
        </div>
        <div className="h-[95vh] w-[90vw]  grid place-content-center">
        {profileData && (
          <form
            className="flex flex-col items-center relative justify-center md:min-w-[600px] gap-4 md:border border-[#324d27] p-8 rounded md:shadow-lg md:bg-[#eaecdd]"
            onSubmit={handleSubmit}
          >
            <Link to="/"></Link>
            <h1 className="text-5xl font-bold">Profile</h1>
            <p className="text-sm text-[#324d27]"></p>

            <input
              type="email"
              placeholder="Email"
              onChange={()=>
                toast.error("Changing of email is prohibited ")
              }
              value={profileData.email || ""}
              className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full text-gray-500"
              required
            />
            <input
              type="text"
              placeholder="Name"
              value={profileData.name}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  name: e.target.value,
                })
              }
              className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full"
              required
            />

            <input
              type="number"
              value={profileData.phone}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  phone: e.target.value,
                })
              }
              placeholder="Phone Number"
              className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full"
              required
            />

            <button className="text-white font-bold bg-[#324d27] w-fit py-2 px-4 rounded shadow">
              Edit Profile
            </button>
          </form>
        )}
        </div>
      </section>
    </>
  );
};

export default Profile;
