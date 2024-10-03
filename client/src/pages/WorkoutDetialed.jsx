import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaDumbbell, FaFire, FaClock, FaArrowLeft, FaPlay } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


 // Mock data for workouts
 const mockWorkouts = {
  Beginner: {
    Biceps: [
      {
        id: 1,
        name: "Beginner Bicep Curl",
        duration: "20 min",
        calories: 150,
        difficulty: 2,
        images: ["/images/bicep1.jpg", "/images/bicep2.jpg"],
        instructions: [
          "Stand with feet shoulder-width apart",
          "Hold dumbbells at your sides, palms facing forward",
          "Keeping upper arms stationary, curl weights up to shoulder level",
          "Pause briefly, then lower back down",
          "Repeat for desired number of reps"
        ]
      },
    ],
    Triceps: [
      {
        id: 3,
        name: "Tricep Dips",
        duration: "25 min",
        calories: 120,
        difficulty: 2,
        images: ["/images/dips1.jpg", "/images/dips2.jpg"],
        instructions: [
          "Sit on the edge of a bench or chair",
          "Place hands on the edge, fingers pointing forward",
          "Slide buttocks off the bench, supporting your weight with your arms",
          "Lower your body by bending your elbows",
          "Push back up to the starting position",
          "Repeat for desired number of reps"
        ]
      },
    ],
  },
  Intermediate: {
    Chest: [
      {
        id: 4,
        name: "Push Ups",
        duration: "30 min",
        calories: 300,
        difficulty: 4,
        images: ["/images/pushup1.jpg", "/images/pushup2.jpg"],
        instructions: [
          "Start in a plank position with hands slightly wider than shoulder-width",
          "Lower your body until your chest nearly touches the floor",
          "Pause, then push back up to the starting position",
          "Keep your body in a straight line throughout the movement",
          "Repeat for desired number of reps"
        ]
      },
    ],
  },
  Advanced: {
    Core: [
      {
        id: 6,
        name: "Plank",
        duration: "20 min",
        calories: 180,
        difficulty: 3,
        images: ["/images/plank1.jpg", "/images/plank2.jpg"],
        instructions: [
          "Start in a push-up position, but with forearms on the ground",
          "Keep your body in a straight line from head to heels",
          "Engage your core and glutes",
          "Hold this position for the desired duration",
          "Breathe steadily throughout the hold"
        ]
      },
    ],
  },
};

const settings = {
  showArrows: true,
  showStatus: false,
  showIndicators: true,
  infiniteLoop: true,
  showThumbs: false,
  autoPlay: true,
  interval: 5000,
  transitionTime: 500,
};


const WorkoutDetailed = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(level);
  const [workouts, setWorkouts] = useState({});
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('/api/workouts'); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setWorkouts(data);
        } else {
          console.error('Failed to fetch workouts from API:', response.status);
          setWorkouts(mockWorkouts); // Fallback to mock data
        }
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setWorkouts(mockWorkouts); // Fallback to mock data
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);


 
  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
    setSelectedBodyPart(null);
  };

  const handleBodyPartChange = (e) => {
    setSelectedBodyPart(e.target.value);
  };

  const levelWorkouts = workouts[selectedLevel] || {};
  const bodyParts = Object.keys(levelWorkouts);
  const filteredWorkouts = selectedBodyPart ? levelWorkouts[selectedBodyPart] || [] : [];


  if (loading) {
    return <div className="text-center">Loading workouts...</div>;
  }

  
  return (
    <div className="w-full bg-primary min-h-screen p-4 md:p-8 text-white">
      <button 
        onClick={() => navigate('/workouts')} 
        className="mb-6 flex items-center text-secondery hover:text-white transition-colors duration-300"
      >
        <FaArrowLeft className="mr-2" /> Back to Levels
      </button>
      <h1 className="text-2xl md:text-4xl font-serif font-semibold mb-6">
        <span className="text-secondery">{selectedLevel}</span> Workouts
      </h1>
      <div className="mb-6">
        <select
          value={selectedLevel}
          onChange={handleLevelChange}
          className="bg-primarySupp text-white p-2 rounded-lg mr-4"
        >
          <option value="">Select Level</option>
          {Object.keys(workouts).map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        <select
          value={selectedBodyPart}
          onChange={handleBodyPartChange}
          className="bg-primarySupp text-white p-2 rounded-lg"
        >
          <option value="">Select Body Part</option>
          {bodyParts.map((bodyPart) => (
            <option key={bodyPart} value={bodyPart}>{bodyPart}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((workout) => (
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
          <div className="bg-primary p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-secondery">{selectedWorkout.name}</h2>
            <div className="mb-4">
              <Carousel {...settings}>
                {selectedWorkout.images.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={`${selectedWorkout.name} - Image ${index + 1}`} />
                  </div>
                ))}
              </Carousel>
            </div>
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
            <h3 className="text-xl font-bold mb-2 text-secondery">Instructions:</h3>
            <ul className="list-disc pl-5 mb-4">
              {selectedWorkout.instructions.map((instruction, index) => (
                <li key={index} className="mb-1">{instruction}</li>
              ))}
            </ul>
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