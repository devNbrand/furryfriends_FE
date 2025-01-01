import Navbar from "../components/Navbar";
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaHome, FaRegEdit } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../api/firebaseConfig";
import { getUserPets, getPet, markMissingPet, markFoundPet } from "../api/api";
import { FaPaw } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { TbBowlFilled } from "react-icons/tb";
const Dashboard = () => {
  const petStoreBackgroundColors = [
    "#FFEDD5",
    "#FEE2E2",
    "#E0F2FE",
    "#E0F7FA",
    "#F0F4C3",
    "#FFF9C4",
    "#FFECB3",
    "#FFE0B2",
    "#FFCDD2",
    "#E1BEE7",
    "#D7CCC8",
    "#C8E6C9",
    "#FFCCBC",
    "#D1C4E9",
    "#B3E5FC",
  ];

  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [petData, setPetData] = useState([]);
  const [pet, setPet] = useState();
  const handleUpload = async (selectedFile) => {
    try {
      const storageRef = ref(storage, `pdfs/${selectedFile.name}`);
      const snapshot = await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      setUrl(downloadURL);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      handleUpload(selectedFile);
    }
  };

  useEffect(() => {
    getUserPets()
      .then((response) => {
        setPetData(response.data.data);
        getPetData(response.data.data[0].furryid);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getPetData = async (id) => {
    getPet(id)
      .then((response) => {
        console.log(response.data);
        setPet(response.data.data);
        setUrl(response.data.data.pet.vaccinationReport);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const markMissing = (id) => {
    markMissingPet(id)
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.error(error);
      });
  };
  const markFound = (id) => {
    markFoundPet(id)
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong");
      });
  };

  return (
    <div>
      <Navbar />

      <section className="flex gap-3 m-4 items-center overflow-x-scroll cards">
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
        {petData &&
          petData.map((item, index) => (
            <div
              key={index}
              onClick={() => getPetData(item.furryid)}
              className="cursor-pointer hover:scale-95 duration-300 ease-in-out transform transition-all"
            >
              <div
                className={`flex items-center p-4 border bg-[${
                  petStoreBackgroundColors[
                    petStoreBackgroundColors.length % index
                  ]
                }] border-gray-800 w-[400px] h-[200px] shadow-xl hover:shadow-xl rounded-xl`}
                style={{
                  backgroundColor:
                    petStoreBackgroundColors[
                      index % petStoreBackgroundColors.length
                    ],
                }}
              >
                <div className="w-[40%] grid place-content-center">
                  {!item.pet.photo ? (
                    <FaPaw size={85} />
                  ) : (
                    <img
                      src={item.pet.photo}
                      alt="companion's image"
                      className="rounded-full"
                    />
                  )}
                </div>
                <div className="w-[80%] mx-4">
                  <h1 className="text-xl font-bold">
                    {item.pet.name || "not specified"}
                  </h1>
                  <p>{`${item.pet.age || "not specified"} years`}</p>
                  <p>
                    <span className="mr-1">{item.pet.color}</span>
                    <span className="mr-1">{item.pet.gender}</span>
                    {item.pet.breed || "not specified"}
                  </p>
                  <div className="flex gap-3 my-3">
                    <button
                      className="bg-[#1e271b] hover:bg-[#702825] text-white text-sm py-1 px-4 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        markMissing(item.furryid);
                      }}
                    >
                      Mark Missing
                    </button>

                    <button
                      className="bg-[#324d27] hover:bg-[#185719] text-white  text-sm py-1 px-4 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        markFound(item.furryid);
                      }}
                    >
                      Mark Found
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </section>

      <div className="flex md:flex-row flex-col justify-center items-center mx-4 md:h-[58vh]">
        {pet ? (
          <div className="md:w-[50%] h-fit md:h-full justify-center flex flex-col p-3 mx-3 border rounded-xl border-[#324d27] bg-[#eaecdd] ">
            <ul>
              <span className="font-bold">Name</span>{" "}
              <span>{pet.pet.name || "not specified"}</span>
            </ul>
            <ul>
              <span className="font-bold">Age</span>{" "}
              <span>{pet.pet.age || "not specified"}</span>
            </ul>
            <ul>
              <span className="font-bold">Type</span>{" "}
              <span>{pet.pet.type || "not specified"}</span>
            </ul>
            <ul>
              <span className="font-bold">Breed</span>{" "}
              <span>{pet.pet.breed || "not specified"}</span>
            </ul>
            <ul>
              <span className="font-bold">Color</span>{" "}
              <span>{pet.pet.color || "not specified"}</span>
            </ul>

            <ul>
              <span className="font-bold">Gender</span>{" "}
              <span>{pet.pet.breed}</span>
            </ul>
            <ul>
              <span className="font-bold">Disability</span>{" "}
              <span>{pet.pet.disability || "not specified"}</span>
            </ul>
            <ul>
              <span className="font-bold">Vaccination Status</span>{" "}
              <span>{pet.pet.vaccincationStatus || "not specified"}</span>
            </ul>
            <ul>
              <span className="font-bold">Medical History</span>
              <div className="max-h-24 overflow-y-auto rounded">
                <span>{pet.pet.medicalHistory || "not specified"}</span>
              </div>
            </ul>
            <ul>
              <span className="font-bold">Additional Info</span>
              <div className="max-h-12 overflow-y-auto rounded">
                <span>{pet.pet.additionalInfo || "not specified"}</span>
              </div>
            </ul>
            <Link to={`/edit_pet/${pet.furryid}`}>
              <button className="bg-[#35492f] my-3 md:my-0 w-fit hover:bg-[#185719] text-white flex gap-2 items-center py-1 px-4 rounded">
                Edit <FaRegEdit />
              </button>
            </Link>
          </div>
        ) : (
          <div className="md:w-[50%] h-fit md:h-full justify-center items-center flex flex-col p-3 mx-3 border rounded-xl border-[#324d27] bg-[#eaecdd] ">
            <p className="font-bold">No Pet Selected</p>
          </div>
        )}

        {url === "" ? (
          <div
            className="md:w-[50%] w-full h-full p-3 m-3 flex flex-col justify-center items-center border rounded-xl border-[#324d27] bg-[#eaecdd] hover:bg-[#f2f2db]"
            onClick={() => handleButtonClick()}
          >
            <p className="font-bold">No Vaccination Report Uploaded</p>
            <button className="bg-[#35492f] hover:bg-[#185719] text-white flex gap-2 items-center py-1 px-4 rounded">
              Upload Vaccination Report <IoDocumentTextSharp />
            </button>
            {file && <p className="text-sm">{file.name}</p>}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="border border-[#324d27] p-2 rounded bg-[#eaecdd] w-full outline-none cursor-default"
              style={{ display: "none" }}
            />
          </div>
        ) : (
          <div className="w-[50%] h-full p-3 m-3">
            <embed
              src={url}
              type="application/pdf"
              width="100%"
              height="100%"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
