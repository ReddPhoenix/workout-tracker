const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now()
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: 'Type of Workout is required.'
        },
        name: {
            type: String,
            trim: true,
            required: 'A Workout Name is required'
        },
        duration: {
            type: Number
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        },
        distance: {
            type: Number
        }
    }]
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

WorkoutSchema.virtual('totalDuration').get(function () {
        return this.exercises.reduce((total, exercise) => {
            return total + exercise.duration;
        }, 0);
    });

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout