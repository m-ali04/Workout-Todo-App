import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";


const WorkoutForm = () => {
    const { dispatch } = useWorkoutContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workout = { title, load, reps };
        const response = await fetch('/api/workouts', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(workout)
        });

        const json = await response.json();
        if (!response.ok) {
          setError(json.error)
          setEmptyFields(json.emptyFields || []);
        }
        if (response.ok) {
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            setEmptyFields([]);
            console.log('New workout added:', json);
            dispatch({ type: 'CREATE_WORKOUT', payload: json });
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>
                <span>Exercise Title : </span>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={emptyFields.includes('title') ? 'error' : ''}
                />
            </label>
            <label>
                <span>Load (kg) : </span>
                <input
                    type="number"
                    required
                    value={load}
                    onChange={(e) => setLoad(e.target.value)}
                    className={emptyFields.includes('load') ? 'error' : ''}
                />
            </label>
            <label>
                <span>Reps : </span>
                <input
                    type="number"
                    required
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className={emptyFields.includes('reps') ? 'error' : ''}
                />
            </label>
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>  }
        </form>
    );
}

export default WorkoutForm;
