const Workout = require('../models/workoutsModal');

// Function to create a new workout
const createWorkoutService = async (workoutData) => {
  try {
    // Use the create method to directly save the workout
    const savedWorkout = await Workout.create(workoutData);
    return savedWorkout;
  } catch (error) {
    throw new Error(error.message);
  }
};

//service to fetch workouts
const fetchWorkoutService = async () => {
  try {
    const workouts = await Workout.find();
    return workouts;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createWorkoutService,
  fetchWorkoutService
};
