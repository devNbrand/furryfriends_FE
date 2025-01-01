import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBowl, markBowlEmpty, markBowlRefilled } from "../api/api";
import { IoLocationOutline } from "react-icons/io5";
import { SlRefresh } from "react-icons/sl";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
const BowlDetails = () => {
  const { id } = useParams();
  const [googleMapsUrl, setGoogleMapsUrl] = useState(null);
 
  const [bowl, setBowl] = useState(null);
  useEffect(() => {
    getBowl(id)
      .then((response) => {
        setBowl(response.data.data);
        setGoogleMapsUrl(
          `https://www.google.com/maps/search/?api=1&query=${response.data.data.latitude},${response.data.data.longitude}`
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const markEmpty = () => {
    markBowlEmpty(id)
      .then((response) => {
      
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const markRefilled = () => {
    markBowlRefilled(id)
      .then((response) => {
       
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  console.log(bowl);

  return (
    <>
    <Navbar/>
    <div className="w-screen min-h-[90vh] flex justify-center items-center">
      {bowl && (
        <div className="p-8 font-sans md:min-w-[70vw]">
          {/* <h1 className="text-center text-2xl font-bold text-[#324d27]  mb-6">
            Bowl Details
          </h1> */}
          <div className="border rounded-lg p-4 bg-[#eaecdd] shadow-md">
            <Link
              to={googleMapsUrl}
              target="_blank"
              className="flex items-center"
            >
              <h1 className="text-2xl font-bold text-[#324d27]  mr-4">
                Location
              </h1>
              <IoLocationOutline size={20} />
            </Link>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Latitude:</span>
              <span className="ml-2">{bowl.latitude}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Longitude:</span>
              <span className="ml-2">{bowl.longitude}</span>
            </div>
            <hr />
            <div className="flex w-full justify-between">
              <h1 className="text-2xl font-bold text-[#324d27]  mr-4 ">
                Bowl Details
              </h1>
              <div>
                <button
                  className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => markRefilled()}
                >
                  Refilled
                </button>
                <button
                  className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ml-4"
                  onClick={() => markEmpty()}
                >
                  Empty
                </button>
                <Link to={`/bowl/edit/${id}`}>
                <button className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ml-4">
                  Edit
                </button> 
                </Link>
                <button
                  className="  text-white font-bold py-2 px-4 rounded-full ml-4 cursor-default"
                  onClick={() => window.location.reload()}

                >
                 <SlRefresh size={20} color="#324d27"/>
                </button>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Capacity:</span>
              <span className="ml-2">{bowl.capacity}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Drinkers:</span>
              <span className="ml-2">{bowl.drinkers}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Refill Flag:</span>
              <span className="ml-2">{bowl.refillFlag ? "Yes" : "No"}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Created By:</span>
              <span className="ml-2">{bowl.createdBy}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Address</span>
              <span className="ml-2">
              
                {bowl.address}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Refilled By:</span>
              <span className="ml-2">{bowl.refilledBy}</span>
            </div>
           
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Updated By:</span>
              <span className="ml-2">{bowl.updatedBy}</span>
            </div>
           
            {/* <div className="mt-6">
          <h2 className="text-xl font-bold text-[#324d27]  mb-2">Activity Logs</h2>
          {bowl.logs.activity.map((log, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span>{log.action} by {log.actor}</span>
              <span className="text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
            </div>
          ))}
        </div> */}
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default BowlDetails;

// {
//   "bid": "1ef2f2c3-62d4-6e20-b3b2-86523d26a2d8",
//   "latitude": "26.719027",
//   "longitude": "88.424448",
//   "capacity": 22,
//   "drinkers": 3,
//   "refillFlag": 0,
//   "createdBy": "1ef2f172-f65f-68e0-b135-b7e52446ef31",
//   "createdAt": "2024-06-20T17:40:41.000Z",
//   "refilledBy": "1ef2f172-f65f-68e0-b135-b7e52446ef31",
//   "refilledAt": "2024-06-20T17:40:41.000Z",
//   "updatedBy": "1ef2f172-f65f-68e0-b135-b7e52446ef31",
//   "updatedAt": "2024-06-20T17:40:41.000Z",
//   "logs": {
//       "activity": [
//           {
//               "actor": "1ef2f172-f65f-68e0-b135-b7e52446ef31",
//               "action": "created",
//               "timestamp": "2024-06-20T17:40:40.579Z"
//           }
//       ]
//   }
// }
