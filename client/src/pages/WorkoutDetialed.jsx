import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaDumbbell, FaFire, FaClock, FaArrowLeft, FaPlay } from 'react-icons/fa';

const WorkoutDetailed = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  // Mock data for workouts
  const workouts = {
    Beginner: [
      { id: 1, name: "Body Weight Circuit", duration: "20 min", calories: 150, difficulty: 2 },
      { id: 2, name: "Cardio Kickstart", duration: "15 min", calories: 100, difficulty: 1 },
      { id: 3, name: "Yoga Basics", duration: "25 min", calories: 120, difficulty: 2 },
    ],
    Intermediate: [
      { id: 4, name: "HIIT Challenge", duration: "30 min", calories: 300, difficulty: 4 },
      { id: 5, name: "Strength Builder", duration: "45 min", calories: 250, difficulty: 3 },
      { id: 6, name: "Core Crusher", duration: "20 min", calories: 180, difficulty: 3 },
    ],
    Advanced: [
      { id: 7, name: "Extreme Endurance", duration: "60 min", calories: 500, difficulty: 5 },
      { id: 8, name: "Power Lifting", duration: "50 min", calories: 400, difficulty: 5 },
      { id: 9, name: "Warrior Workout", duration: "40 min", calories: 350, difficulty: 4 },
    ],
  };

  const levelWorkouts = workouts[level] || [];

  return (
    <div className="w-full bg-primary min-h-screen p-4 md:p-8 text-white">
      <button 
        onClick={() => navigate('/workouts')} 
        className="mb-6 flex items-center text-secondery hover:text-white transition-colors duration-300"
      >
        <FaArrowLeft className="mr-2" /> Back to Levels
      </button>
      <h1 className="text-2xl md:text-4xl font-serif font-semibold mb-6">
        <span className="text-secondery">{level}</span> Workouts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levelWorkouts.map((workout) => (
          <div 
            key={workout.id} 
            className="bg-primarySupp rounded-lg p-6 hover:bg-secondery group transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedWorkout(workout)}
          >
            <h2 className="text-xl font-bold mb-4 group-hover:text-black">{workout.name}</h2>
            <div className="flex justify-between items-center text-gray-300 mb-4">
              <div className="flex items-center">
                <FaClock className="mr-2 group-hover:text-primary" />
                <span className="group-hover:text-primary">{workout.duration}</span>
              </div>
              <div className="flex items-center">
                <FaFire className="mr-2 group-hover:text-primary" />
                <span className="group-hover:text-primary">{workout.calories} cal</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaDumbbell 
                    key={i} 
                    className={i < workout.difficulty ? "text-secondery group-hover:text-primary" : "text-gray-600"} 
                  />
                ))}
              </div>
              <FaPlay className="text-secondery group-hover:text-primary" />
            </div>
          </div>
        ))}
      </div>
      
      {selectedWorkout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-primary p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-secondery">{selectedWorkout.name}</h2>
            <p className="mb-2 flex items-center"><FaClock className="mr-2 text-secondery" />{selectedWorkout.duration}</p>
            <p className="mb-2 flex items-center"><FaFire className="mr-2 text-secondery" />{selectedWorkout.calories} calories</p>
            <p className="mb-4 flex items-center">
              Difficulty: 
              <span className="ml-2 flex">
                {[...Array(5)].map((_, i) => (
                  <FaDumbbell 
                    key={i} 
                    className={i < selectedWorkout.difficulty ? "text-secondery" : "text-gray-600"} 
                  />
                ))}
              </span>
            </p>
            <button 
              className="bg-secondery text-black font-bold py-2 px-4 rounded hover:bg-opacity-80 transition-all duration-300"
              onClick={() => setSelectedWorkout(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkoutDetailed;