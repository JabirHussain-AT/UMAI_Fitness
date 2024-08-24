import React, { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaDumbbell,
  FaRunning,
  FaUserFriends,
  FaFemale,
  FaWeight,
} from "react-icons/fa";
import { MdSportsKabaddi } from "react-icons/md";

const ExploreSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = [
    {
      icon: <FaDumbbell />,
      title: "Weight Training",
      description: "Build strength and muscle",
    },
    {
      icon: <FaRunning />,
      title: "Cardio Workouts",
      description: "Improve cardiovascular health",
    },
    {
      icon: <FaUserFriends />,
      title: "Personal Training",
      description: "One-on-one coaching",
    },
    {
      icon: <FaFemale />,
      title: "Ladies Training",
      description: "Women-focused workouts",
    },
    {
      icon: <FaWeight />,
      title: "Weight Loss",
      description: "Achieve your weight goals",
    },
    {
      icon: <MdSportsKabaddi />,
      title: "Boxing & Martial Arts",
      description: "Learn self-defense and discipline",
    },
  ];

  const showPrev = currentIndex > 0;
  const showNext = currentIndex < items.length - (isMobile ? 3 : 5);

  const handlePrev = () => {
    if (showPrev) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (showNext) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="relative w-full h-auto my-5 md:my-10 md:px-4">
     <div className="flex flex-col md:flex-row items-center md:justify-between mb-4 md:mb-8">
        {/* Head Section */}
        <h1 className="text-xl md:text-3xl font-serif font-semibold text-white text-center md:text-left mb-4 md:mb-0">
          Explore Our <span className="text-secondery">Programs</span>
        </h1>
        {/* buttons */}
        <div className="flex justify-center md:justify-end">
          <button
            onClick={handlePrev}
            className={`mr-2 p-1 rounded-full ${
              showPrev
                ? "bg-secondery border-2 border-secondery text-black"
                : "text-white border-white border-2"
            }`}
            disabled={!showPrev}
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className={`p-1 rounded-full ${
              showNext
                ? "bg-secondery border-2 border-secondery text-black"
                : "border-white border-2 text-white"
            }`}
            disabled={!showNext}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className="relative overflow-hidden p-0">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${
              currentIndex * (100 / (isMobile ? 3 : 5))
            }%)`,
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`  flex-shrink-0 w-1/3 md:w-1/5 p-2 transition-all duration-300 ${
                isMobile && index === currentIndex + 1
                  ? "scale-105 z-10 "
                  : "scale-95 opacity-70"
              }`}
            >
              <div className="bg-primarySupp  hover:bg-secondery group text-white rounded-lg p-4 h-44 flex flex-col justify-between">
                <div className="text-xl mb-2 text-secondery group-hover:text-primary transition-colors duration-300">
                  {item.icon}
                </div>
                <h2 className="text-md md:text-lg font-bold mb-2 group-hover:text-black transition-colors duration-300">
                  {item.title}
                </h2>
                <p className="font-mono text-[9px] md:text-sm text-gray-500 group-hover:text-primary transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            </div>  
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;
