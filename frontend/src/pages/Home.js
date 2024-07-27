import { useEffect, useState } from "react";

// components

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:4000/api/workouts");
        const text = await response.text();
        try {
          const json = JSON.parse(text);
          if (response.ok) {
            setWorkouts(json);
          } else {
            setError(json);
          }
        } catch (error) {
          setError(error.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <div className="Home">
      {error && <div className="error">{error.message}</div>}
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            // <div key={workout._id} className="workout">
            //   <h2>{workout.title}</h2>
            //   <p>Load: {workout.load} kg</p>
            //   <p>Reps: {workout.reps}</p>
            // </div>
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
