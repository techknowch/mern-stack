require("dotenv").config();

const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

const workoutRoutes = require("./routes/workouts");

const app = express();

// middleware

app.use(cors());

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
// app.get("/", (req, res) => {
//   res.json({ msg: "Welcome to the app" });
// });

app.use("/api/workouts", workoutRoutes);

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to MongoDB at ${process.env.MONGO_URI}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// app.listen(process.env.PORT, () => {
//   console.log(`listening on port 4000...`);
// });
