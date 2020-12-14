const express = require('express');
const router = express.Router();

const db = require('../models');

// GET Workouts path
router.get('/', async (req, res) => {
    try {
        const result = await db.Workout.find({});
        res.json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// GET Workouts Range path
router.get('/range', async (req, res) => {
    try {
        const result = await db.Workout.find({}).sort({ day: -1 }).limit(7);
        res.json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// POST Workouts path
router.post('/', async ({ body }, res) => {
    try {
        const result = await db.Workout.create(body);
        console.log('POST ', result)
        res.json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// // PUT Workouts path
router.put('/:id', async ({ params, body }, res) => {
    try {
        let savedExercises = [];
        const prevWorkout = await db.Workout.findById(params.id);
        savedExercises = prevWorkout.exercises;
        totalExercises = [...savedExercises, body];
        console.log('UPDATE ', totalExercises)
        res.json(totalExercises);
        await db.Workout.findByIdAndUpdate(params.id, { exercises: totalExercises });
    } catch (err) {
        res.status(400).json(err);
    }
});

//Export router
module.exports = router;