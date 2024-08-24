import React from "react";
import { FaArrowLeft, FaDumbbell, FaRunning, FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Workouts = () => {
  //taking navigate from the react router dom
  const navigate = useNavigate();

  const workoutLevels = [
    {
      icon: <FaDumbbell />,
      title: "Beginner",
      description: "Start your fitness journey",
    },
    {
      icon: <FaRunning />,
      title: "Intermediate",
      description: "Push your limits further",
    },
    {
      icon: <FaUserFriends />,
      title: "Advanced",
      description: "Master complex routines",
    },
  ];

  return (
    <div className="w-full bg-primary min-h-screen p-4 md:p-8">
          <button
            onClick={() => navigate("/")}
            className="mb-6 flex items-center text-secondery hover:text-white transition-colors duration-300"
          >
            <FaArrowLeft className="mr-2" /> Back to Home
          </button>
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex justify-start mb-6">
          <h1 className="text-xl md:text-3xl font-serif font-semibold text-white">
            <span className="text-secondery">Workout</span> Levels
          </h1>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {workoutLevels.map((level, index) => (
            <div
              onClick={() => navigate(`/workouts/${level.title}`)}
              key={index}
              className="w-full"
            >
              <div className="bg-primarySupp hover:bg-secondery group text-white rounded-lg p-4 h-44 flex flex-col justify-between transition-all duration-300">
                <div className="text-3xl mb-2 text-secondery group-hover:text-primary transition-colors duration-300">
                  {level.icon}
                </div>
                <h2 className="text-lg md:text-xl font-bold mb-2 group-hover:text-black transition-colors duration-300">
                  {level.title}
                </h2>
                <p className="font-mono text-sm md:text-base text-gray-500 group-hover:text-primary transition-colors duration-300">
                  {level.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workouts;
