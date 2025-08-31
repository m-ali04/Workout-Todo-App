
import { useWorkoutContext } from '../hooks/useWorkoutContext';

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({workout}) =>{

    const { dispatch } = useWorkoutContext();

    const handleClick = async () => {
        const response = await fetch(`/api/workouts/${workout._id}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: workout._id });
        }
    }

    return (
        <div className="workout-details">
            <div className="workout-details-header">
                <h4>{workout.title}</h4>
                <p><strong>Load (kg) : </strong> {workout.load}</p>
                <p><strong>Reps : </strong> {workout.reps}</p>
                <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            </div>
            <div className="material-symbols-outlined trash" onClick={handleClick}>delete</div>
        </div>

    )

}

export default  WorkoutDetails