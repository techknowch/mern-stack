const express = require("express");
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const router = express.Router();

// router.get("/", (req, res) => {
//   res.json({ msg: "Get all workouts!" });
// });

router.get("/", getWorkouts);

// router.get("/:id", (req, res) => {
//   res.json({ msg: "Get a single workouts!" });
// });

router.get("/:id", getWorkout);

// POST a new workout

// router.post("/", async (req, res) => {
//   const { title, load, reps } = req.body;
//   try {
//     const workout = await Workout.create({ title, load, reps });
//     res.status(200).json(workout);
//   } catch (err) {
//     res.status(400).json({ err: err.message });
//   }
//   res.json({ msg: "Create a new workout!" });
// });

router.post("/", createWorkout);

// router.delete("/:id", (req, res) => {
//   res.json({ msg: "Delete a workout!" });
// });

router.delete("/:id", deleteWorkout);

// router.patch("/:id", (req, res) => {
//   res.json({ msg: "Update a workout!" });
// });

router.patch("/:id", updateWorkout);

module.exports = router;
