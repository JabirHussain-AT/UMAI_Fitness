const { createWorkoutService,fetchWorkoutService }  = require('../services/workoutService')

  // Create a new workout
  const createWorkout = async (req, res) => {
    try {
  
      const workout = req.body
      const savedWorkout = await createWorkoutService(workout)

      res.status(201).json(savedWorkout);
    } catch (error) {
      console.log("🚀 ~ file: workoutController.js:12 ~ createWorkout ~ error:", error)
      res.status(500).json({ message: "Error creating workout", error });
    }
  };


  // fetch workouts
  const fetchWorkouts = async (req, res) => {
    try {
  
      const workouts = await fetchWorkoutService()

      res.status(200).json(workouts);
    } catch (error) {
      console.log("🚀 ~ file: workoutController.js:12 ~ createWorkout ~ error:", error)
      res.status(500).json({ message: "Error fetching workout", error });
    }
  };

// Update an existing workout
const updateWorkout = async (req, res) => {
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ message: "Error updating workout", error });
  }
};

module.exports = { createWorkout, updateWorkout , fetchWorkouts };
