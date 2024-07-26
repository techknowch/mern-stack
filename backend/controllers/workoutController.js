const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all the workouts

const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// get a single workout

const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Invalid ID" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ msg: "Workout not found" });
  }
  res.status(200).json(workout);
};

// create a new workout

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Invalid ID" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ msg: "Workout not found" });
  }
  res.status(200).json({ msg: "Workout deleted successfully" });
};

// update a workouts
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { title, load, reps } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Invalid ID" });
  }

  const updatedWorkout = await Workout.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!updatedWorkout) {
    return res.status(404).json({ msg: "Workout not found" });
  }

  res.status(200).json(updatedWorkout);
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
