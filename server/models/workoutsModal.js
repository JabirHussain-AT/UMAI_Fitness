const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: [String], required: true }, 
  instructions: { type: String, required: true },
  reps: { type: Number, required: true },
  sets: { type: Number, required: true },
  time: { type: String, required: true },
});


const workoutSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  bodyPart: {
    type: String,
    enum: ['chest', 'back', 'legs', 'arms', 'shoulders', 'core'],
    required: true,
  },
  exercises: {
    type: [exerciseSchema],
    validate: [arrayLimit, '{PATH} exceeds the limit of 6 exercises'],
  },
}, { timestamps: true });

function arrayLimit(val) {
  return val.length <= 6;
}

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
