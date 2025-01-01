import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPet } from "../api/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { MdOutlinePets } from "react-icons/md";
import { ImFilePicture } from "react-icons/im";
const DetailPage = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getPet(id)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching pet data:", error);
        toast.error("Error fetching pet data");
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      });
  }, [id]);

  return (
    <div className="min-h-screen  w-full flex flex-col">
      <Navbar />
      {data && (
        <div className=" flex-col  h-full flex justify-center items-center flex-grow ">
          <div className="flex flex-col  md:flex-row items-center justify-center md:border rounded-2xl border-[#324d27] p-6 shadow-[#324d27]">
            <div className="w-fit items-center justify-center flex flex-col">
              <div className="relative w-52 h-52 mt-5">
                {data.pet && data.pet.photo ? (
                  <img
                    src={data.pet?.photo}
                    alt="pet"
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <ImFilePicture className="text-[100px] text-[#324d27]  absolute right-10 top-14" />
                )}
                <MdOutlinePets className="text-5xl text-[#324d27] absolute bottom-[70%] left-[20%] rotate-[-30deg] transform -translate-x-1/2 -translate-y-1/2" />
              </div>

              <h1 className="italic">
                <b className="mr-2">Name : </b>
                {data.pet?.name}
              </h1>
              {data?.pet?.vaccinationReport && (
                <a
                  href={data.pet?.vaccinationReport}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#324d27] p-2 rounded text-[#eaecdd] w-full text-center cursor-default my-2"
                >
                  Vaccination Report
                </a>
              )}
            </div>
            <div className="flex flex-col mt-5 ml-5">
              <h1 className="text-base text-[#324d27] font-bold heading">
                Pet Details
              </h1>

              <h1 className="italic">
                <b className="mr-2 text-[#324d27]">Breed : </b>
                {data.pet?.breed}
              </h1>
              <h1 className="italic">
                <b className="mr-2 text-[#324d27]">Age : </b>
                {data.pet?.age}
              </h1>
              <h1 className="italic">
                <b className="mr-2 text-[#324d27]">Color : </b>
                {data.pet?.color}
              </h1>
              <h1 className="italic">
                <b className="mr-2 text-[#324d27]">Gender: </b>
                {data.pet?.gender}
              </h1>
              <h1 className="italic">
                <b className="mr-2 text-[#324d27] ">Type : </b>
                {data.pet?.type}
              </h1>
              <h1 className="italic">
                <b className="mr-2 text-[#324d27]">Medical History : </b>
                {data.pet?.medicalHistory}
              </h1>
              <h1 className="italic">
                <b className="mr-2 text-[#324d27]">Disability : </b>
                {data.pet?.disability}
              </h1>
              <h1 className="italic">
                <b className="mr-2 text-[#324d27]">Additional Info : </b>
                {data.pet?.additionalInfo}
              </h1>
              <h1 className="italic">
                <b className="mr-2 text-[#324d27]">Vaccination Status : </b>
                {data.pet?.vaccinationStatus}
              </h1>
              <hr className="border-[#324d27] my-12" />

              <h1 className=" font-bold  text-[#324d27] heading">
                Owner Details
              </h1>

              <h1 className="italic">
                <b className="mr-2 text-[#324d27]">Owner Name : </b>
                {data.owner?.name}
              </h1>
              <h1 className="italic">
                <a
                  href={`mailto:${data.owner?.email}`}
                  className="text-[#324d27]"
                >
                  <b className="mr-2 text-[#324d27]">Owner Email : </b>
                  {data.owner?.email}
                </a>
              </h1>
              <h1 className="italic">
                <b className="mr-2 text-[#324d27]">Owner Phone : </b>
                {data.owner?.phone}
              </h1>
              <h1 className="italic">
                <b className="mr-2 text-[#324d27]">Owner Address : </b>
                {data.owner?.address}
              </h1>
              <h1 className="italic">
                <b className="mr-2 text-[#324d27]">Owner Pincode : </b>
                {data.owner?.pincode}
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
