import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const workoutCategories = ["beginner", "intermediate", "advanced"];
const bodyParts = ["chest", "back", "legs", "arms", "shoulders", "core"];

const AdminWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [expandedWorkoutId, setExpandedWorkoutId] = useState(null);

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
  const [loading, setLoading] = useState(false); // State to track loading
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/private/api/workouts"
      );
      setWorkouts(Array.isArray(response.data) ? response.data : []);
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

  const handleImageFiles = (files, index) => {
    const newExercises = [...formData.exercises];
    newExercises[index] = {
      ...newExercises[index],
      image: Array.from(files), // Store files as array
    };
    setFormData({ ...formData, exercises: newExercises });
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

  //toggle button
  const toggleExpand = (id) => {
    setExpandedWorkoutId(expandedWorkoutId === id ? null : id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true); // Start loading state

    // Create a copy of formData to modify before submission
    const formDataCopy = { ...formData };

    try {
      // Loop through each exercise and upload its image files to Cloudinary
      for (let i = 0; i < formDataCopy.exercises.length; i++) {
        const exercise = formDataCopy.exercises[i];

        // Array to hold image URLs for this exercise
        const imageUrls = [];

        // Assuming `exercise.image` holds the image files as an array
        for (let imageFile of exercise.image) {
          const formData = new FormData();
          formData.append("file", imageFile);
          formData.append("upload_preset", "wx0iwu8u"); // Your Cloudinary preset

          const cloudinaryResponse = await axios.post(
            "https://api.cloudinary.com/v1_1/dato7wx0r/upload", // Your Cloudinary URL
            formData,
            {
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percentCompleted); // Update progress state
              },
            }
          );

          imageUrls.push(cloudinaryResponse.data.secure_url); // Push the uploaded image URL to the array
        }

        // Store the array of image URLs under the current exercise
        formDataCopy.exercises[i].image = imageUrls;
      }
      // console.log("🚀 ~ file: AdminWorkouts.jsx:135 ~ handleSubmit ~ formDataCopy:", formDataCopy)

      await axios.post(
        "http://localhost:3000/private/api/workouts",
        formDataCopy
      );
      // Submit the form with all the exercise image URLs updated
      if (isEditingWorkout && currentWorkout?._id) {
        await axios.put(
          `private/api/workouts/${currentWorkout._id}`,
          formDataCopy
        );
      } else {
      }

      fetchWorkouts(); // Refresh the workouts list after submission
      resetForm(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error saving workout:", error);
    } finally {
      setLoading(false); // End loading state
      setUploadProgress(0); // Reset progress
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

      {!isAddingWorkout && (
        <button
          onClick={() => setIsAddingWorkout(true)}
          className="bg-secondery text-black px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors duration-300 flex items-center mb-6"
        >
          <FaPlus className="mr-2" /> Add New Workout
        </button>
      )}

      {isAddingWorkout && (
        <form
          onSubmit={handleSubmit}
          className="bg-primarySupp p-6 rounded-lg mb-6"
        >
          <h2 className="text-2xl font-bold mb-4">
            {isEditingWorkout ? "Edit Workout" : "Add New Workout"}
          </h2>

          {/* Show loading progress if uploading */}
          {loading && (
            <div className="mb-4 text-center">
              <p className="text-lg">Uploading: {uploadProgress}%</p>
            </div>
          )}

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

          {/* Exercises Input */}
          {formData.exercises.map((exercise, index) => (
            <div key={index} className="bg-primaryDark p-4 mb-4 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Exercise {index + 1}</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={exercise.name}
                    onChange={(e) => handleInputChange(e, index)}
                    className="w-full p-2 bg-primary rounded"
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
                    multiple
                    onChange={(e) => handleImageFiles(e.target.files, index)}
                    className="w-full p-2 bg-primary rounded"
                  />
                  {errors[`exercise${index}Image`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[`exercise${index}Image`]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2">Instructions</label>
                  <textarea
                    name="instructions"
                    value={exercise.instructions}
                    onChange={(e) => handleInputChange(e, index)}
                    className="w-full p-2 bg-primary rounded"
                  />
                  {errors[`exercise${index}Instructions`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[`exercise${index}Instructions`]}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block mb-2">Reps</label>
                  <input
                    type="number"
                    name="reps"
                    value={exercise.reps}
                    onChange={(e) => handleInputChange(e, index)}
                    className="w-full p-2 bg-primary rounded"
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
                    className="w-full p-2 bg-primary rounded"
                  />
                  {errors[`exercise${index}Sets`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[`exercise${index}Sets`]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2">Time</label>
                  <input
                    type="text"
                    name="time"
                    value={exercise.time}
                    onChange={(e) => handleInputChange(e, index)}
                    className="w-full p-2 bg-primary rounded"
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

          <button
            type="submit"
            className="bg-secondery text-black px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors duration-300 mt-6"
            disabled={loading} // Disable button while loading
          >
            {loading
              ? "Uploading..."
              : isEditingWorkout
              ? "Update Workout"
              : "Add Workout"}
          </button>
        </form>
      )}

      <div className="grid grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <div key={workout._id} className="bg-primarySupp p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">{workout.category}</h3>
            <p className="text-sm mb-2">Body Part: {workout.bodyPart}</p>
            <div className="flex-col gap-2">
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this workout?"
                    )
                  ) {
                    handleDelete(workout._id);
                  }
                }}
                className="bg-red-500 mb-2 flex text-black px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors duration-300"
              >
                <FaTrash className="mr-2" /> Delete
              </button>

              <button
                onClick={() => handleEdit(workout)}
                className="bg-secondery mb-1 flex justify-items-center text-black px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors duration-300 mr-2"
              >
                <FaEdit className="mr-2 mt-1" /> Edit
              </button>
              <button
                onClick={() => toggleExpand(workout._id)}
                className="bg-blue-500 text-black px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors duration-300 mt-2"
              >
                {expandedWorkoutId === workout._id ? "Collapse" : "Expand"}
              </button>
            </div>
            {expandedWorkoutId === workout._id && (
              <div className="mt-4">
                <h4 className="text-lg font-bold mb-2">Exercises:</h4>
                <ul className="space-y-2">
                  {workout.exercises.map((exercise, index) => (
                    <li
                      key={index}
                      className="bg-gray-100 text-black p-3 rounded-lg"
                    >
                      <img src={exercise?.image} alt="not available" />
                      <p>
                        <strong>Name:</strong> {exercise.name}
                      </p>
                      <p>
                        <strong>Instructions:</strong> {exercise.instructions}
                      </p>
                      <p>
                        <strong>Reps:</strong> {exercise.reps}
                      </p>
                      <p>
                        <strong>Sets:</strong> {exercise.sets}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminWorkouts;
