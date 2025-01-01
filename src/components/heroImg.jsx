import { useState, useEffect } from "react";

const HeroImg = () => {
  const images = [
    "/images/cat.jpg",
    "/images/dog.jpg",
    "/images/rabbit.jpg",
    "/images/parrot.jpg",
    "/images/cow.jpg",
    "/images/strdogs.webp",
    "/images/sheep.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex justify-center items-center h-[250px] w-[250px] mx-auto md:h-[350px] md:w-[350px] xl:h-[600px] xl:w-[600px] rounded-full overflow-hidden">
      <img
        src={images[currentIndex]}
        alt="background"
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default HeroImg;
