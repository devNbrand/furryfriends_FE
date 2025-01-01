import { Link } from "react-router-dom";
import { MdOutlinePets } from "react-icons/md";
import { LiaPawSolid } from "react-icons/lia";
import { useState } from "react";
const BowlType = () => {
  const [type, setType] = useState(null);

  return (
    <div className=" min-h-screen flex flex-col justify-center items-center gap-6">
      <h1 className="heading text-3xl text-[#324d27]">
        Bowl Created for :{" "}
        {type ? type.split("/").pop() : "please select one first"}
      </h1>
      <section className=" flex flex-col md:flex-row px-12 py-8 gap-12 md:h-[60vh] border border-[#324d27] rounded-3xl w-fit text-[#324d27] items-center justify-around  text-center md:text-left ">
        <div className="flex gap-4 flex-col items-center justify-center">
          <MdOutlinePets className="text-6xl" />
          <h1 className="heading text-xl">Register Stray Animals</h1>
          <select
            defaultValue=""
            onChange={(e) => setType(e.target.value)}
            className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-[300px]"
          >
            <option value="" disabled>
              Type of stray Animal
            </option>
            <option value="stray/cats">Cats</option>
            <option value="stray/dogs">Dogs</option>
            <option value="stray/rabbits">Rabbits</option>
            <option value="stray/birds">Birds</option>
            <option value="stray/cattle">Cattle</option>
            <option value="stray/horse">Horses</option>
            <option value="stray/goats">Goats</option>
            <option value="stray/pigs">Pigs</option>
            <option value="stray/others">Others</option>
          </select>
          {type === "stray/birds" && (
            <select
              defaultValue=""
              onChange={(e) => setType(e.target.value)}
              className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full mb-2"
            >
              <option value="" disabled>
                Type of Bird
              </option>
              <option value="stray/ducks">Ducks</option>
              <option value="stray/owls">Owls</option>
              <option value="stray/others">Others</option>
            </select>
          )}
          {type === "stray/cattle" && (
            <select
              defaultValue=""
              onChange={(e) => setType(e.target.value)}
              className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full mb-2"
            >
              <option value="" disabled>
                Type of Cattle
              </option>
              <option value="stray/cows">Cows</option>
              <option value="stray/bulls">Bulls</option>
              <option value="stray/others">Others</option>
            </select>
          )}
          <Link
            to={`/register/${type}`}
            style={{ pointerEvents: type ? "auto" : "none" }}
          >
            <button
              className={`text-white font-bold bg-[#324d27] w-fit py-2 px-4 rounded shadow ${
                type ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              }`}
              disabled={!type}
            >
              Register
            </button>
          </Link>
        </div>
        <div className="flex gap-4 flex-col items-center justify-center">
          <LiaPawSolid className="text-7xl" />
          <h1 className="heading text-xl">Register Pets</h1>
          <select
            defaultValue=""
            onChange={(e) => setType(e.target.value)}
            className="border border-[#324d27] p-2 rounded bg-[#eaecdd]  w-[300px]"
          >
            <option value="" disabled>
              Type of Pet
            </option>
            <option value="pet/cats">Cats</option>
            <option value="pet/dogs">Dogs</option>
            <option value="pet/rabbits">Rabbits</option>
            <option value="pet/birds">Birds</option>
            <option value="pet/cattle">Cattle</option>
            <option value="pet/horse">Horses</option>
            <option value="pet/goats">Goats</option>
            <option value="pet/pigs">Pigs</option>
            <option value="pet/others">Others</option>
          </select>
          {type === "pet/birds" && (
            <select
              defaultValue=""
              onChange={(e) => setType(e.target.value)}
              className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full mb-2"
            >
              <option value="" disabled>
                Type of Bird
              </option>
              <option value="pet/ducks">Ducks</option>
              <option value="pet/owls">Owls</option>
              <option value="pet/others">Others</option>
            </select>
          )}
          {type === "pet/cattle" && (
            <select
              defaultValue=""
              onChange={(e) => setType(e.target.value)}
              className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full mb-2"
            >
              <option value="" disabled>
                Type of Cattle
              </option>
              <option value="pet/cows">Cows</option>
              <option value="pet/bulls">Bulls</option>
              <option value="pet/others">Others</option>
            </select>
          )}
            <Link
            to={`/register/${type}`}
            style={{ pointerEvents: type ? "auto" : "none" }}
          >
            <button
              className={`text-white font-bold bg-[#324d27] w-fit py-2 px-4 rounded shadow ${
                type ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              }`}
              disabled={!type}
            >
              Register
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BowlType;
