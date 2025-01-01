import { useState } from "react";
import toast from "react-hot-toast";
import { createBowl } from "../api/api";
const CreateBowl = () => {
  const [formData, setFormData] = useState({
    // name: "",
    // email: "",
    drinkers: "",
    capacity: "",
    address: "",
    latitude: "Latitude",
    longitude: "Longitude",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBowl(formData)
      .then((response) => {
        toast.success(response.data.message);

        window.location.href = `/bowl/${response.data.data.bowl}`;
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center">
      <form
        className="flex flex-col items-center justify-center md:min-w-[600px] gap-4 md:border border-[#324d27] p-8 rounded md:shadow-lg md:bg-[#eaecdd]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-[#324d27] text-2xl font-bold">Create a Bowl</h1>
        <p className="text-[#324d27] text-sm text-center">
        Place bowls in your areas to enable you and others to take steps to feed or hydrate them.<br/>
          Fill in the details to create a new bowl.
        </p>
        {/* <input
          type="text"
          name="name"
          placeholder="Name"
          className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full"
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full"
          onChange={(e) => handleChange(e)}
          required
        /> */}
     
        <input
          type="number"
          name="drinkers"
          placeholder="Bowl's Capacity in litres"
          className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full"
          onChange={(e) => {
            if (e.target.value < 0) e.target.value = 0;
            handleChange(e);
          }}
          required
        />
        <input
          type="number"
          name="capacity"
          placeholder="No of animals who can drink"
          className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full"
          onChange={(e) => {
            if (e.target.value <= 0) toast.error("Please enter a valid number");
            else handleChange(e);
          }}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address (optional)"
          className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full"
          onChange={(e) => handleChange(e)}
        />
           <section className="flex justify-around w-full">
        <div   className="border border-[#324d27] p-2 rounded bg-[#eaecdd]  text-gray-500 h-12 w-fit "
        >{formData.latitude}</div>
         <div   className="border border-[#324d27] p-2 rounded bg-[#eaecdd]  text-gray-500 h-12 w-fit"
        >{formData.longitude}</div> 
         <button
          type="button"
          className="bg-[#324d27] text-white p-2 rounded mt-2"
          onClick={handleLocation}
        >
          Add GeoLocation
        </button>
        </section>

       
        <button
          type="submit"
          className="bg-[#324d27] text-white p-2 rounded mt-2"
          onClick={handleSubmit}
        >
          Create Bowl
        </button>
      </form>
    </div>
  );
};

export default CreateBowl;
