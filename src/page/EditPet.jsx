import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPet, editPet } from "../api/api";
import Navbar from "../components/Navbar";
import ImageUploader from "../components/ImageUpload";
import toast from "react-hot-toast";
import dataVaccination from "../data/vaccination.json";
import { IoInformationCircle } from "react-icons/io5";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../api/firebaseConfig";

const EditPet = () => {
  const { id } = useParams();
  const [img, setImg] = useState(null);
  const [info, setInfo] = useState(false);

  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const { category, type } = useParams();

  const [data, setData] = useState({
    furryid: id,
    owner: {
      name: "",
      address: "",
      pincode: "",
      phone: "",
      email: "",
    },
    pet: {
      name: "",
      breed: "",
      color: "",
      gender: "",
      type: type,
      medicalHistory: "",
      disability: "",
      additionalInfo: "",
      age: "",
      vaccinationStatus: "",
      vaccinationReport: "",
      photo: img,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editPet(data)
      .then((response) => {
        toast.success("Pet updated successfully");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update pet");
      });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleUpload = async () => {
    if (file) {
      const toastId = toast.loading("Uploading...");
      try {
        const storageRef = ref(storage, `pdfs/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        setUrl(downloadURL);
        setData({
          ...data,
          pet: {
            ...data.pet,
            vaccinationReport: downloadURL,
          },
        });
        toast.success('Upload successful!', { id: toastId });
      } catch (error) {
        toast.error('Upload failed', { id: toastId });
        console.error("Upload failed:", error);
      }
    }
  };

  const handleInputChange = (e, section, field) => {
    setData({
      ...data,
      [section]: {
        ...data[section],
        [field]: e.target.value,
      },
    });
  };

  const handlePhotoChange = (url) => {
    setData({
      ...data,
      pet: {
        ...data.pet,
        photo: url,
      },
    });
  };
  const handleDownload = () => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Vaccination_Report.pdf";
        link.click();
      });
  };
  useEffect(() => {
    getPet(id)
      .then((response) => {
        setData(response.data.data);
        setImg(response.data.data.pet.photo);
        setUrl(response.data.data.pet.vaccinationReport);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center">
        {data && (
          <form
            className="container flex flex-col gap-4 p-12 text-[#324d27] items-center justify-center  w-fit h-fit"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-4 flex-col items-center justify-center">
              <h1 className="heading text-xl">
                Get Your QR Code for your companion!
              </h1>
              <div className="flex w-full justify-center gap-4 items-center">
                <ImageUploader
                  data={img}
                  setData={setImg}
                  handlePhotoChange={handlePhotoChange}
                />
                <p>
                  {img
                    ? "Change your companion's picture"
                    : "Upload your companion's picture"}
                </p>
              </div>

              <div className="border border-[#324d27] px-2 py-1 rounded bg-[#eaecdd] w-full flex justify-center items-center">
                {" "}
                <input
                  type="text"
                  value={data.pet.name || ""}
                  placeholder={data.pet.name || "Companion Name"}
                  className="p-2 bg-[#eaecdd] w-full outline-none"
                  onChange={(e) => handleInputChange(e, "pet", "name")}
                  required
                />
              </div>

              <input
                type="number"
                placeholder={data.pet.age || "Age"}
                value={data.pet.age || ""}
                className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full spinners-none outline-none"
                onChange={(e) => handleInputChange(e, "pet", "age")}
                onInput={(e) => {
                  if (e.target.value < 0) {
                    toast.error("Age cannot be negative");
                    e.target.value = 0;
                  }
                }}
              />
              <select
                defaultValue=""
                value={data.pet.gender || ""}
                placeholder="Companion's gender"
                onChange={(e) => handleInputChange(e, "pet", "gender")}
                className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full px-3 outline-none"
              >
                <option value="" disabled hidden>
                  Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
                <option value="NA">Not Known</option>
              </select>

              <input
                type="text"
                placeholder="Breed"
                value={data.pet.breed || ""}
                className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full outline-none"
                onChange={(e) => handleInputChange(e, "pet", "breed")}
              />
              <input
                type="text"
                placeholder="Color"
                value={data.pet.color || ""}
                className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full outline-none"
                onChange={(e) => handleInputChange(e, "pet", "color")}
              />
              <input
                type="text"
                placeholder="Disability"
                value={data.pet.disability || ""}
                className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full outline-none"
                onChange={(e) => handleInputChange(e, "pet", "disability")}
              />
              <select
                defaultValue=""
                value={data.pet.vaccinationStatus || ""}
                onChange={(e) =>
                  handleInputChange(e, "pet", "vaccinationStatus")
                }
                className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full outline-none "
              >
                <option value="" disabled>
                  Type of Vaccination
                </option>

                {dataVaccination.animal[data.pet.type]?.top_10_vaccinations.map(
                  (vaccination) => (
                    <option key={vaccination} value={vaccination}>
                      {vaccination}
                    </option>
                  )
                )}
              </select>
              <textarea
                placeholder="Medical History"
                value={data.pet.medicalHistory || ""}
                className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full resize-none h-[20vh] outline-none"
                onChange={(e) => handleInputChange(e, "pet", "medicalHistory")}
              />
              <input
                type="file"
                onChange={(e) => handleFileChange(e)}
                className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full outline-none cursor-default "
              />
              <div
                onClick={() => handleUpload()}
                className="bg-[#324d27] p-2 rounded text-[#eaecdd] w-full text-center cursor-default cursor-pointer"
              >
                Upload Latest Vaccination Report
              </div>

              {url && (
                <a
                  href={url}
                  download="Vaccination_Report.pdf"
                  onClick={() => handleDownload()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#324d27] p-2 rounded text-[#eaecdd] w-full text-center"
                >
                  View Vaccination Report
                </a>
              )}

              <input
                type="text"
                placeholder={"Owner Name"}
                value={data.owner.name || ""}
                className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full outline-none"
                onChange={(e) => handleInputChange(e, "owner", "name")}
                required
              />

              <div className="border border-[#324d27] px-2 py-1 rounded bg-[#eaecdd] w-full flex justify-center items-center">
                {" "}
                <input
                  type="text"
                  required
                  placeholder={"Owner's Address"}
                  value={data.owner.address || ""}
                  className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full outline-none border-none"
                  onChange={(e) => handleInputChange(e, "owner", "address")}
                />
                <span className="relative">
                  <IoInformationCircle
                    className="text-[#324d27] text-2xl"
                    onClick={() => {
                      if (info === "address") setInfo(false);
                      else setInfo("address");
                    }}
                  />
                  {info === "address" && (
                    <div className="absolute bg-[#324d27] text-[#eaecdd] p-2 rounded z-30 md:w-[300px] flex flex-col gap-4">
                      <p className="font-bold">
                        Don&apos;t share your exact address
                      </p>

                      <p>
                        Share the area where you live or where your companion
                        can be found
                      </p>
                      <p style={{ fontSize: "12px" }}>
                        अपना सटीक पता साझा न करें जिस क्षेत्र में आप रहते हैं या
                        जहां आपका साथी पाया जा सकता है, उसे साझा करें
                      </p>
                    </div>
                  )}
                </span>
              </div>

              <input
                type="text"
                value={data.owner.phone || ""}
                placeholder={"Owner's Phone Number"}
                required
                className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full outline-none"
                onChange={(e) => handleInputChange(e, "owner", "phone")}
              />
              <input
                type="number"
                value={data.owner.pincode || ""}
                placeholder={"Owner's Pincode"}
                className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full outline-none"
                onChange={(e) => handleInputChange(e, "owner", "pincode")}
              />

              <input
                type="email"
                placeholder={"Owner's Email"}
                value={data.owner.email || ""}
                className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full outline-none"
                onChange={(e) => handleInputChange(e, "owner", "email")}
              />
              <textarea
                placeholder="Additional Information"
                value={data.pet.additionalInfo || ""}
                className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full resize-none h-[20vh] outline-none"
                onChange={(e) => handleInputChange(e, "pet", "additionalInfo")}
              />
              <button className="text-white font-bold bg-[#324d27] w-fit py-2 px-4 rounded shadow">
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default EditPet;
