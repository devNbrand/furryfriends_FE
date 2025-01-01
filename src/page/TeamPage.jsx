"use client"
import Navbar from "../components/Navbar";
import TeamMember from "../data/team.json";

const TeamPage = () => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mt-12 text-[#294020]">Meet Our Team</h1>
      <p className="text-center text-gray-600 italic my-5">&apos;Our dedicated team at FurryFriendsAlliance works tirelessly to protect and care for animals. United by compassion, we strive to create a better world for all creatures, one rescue at a time.&apos;</p>
      <div className="container mx-auto p-4  md:px-6 lg:px-12 xl:px-24">
       
        <div className="flex flex-wrap  mx-4 gap-4 justify-center ">
          {TeamMember?.length > 0 &&
            TeamMember.map((member, index) => (
              <TeamCard
                key={index}
                image={member.image}
                position={member.position}
                description={member.description}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;

function TeamCard({ image, position, description }) {

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 my-16">
      <div className="bg-white/20 rounded-2xl shadow-lg ring-1 ring-black/5 isolate backdrop-blur-md p-4 xl:h-[420px] h-fit">
        <div className="flex justify-center -mt-16">
          <img
            src={image}
            alt="Team Member"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold text-[#4f793e]">{position}</h2>
          <p className="text-gray-600 italic ">{description}</p>
        </div>
      </div>
    </div>
  );
}