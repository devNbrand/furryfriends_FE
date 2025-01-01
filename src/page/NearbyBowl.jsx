import { useState, useEffect } from "react";
import { getAllBowls } from "../api/api";
import { IoLocationOutline } from "react-icons/io5";

const NearbyBowl = () => {
  const [bowls, setBowls] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    getAllBowls()
      .then((response) => {
        setBowls(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      0.5 -
      Math.cos(dLat) / 2 +
      (Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        (1 - Math.cos(dLon))) /
        2;

    return R * 2 * Math.asin(Math.sqrt(a));
  };

  const filterNearbyBowls = () => {
    const nearbyBowls = bowls.filter((bowl) => {
      const distance = calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        bowl.latitude,
        bowl.longitude
      );
      

      return distance <= 50;
    });
    return nearbyBowls;
  };

  const renderTableHeader = () => {
    return (
      <tr className="bg-[#324d27] text-white">
        <th>Latitude</th>
        <th>Longitude</th>
        <th>Location</th>
        <th>Capacity</th>
        <th>Drinkers</th>
      </tr>
    );
  };

  const renderTableData = () => {
    return nearbyBowls.map((bowl) => {
      const { id, latitude, longitude, capacity, drinkers } = bowl;
      return (
        <tr key={id}>
          <td className="text-center">{latitude}</td>
          <td className="text-center">{longitude}</td>
          <td className="text-center">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
              target="_blank"
              rel="noreferrer"
            >
              <IoLocationOutline />
            </a>
          </td>
          <td className="text-center">{capacity}</td>
          <td className="text-center">{drinkers}</td>
        </tr>
      );
    });
  };

  const nearbyBowls = filterNearbyBowls();
  
  return (
    <div className="w-screen min-h-[95vh] overscroll-y-auto flex justify-center items-center">
      <table className="w-[80%]">
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableData()}</tbody>
      </table>
      <div></div>
    </div>
  );
};

export default NearbyBowl;
