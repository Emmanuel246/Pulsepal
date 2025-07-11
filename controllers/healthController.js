const HealthData = require('../models/HealthData');

// POST /api/health - Save health data
const saveHealthData = async (req, res) => {
  try {
    const {
      sleepHours,
      hydrationLiters,
      heartRate,
      stepsToday,
      stressLevel,
      mood
    } = req.body;

    // Validate required fields
    if (!sleepHours || !hydrationLiters || !heartRate || !stepsToday || !stressLevel || !mood) {
      return res.status(400).json({
        error: 'All fields are required: sleepHours, hydrationLiters, heartRate, stepsToday, stressLevel, mood'
      });
    }

    // Validate data types and ranges
    if (typeof sleepHours !== 'number' || sleepHours < 0 || sleepHours > 24) {
      return res.status(400).json({ error: 'sleepHours must be a number between 0 and 24' });
    }

    if (typeof hydrationLiters !== 'number' || hydrationLiters < 0) {
      return res.status(400).json({ error: 'hydrationLiters must be a positive number' });
    }

    if (typeof heartRate !== 'number' || heartRate < 30 || heartRate > 220) {
      return res.status(400).json({ error: 'heartRate must be a number between 30 and 220' });
    }

    if (typeof stepsToday !== 'number' || stepsToday < 0) {
      return res.status(400).json({ error: 'stepsToday must be a positive number' });
    }

    if (typeof stressLevel !== 'number' || stressLevel < 1 || stressLevel > 5) {
      return res.status(400).json({ error: 'stressLevel must be a number between 1 and 5' });
    }

    if (typeof mood !== 'string' || mood.trim().length === 0) {
      return res.status(400).json({ error: 'mood must be a non-empty string' });
    }

    // Create new health data entry
    const healthData = new HealthData({
      userId: 'demo-user-id', // Hardcoded as specified
      sleepHours,
      hydrationLiters,
      heartRate,
      stepsToday,
      stressLevel,
      mood: mood.trim()
    });

    // Save to database
    const savedHealthData = await healthData.save();

    res.status(201).json({
      message: 'Health data saved successfully',
      data: savedHealthData
    });

  } catch (error) {
    console.error('Error saving health data:', error);
    res.status(500).json({
      error: 'Internal server error while saving health data'
    });
  }
};

// GET /api/health - Get all health data for demo user
const getHealthData = async (req, res) => {
  try {
    // Fetch all health entries for demo user in reverse chronological order
    const healthEntries = await HealthData.find({ userId: 'demo-user-id' })
      .sort({ createdAt: -1 }) // Most recent first
      .exec();

    res.status(200).json({
      message: 'Health data retrieved successfully',
      count: healthEntries.length,
      data: healthEntries
    });

  } catch (error) {
    console.error('Error retrieving health data:', error);
    res.status(500).json({
      error: 'Internal server error while retrieving health data'
    });
  }
};

module.exports = {
  saveHealthData,
  getHealthData
};
