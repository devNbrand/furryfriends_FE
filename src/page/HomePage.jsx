import { Link } from "react-router-dom";
import HeroImg from "../components/heroImg";
import Navbar from "../components/Navbar";
import { FaKeyboard } from "react-icons/fa6";
import { MdOutlinePets } from "react-icons/md";
import { FaPrint } from "react-icons/fa6";
import { BsQrCodeScan } from "react-icons/bs";
import { FaSearchLocation } from "react-icons/fa";
import { MdVolunteerActivism } from "react-icons/md";
import { LiaPawSolid } from "react-icons/lia";
import { RiBowlFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
// import { getTeam } from "../api/api";
// import { useEffect, useState } from "react";

const HomePage = () => {
  // const [team, setTeam] = useState([]);

  // useEffect(() => {
  //   getTeam()
  //     .then((response) => {
  //       setTeam(response.data.data);
  //       console.log(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <Navbar />
      <section className=" flex flex-col-reverse md:flex-row items-center w-full ">
        <div className=" text-center md:text-left md:w-[50%] justify-center items-center md:items-start flex gap-4  p-12 flex-col text-[#324d27] ">
          <h1 className="text-2xl md:text-6xl font-bold heading">
            Furry Friends Alliance
          </h1>
          <p className="text-md">
            Keep Your Furry Friend Safe and Healthy:
            <br /> Retrieve Lost Pets with QR-PetTags!
         
            Place bowls in your areas to enable you and others to take steps to
            feed or hydrate them.
          </p>
          <span className="flex gap-4 flex-wrap justify-center md:justify-normal">
            <Link
              to="/bowl_type"
              style={{ display: "inline-block" }}
              className="w-fit"
            >
              <button className="text-white font-bold bg-[#324d27] w-fit py-4 px-2 md:px-4 rounded shadow">
                Get your companion&apos;s QR Tag
              </button>
            </Link>

            <Link
              to="/add_bowl"
              style={{ display: "inline-block" }}
              className="w-fit"
            >
              <button className="text-white font-bold bg-[#324d27] w-fit py-4 px-2 md:px-4 rounded shadow">
                Place a Bowl
              </button>
            </Link>
            <Link
              to="/nearby_bowls"
              style={{ display: "inline-block" }}
              className="w-fit"
            >
              <button className="text-white font-bold bg-[#324d27] w-fit py-4 px-2 md:px-4 rounded shadow">
                Spot Nearby Bowls
              </button>
            </Link>
          </span>
        </div>
        <div className="slideshow- md:w-[50%] h-full m-8 rounded-full">
          <HeroImg />
        </div>
      </section>
      <section className=" flex flex-col gap-4 p-12 text-[#324d27] items-center justify-center w-full bg-[#eaecdd]">
        <h1 className="text-2xl font-bold heading mb-12 text-center">
          How does QR Code works
        </h1>
        <div className="flex flex-wrap w-full gap-8 md:justify-center items-center">
          <div className="flex gap-4 items-center ">
            <FaKeyboard className="text-5xl" />
            <h1 className=" text-lg">
              <h1 className=" text-lg font-bold text-wrap">Step 1</h1>Register Pet/Stray/Cattle/ Birds after signing up
            </h1>
          </div>
          <div className="flex gap-4 items-center ">
            <BsQrCodeScan className="text-5xl" />
            <h1 className=" text-lg">
              <h1 className=" text-lg font-bold">Step 2</h1>Get your companion
              personalised QR code
            </h1>
          </div>

          <div className="flex gap-4 items-center">
            <FaPrint className="text-5xl" />
            <h1 className=" text-lg">
              <h1 className=" text-lg font-bold">Step 3</h1>
              Print the QR code and attach it to your companion&apos;s collar
            </h1>
          </div>
        </div>
      </section>
      <section className=" flex flex-col gap-4 p-12 text-[#324d27] items-center justify-center w-full bg-[#eaecdd]">
        <h1 className="text-2xl font-bold heading  text-center ">
          How Does Our Bowl System Work{" "}
        </h1>{" "}
        <p className="text-[#27481b]  font-bold text-lg mt-4 mb-4">
          Breakthrough Technology Developed to Support Our Companions
        </p>
        <div className="flex flex-col md:flex-row  gap-12  justify-center">
          <div className="flex flex-wrap md:w-[40%] gap-12 flex-col shadow-[#a2a79f] shadow   rounded-3xl p-6 hover:scale-105  transition-transform duration-300">
            <h1 className="text-lg font-bold   text-left">
              {" "}
              If you are registering to place a Bowl in your Nearby Areas :{" "}
            </h1>
            <div className="flex gap-4 items-center ">
              <MdVolunteerActivism className="text-5xl" />
              <h1 className=" text-lg">
                <h1 className=" text-lg font-bold ">Step 1</h1>Register yourself
                as a Volunteer by signing up
              </h1>
            </div>
            <div className="flex gap-4 items-center ">
              <RiBowlFill size={50} />
              <h1 className=" text-lg  w-[80%]">
                <h1 className=" text-lg font-bold">Step 2</h1>Place bowl in your
                nearby areas and add in the Directory so that others can fill
                when required.
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap min-w-[40%] gap-12  flex-col shadow-[#a2a79f] shadow rounded-3xl p-6 hover:scale-105  transition-transform duration-300 ">
            <h1 className="text-lg font-bold   text-left">
              {" "}
              If you are registering to fill nearby Bowls in your Local areas:
            </h1>
            <div className="flex gap-4 items-center ">
              <MdVolunteerActivism className="text-5xl" />
              <h1 className=" text-lg">
                <h1 className=" text-lg font-bold ">Step 1</h1>Register yourself
                as a Volunteer by signing up
              </h1> 
            </div>
            <div className="flex gap-4 items-center ">
              <FaSearchLocation size={50} />
              <h1 className=" text-lg">
                <h1 className=" text-lg font-bold">Step 2</h1>Search the
                Locations where bowls need refilling locally.
              </h1>
            </div>
          </div>
        </div>
      </section>
      {/* <section className=" flex flex-col gap-4 p-12 text-[#324d27]">
        <h1 className="text-2xl font-bold heading">Why Choose Us?</h1>
        <div className="flex gap-12">
          <div className="w-[50%] flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Instantly Retrieve Lost Pets</h2>
            <p className="text-md w-[70%]">
              Our QR-PetTags are designed to help you quickly retrieve your lost
              pet. The QR code on the tag will provide the finder with your
              contact information.
            </p>
          </div>
          <div className="w-[50%] flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Easy to Use</h2>
            <p className="text-md w-[70%]">
              Our QR-PetTags are easy to use. Simply register your pet, attach
              the tag to your pet&apos;s collar, and you&apos;re all set!
            </p>
          </div>
        </div>
      </section> */}
      {/* 
      <section className=" flex flex-col gap-4 p-12 text-[#324d27]">
        <h1 className="text-4xl font-bold heading">How It Works</h1>
        <div className="flex gap-4">
          <div className="w-[50%] flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Register Your Pet</h2>
            <p className="text-md">
              Register your pet on our website. You will receive a QR-PetTag in
              the mail.
            </p>
          </div>
          <div className="w-[50%] flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Attach the Tag</h2>
            <p className="text-md">
              Attach the tag to your pet's collar. The QR code on the tag will
              provide the finder with your contact information.
            </p>
          </div>
        </div>
        </section> */}
      <section className=" flex flex-col md:flex-row px-12 py-8 text-[#324d27] items-center justify-around w-full text-center md:text-left ">
        <div className="flex gap-4 flex-col items-center justify-center">
          <MdOutlinePets className="text-6xl" />
          <h1 className="heading text-xl">Register Stray Animals</h1>
          <Link to="/bowl_type">
            <button className="text-white font-bold bg-[#324d27] w-fit py-2 px-4 rounded shadow">
              Register
            </button>
          </Link>
        </div>
        <div className="flex gap-4 flex-col items-center justify-center">
          <LiaPawSolid className="text-7xl" />
          <h1 className="heading text-xl">Register Pet</h1>
          <Link to="/bowl_type">
            <button className="text-white font-bold bg-[#324d27] w-fit py-2 px-4 rounded shadow ">
              Register
            </button>
          </Link>
        </div>
      </section>

      {/* <section className=" flex flex-col gap-4 p-12 text-[#324d27] items-center justify-center text-center md:text-left">
        <div className="flex gap-4 flex-col items-center justify-center">
          <MdOutlinePets className="text-6xl" />
          <h1 className="heading text-xl">Register Street Dogs</h1>
          <Link to="/register">
            <button className="text-white font-bold bg-[#324d27] w-fit py-2 px-4 rounded shadow">
              Register
            </button>
          </Link>
        </div>
      </section> */}
      {/* <section className=" flex flex-col p-12 text-[#324d27] items-center justify-center text-center md:text-left">
        <div className="flex gap-4 flex-col items-center justify-center">
          <LiaPawSolid className="text-7xl" />
          <h1 className="heading text-xl">Register Birds</h1>
          <Link to="/register">
            <button className="text-white font-bold bg-[#324d27] w-fit py-2 px-4 rounded shadow">
              Register
            </button>
          </Link>
        </div>
      </section> */}
      <section>
        <div className=" flex flex-col gap-4 p-12 text-[#324d27] items-center justify-center xl:h-[50vh] bg-[#eaecdd]">
          <div className="flex gap-4 flex-col items-center justify-center">
            <h1 className="heading text-2xl">About Us</h1>
            <div className="flex md:flex-row flex-col justify-around my-12">
              <p className="text-md  md:w-[40%]">
                Furry Friends Alliance is an initiative started by dedicated
                volunteers to support animals in need who cannot receive help
                otherwise. Our mission is to provide care and assistance to
                these vulnerable animals. Please support us in this endeavor by
                spreading the word and raising awareness. Together, we can make
                a difference in the lives of our furry friends.
              </p>
              <div className="md:w-[40%] mt-6 md:mt-0">
                Help us make a bigger impact by sharing our mission with your
                friends and family. By spreading the word about Furry Friends
                Alliance, you can help raise awareness and support for animals
                in need. <a href="/team" className="font-bold">Know about the Team</a>
                <div className="flex gap-4 my-5  border-t border-[#324d27] pt-5">
                  <a
                    href="whatsapp://send?text=Check%20out%20Furry%20Friends%20Alliance%20at%20https://furryfriendsalliance.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IoLogoWhatsapp className="text-3xl transition-all duration-300 hover:scale-125" />
                  </a>
                  <a
                    href="https://www.linkedin.com/shareArticle?url=https://furryfriendsalliance.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="text-3xl transition-all duration-300 hover:scale-125" />
                  </a>
                  <RiInstagramFill className="text-3xl transition-all duration-300 hover:scale-125" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className=" flex flex-col gap-4 p-12 text-[#324d27] items-center justify-center">
        <div className="flex gap-4 flex-col items-center justify-center">
          <img
            src="https://via.placeholder.com/150"
            alt="dog"
            className="rounded-full h-[300px] w-[300px]"
          />
          <h1 className="heading text-xl">Register Your Cat</h1>
          <Link
            to="/register"
            >
          <button className="text-white font-bold bg-[#324d27] w-fit py-4 px-4 rounded shadow">
            Register
          </button>
          </Link>
        </div>
      </section>
      <section className=" flex flex-col gap-4 p-12 text-[#324d27] items-center justify-center">
        <div className="flex gap-4 flex-col items-center justify-center">
          <img
            src="https://via.placeholder.com/150"
            alt="dog"
            className="rounded-full h-[300px] w-[300px]"
          />
          <h1 className="heading text-xl">Register Your Bird</h1>
          <Link to="/register">
          <button className="text-white font-bold bg-[#324d27] w-fit py-4 px-4 rounded shadow">
            Register
          </button>
          </Link>
        </div>
      </section> */}
      {/* <section className=" flex flex-col gap-4 p-12 text-[#324d27] items-center justify-center">
        <div className="flex gap-4 flex-col items-center justify-center">
          <img
            src="https://via.placeholder.com/150"
            alt="dog"
            className="rounded-full h-[300px] w-[300px]"
          />
          <h1 className="heading text-2xl">Register Your Rabbit</h1>
          <button className="text-white font-bold bg-[#324d27] w-fit py-4 px-4 rounded shadow">
            Register
          </button>
        </div>
      </section> */}
      {/* <section className=" flex flex-col gap-4 p-12 text-[#324d27] md:h-[50vh] items-center justify-center">
        <div className="flex gap-4 flex-col items-center justify-center">
          <h1 className="heading text-2xl">Team</h1>
          <div className="flex flex-wrap gap-6 justify-center items-center  ">
    
            {team &&
              team.map((member) => (
                <div
                  className="flex flex-col items-center justify-center"
                  key={member}
                >
                  <img
                    src={member.image_url}
                    alt="team"
                    className="rounded-full h-[150px] w-[150px]"
                  />
                  <p className="font-bold text-[#324d27]">{member.name}</p>
                  <p className="text-[#324d27]">{member.role}</p>
                </div>
              ))}
          </div>
        </div>
      </section> */}
      {/* <section className=" flex flex-col gap-4 p-12 text-[#324d27]   items-center justify-center text-center w-full">
        <h1 className="heading text-2xl">Contact Us</h1>
        <p className="text-md">
          If you have any questions or concerns, please feel free to contact us
          <div className="my-4 border border-[#324d27] rounded-xl p-3">
            <a
              href="mailto:
          "
              className="text-[#324d27] font-bold mx-1"
            >
              Name : Sidhant Sharma
              <br />
              Address : B3 87 Safdarjung Enclave , New Delhi
              <br />
              Phone no: +918826383394, +919971296073
              <br />
              Email : contact@furryfriendsalliance.com,
              sidhantsidhant@outlook.com
            </a>
          </div>
          We will get back to you as soon as possible.
          <a href="mailto:" className="text-[#324d27] font-bold">
            <input
              type="email"
              placeholder="Type your email here"
              className="p-2 rounded  w-full outline-none my-4"
            />
          </a> 
        </p>
      </section> */}

      <section className=" flex flex-col gap-4 p-2 text-[#324d27]  font-semibold  items-center justify-center text-center w-full">
        Copyright © 2024 Furry Friends Alliance
      </section>
    </div>
  );
};

export default HomePage;
