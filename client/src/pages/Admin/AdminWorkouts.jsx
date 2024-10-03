import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const workoutCategories = ["beginner", "intermediate", "advanced"];
const bodyParts = ["chest", "back", "legs", "arms", "shoulders", "core"];

const AdminWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [isAddingWorkout, setIsAddingWorkout] = useState(false);
  const [isEditingWorkout, setIsEditingWorkout] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [formData, setFormData] = useState({
    category: "",
    bodyPart: "",
    exercises: Array(6).fill({
      name: "",
      image: "",
      instructions: "",
      reps: "",
      sets: "",
      time: "",
    }),
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get("/api/workouts");
    //   setWorkouts(response.data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const newExercises = [...formData.exercises];
      newExercises[index] = { ...newExercises[index], [name]: value };
      setFormData({ ...formData, exercises: newExercises });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = async (file, index) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "YOUR_CLOUDINARY_UPLOAD_PRESET"); // replace with your upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`, // replace with your Cloudinary cloud name
        formData
      );
      const imageUrl = response.data.secure_url;
      handleInputChange({ target: { name: "image", value: imageUrl } }, index);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.bodyPart) newErrors.bodyPart = "Body part is required";

    formData.exercises.forEach((exercise, index) => {
      if (!exercise.name)
        newErrors[`exercise${index}Name`] = "Exercise name is required";
      if (!exercise.image)
        newErrors[`exercise${index}Image`] = "Image URL is required";
      if (!exercise.instructions)
        newErrors[`exercise${index}Instructions`] = "Instructions are required";
      if (!exercise.reps)
        newErrors[`exercise${index}Reps`] = "Reps are required";
      if (!exercise.sets)
        newErrors[`exercise${index}Sets`] = "Sets are required";
      if (!exercise.time)
        newErrors[`exercise${index}Time`] = "Time is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isEditingWorkout && currentWorkout?._id) {
        await axios.put(`/api/workouts/${currentWorkout._id}`, formData);
      } else {
        await axios.post("/api/workouts", formData);
      }
      fetchWorkouts();
      resetForm();
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  const handleEdit = (workout) => {
    setCurrentWorkout(workout);
    setFormData(workout);
    setIsEditingWorkout(true);
    setIsAddingWorkout(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this workout?")) {
      try {
        await axios.delete(`/api/workouts/${id}`);
        fetchWorkouts();
      } catch (error) {
        console.error("Error deleting workout:", error);
      }
    }
  };

  const resetForm = () => {
    setIsAddingWorkout(false);
    setIsEditingWorkout(false);
    setCurrentWorkout(null);
    setFormData({
      category: "",
      bodyPart: "",
      exercises: Array(6).fill({
        name: "",
        image: "",
        instructions: "",
        reps: "",
        sets: "",
        time: "",
      }),
    });
    setErrors({});
  };

  return (
    <div className="bg-primary text-white p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Workout Management</h1>

      {/* Add Workout Button */}
      {!isAddingWorkout && (
        <button
          onClick={() => setIsAddingWorkout(true)}
          className="bg-secondery text-black px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors duration-300 flex items-center mb-6"
        >
          <FaPlus className="mr-2" /> Add New Workout
        </button>
      )}

      {/* Workout Form */}
      {isAddingWorkout && (
        <form
          onSubmit={handleSubmit}
          className="bg-primarySupp p-6 rounded-lg mb-6"
        >
          <h2 className="text-2xl font-bold mb-4">
            {isEditingWorkout ? "Edit Workout" : "Add New Workout"}
          </h2>

          {/* Category and Body Part Selection */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 bg-primary rounded"
              >
                <option value="">Select Category</option>
                {workoutCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>
            <div>
              <label className="block mb-2">Body Part</label>
              <select
                name="bodyPart"
                value={formData.bodyPart}
                onChange={handleInputChange}
                className="w-full p-2 bg-primary rounded"
              >
                <option value="">Select Body Part</option>
                {bodyParts.map((part) => (
                  <option key={part} value={part}>
                    {part}
                  </option>
                ))}
              </select>
              {errors.bodyPart && (
                <p className="text-red-500 text-sm mt-1">{errors.bodyPart}</p>
              )}
            </div>
          </div>

          {/* Exercise Inputs */}
          {formData.exercises.map((exercise, index) => (
            <div key={index} className="mb-6 p-4 bg-primary rounded-lg">
              <h3 className="text-xl font-bold mb-2">Exercise {index + 1}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={exercise.name}
                    onChange={(e) => handleInputChange(e, index)}
                    className="w-full p-2 bg-primarySupp rounded"
                  />
                  {errors[`exercise${index}Name`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[`exercise${index}Name`]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0], index)}
                    className="w-full p-2 bg-primarySupp rounded"
                  />
                  {errors[`exercise${index}Image`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[`exercise${index}Image`]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2">Instructions</label>
                  <input
                    type="text"
                    name="instructions"
                    value={exercise.instructions}
                    onChange={(e) => handleInputChange(e, index)}
                    className="w-full p-2 bg-primarySupp rounded"
                  />
                  {errors[`exercise${index}Instructions`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[`exercise${index}Instructions`]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2">Reps</label>
                  <input
                    type="number"
                    name="reps"
                    value={exercise.reps}
                    onChange={(e) => handleInputChange(e, index)}
                    className="w-full p-2 bg-primarySupp rounded"
                  />
                  {errors[`exercise${index}Reps`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[`exercise${index}Reps`]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2">Sets</label>
                  <input
                    type="number"
                    name="sets"
                    value={exercise.sets}
                    onChange={(e) => handleInputChange(e, index)}
                    className="w-full p-2 bg-primarySupp rounded"
                  />
                  {errors[`exercise${index}Sets`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[`exercise${index}Sets`]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2">Time (in seconds)</label>
                  <input
                    type="number"
                    name="time"
                    value={exercise.time}
                    onChange={(e) => handleInputChange(e, index)}
                    className="w-full p-2 bg-primarySupp rounded"
                  />
                  {errors[`exercise${index}Time`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[`exercise${index}Time`]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={resetForm}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors duration-300"
            >
              {isEditingWorkout ? "Update Workout" : "Add Workout"}
            </button>
          </div>
        </form>
      )}

      {/* Workout List */}
      <h2 className="text-2xl font-bold mb-4">Workout List</h2>
      <div className="grid grid-cols-1 gap-4">
        {workouts.map((workout) => (
          <div
            key={workout._id}
            className="bg-primarySupp p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-bold">{workout.category}</h3>
              <p>Body Part: {workout.bodyPart}</p>
            </div>
            <div>
              <button
                onClick={() => handleEdit(workout)}
                className="text-yellow-500 mr-4"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(workout._id)}
                className="text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminWorkouts;
