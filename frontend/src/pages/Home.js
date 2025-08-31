import { useEffect } from "react";
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm   from '../components/WorkoutForm'
import { useWorkoutContext } from '../hooks/useWorkoutContext';

const Home = () => {

    const { workouts, dispatch } = useWorkoutContext();

    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch('/api/workouts');
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: "SET_WORKOUTS", payload: json });
            }
        };
        fetchWorkout();
    }, [dispatch]);

    return (
        <div className="home">
            <div className="workouts">
            {workouts && workouts.map(workout => (
                <WorkoutDetails key={workout._id} workout={workout}/>
            ))}
            </div> 
            <div className="workout-form">
            <WorkoutForm />
            </div> 
        </div>
    );
}

export default Home;
