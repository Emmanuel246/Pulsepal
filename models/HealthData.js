const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    default: 'demo-user-id'
  },
  sleepHours: {
    type: Number,
    required: true,
    min: 0,
    max: 24
  },
  hydrationLiters: {
    type: Number,
    required: true,
    min: 0
  },
  heartRate: {
    type: Number,
    required: true,
    min: 30,
    max: 220
  },
  stepsToday: {
    type: Number,
    required: true,
    min: 0
  },
  stressLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  mood: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true // This adds createdAt and updatedAt fields automatically
});

// Index for efficient querying by userId and date
healthDataSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('HealthData', healthDataSchema);
