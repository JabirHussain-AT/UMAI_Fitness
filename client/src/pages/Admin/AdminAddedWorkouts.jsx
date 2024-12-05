import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminAddedWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("/api/workouts"); 
        setWorkouts( isArray(response.data) );
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const handleAddWorkout = () => {
    navigate("/admin/add-workouts"); 
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Added Workouts</h1>

      {loading ? (
        <p>Loading workouts...</p>
      ) : workouts.length === 0 ? (
        <div className="text-center">
          <p className="text-lg">No workouts added yet.</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleAddWorkout}
          >
            Add Workout
          </button>
        </div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Exercises</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workouts?.map((workout) => (
              <tr key={workout.id}>
                <td className="border border-gray-300 px-4 py-2">{workout.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {workout.exercises.map((exercise, index) => (
                    <div key={index}>{exercise.name}</div>
                  ))}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => navigate(`/admin/edit-workout/${workout.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => console.log("Delete workout", workout.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminAddedWorkouts;
