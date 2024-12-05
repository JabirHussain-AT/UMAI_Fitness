const express = require('express');
const router = express.Router();

// Assume that the controller functions handle the logic for workout creation and update
const { createWorkout, updateWorkout , fetchWorkouts } = require('../controllers/workoutController');

// POST route for creating a new workout
router.post('/api/workouts', createWorkout);

//GET route for fetching workouts
router.get('/api/workouts', fetchWorkouts );

// PUT route for updating an existing workout
router.put('/api/workouts/:id', updateWorkout);

module.exports = router;
