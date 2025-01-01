import { useState, useEffect } from "react";
import { getAllBowls } from "../api/api";
import { FaLocationDot } from "react-icons/fa6";
import { SlRefresh } from "react-icons/sl";
import Navbar from "../components/Navbar";
import { FaFilter } from "react-icons/fa";
import states from "../data/states.json";
import toast from "react-hot-toast";
import { RxCrossCircled } from "react-icons/rx";
const BowlAll = () => {
  const [bowls, setBowls] = useState([]);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(false);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  const [progress, setProgress] = useState(50);

  useEffect(() => {
    getAllBowls()
      .then((response) => {
        setBowls(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleProgressChange = (value) => {
    setProgress(value);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    handleProgressChange(value);
    handleLocation();
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setViewport({
          ...viewport,
          latitude,
          longitude,
        });
        setLocation(true);
        const filteredBowls = bowls.filter((bowl) => {
          const distance = calculateDistance(
            latitude,
            longitude,
            bowl.latitude,
            bowl.longitude
          );
          return distance <= progress;
        });

        setBowls(filteredBowls);
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const filterBowlsByState = (state) => {
    const filteredBowls = bowls.filter((bowl) => {
      const addressParts = bowl.address.split(",");
      return addressParts.some((part) => part.trim() === state);
    });

    return filteredBowls;
  };

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;

    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="w-screen min-h-[93vh] overscroll-y-auto flex md:flex-row flex-col-reverse ">
        <FaFilter
          className="absolute top-16 left-4 text-[#324d27] md:hidden z-40 "
          size={20}
          onClick={() => handleClick()}
        />
        <div
          className={`w-[50%] md:w-[20%] min-h-screen px-6 bg-[#444f40] z-50 fixed top-0 md:relative ${
            open ? "block" : "hidden md:block"
          }`}
        >
          <RxCrossCircled
            className="absolute top-6 right-4 text-[#d3d5be] z-50 md:hidden"
            size={20}
            onClick={() => handleClick()}
          />
          <span className="flex gap-4 text-[#d3d5be] z-40 py-4 w-fit border-b border-[#d3d5be]">
            <h1 className="text-2xl flex italic font-bold">Filter</h1>
            <div className="flex items-center">
              <SlRefresh />
            </div>
          </span>
          <button
            className="w-full bg-[#d3d5be] text-[#444f40] py-2 my-4 rounded-md"
            onClick={() => {
              toast.success("Getting bowls near you!");
              handleLocation();
            }}
          >
            Get bowls near me
          </button>

          <select
            name="state"
            id="state"
            className="w-full bg-[#d3d5be] text-[#444f40] py-2 my-4 rounded-md px-4"
            onChange={(e) => {
              const state = e.target.value;
              const filteredBowls = filterBowlsByState(state);
              setBowls(filteredBowls);
            }}
          >
            <option value="">Select a state</option>
            {states.states.map((state) => (
              <option key={state} value={state}>
                {state.name}
              </option>
            ))}
          </select>
          <div className="flex items-center w-full gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleChange}
              className="w-48 bg-[#d3d5be] text-[#444f40] py-2 my-4 rounded-md accent-[#d3d5be]"
            />
            <span className="text-[#d3d5be] w-16 grid place-content-center">
              {progress} km
            </span>
          </div>
        </div>

        <div className="min-w-[30%]  min-h-screen px-8">
          <span className="flex  items-center gap-4  bg-[#d3d5be] z-40 py-4 mx-4 w-fit border-b border-[#324d27] ">
            <h1 className="text-2xl  flex italic font-bold text-[#324d27] ">
              List of Bowls{" "}
            </h1>
            <div className="flex items-center">
              {" "}
              <SlRefresh />
            </div>
          </span>
          <div className="h-[80vh] overflow-x-hidden overflow-y-scroll ">
            {bowls && bowls.length > 0 ? (
              bowls.map((bowl) => (
                <div
                  key={bowl.id}
                  className="flex p-4 m-4 w-[705] h-fit shadow shadow-[#324d27] flex-wrap text-wrap min-w-[240px] cursor-default hover:shadow-xl"
                  onClick={() => {
                    setViewport({
                      ...viewport,
                      latitude: bowl.latitude,
                      longitude: bowl.longitude,
                    });
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 justify-center items-center ">
                      <span>
                        {" "}
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${bowl.latitude},${bowl.longitude}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaLocationDot size={20} />
                        </a>
                      </span>
                      <span className=" text-wrap">{bowl.address}</span>
                    </div>
                    <div className="flex gap-2 justify-between flex-wrap text-wrap">
                      <div className="flex gap-2">
                        <span className="font-bold">Latitude:</span>
                        <span>{bowl.latitude}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <span className="font-bold">Longitude:</span>
                        <span>{bowl.longitude}</span>
                      </div>
                    </div>
                    {location && <div className="flex gap-2">
                        <span className="font-bold">Distance:</span>
                        <span>{calculateDistance(viewport.latitude,viewport.longitude,bowl.latitude,bowl.longitude)}</span>
                      </div>}

                    <div className="flex gap-2">
                      <span className="font-bold">Capacity:</span>
                      <span>{bowl.capacity}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold">Drinkers:</span>
                      <span>{bowl.drinkers}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-full">
                <h1 className="text-xl">No bowls found</h1>
              </div>
            )}
          </div>
        </div>
        <div className="md:w-[50%] h-[30vh] md:h-[94vh]">
          <iframe
            src={`https://www.google.com/maps?q= ${viewport.latitude}, ${viewport.longitude}&hl=es;z=14&output=embed`}
            className="w-full h-full"
            allowFullScreen=""
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default BowlAll;
