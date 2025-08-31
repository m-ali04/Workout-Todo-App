const express = require('express')
//const Workout = require('../models/workoutModel')
const {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    updateWorkout,
    deleteWorkout
} = require('../controllers/workoutController')

const router = express.Router()

//this is to get all workouts
router.get('/', getAllWorkouts)

//this is to get single workout
router.get('/:id', getSingleWorkout)

//POST a new workout
router.post('/',createWorkout)

//delete a workout
router.delete('/:id',deleteWorkout)

//update a workout
router.patch('/:id',updateWorkout)

module.exports = router