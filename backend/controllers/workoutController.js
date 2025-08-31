
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//getall workouts
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

//get a single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Such Workout' })
    }

    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(404).json({ error: 'Workout not found' })
    }
    res.status(200).json(workout)
}


// create a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    let emptyFields = []
    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    try {
        const workout = await Workout.create({ title, load, reps })
        res.status(201).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Such Workout' })
    }

    try {
        const workout = await Workout.findByIdAndDelete({_id: id})
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' })
        }
        res.status(204).json()
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


//update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params
    const { title, load, reps } = req.body
    try {
        const workout = await Workout.findByIdAndUpdate(id, { title, load, reps }, { new: true })
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' })
        }
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



module.exports = {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    updateWorkout,
    deleteWorkout
}