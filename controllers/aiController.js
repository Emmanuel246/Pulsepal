const axios = require("axios");
const HealthData = require("../models/HealthData");

// POST /api/ai - AI Assistant endpoint
const getAIResponse = async (req, res) => {
  try {
    const { message } = req.body;

    // Validate message
    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return res.status(400).json({
        error: "Message is required and must be a non-empty string",
      });
    }

    // Fetch the most recent health entry for demo user
    const latestHealthData = await HealthData.findOne({
      userId: "demo-user-id",
    })
      .sort({ createdAt: -1 })
      .exec();

    // If no health data exists, provide a default response
    if (!latestHealthData) {
      return res.status(200).json({
        message: "AI response generated successfully",
        response:
          "Hello! I'm PulsePal, your AI health and wellness assistant. I'd love to help you, but I don't have any health data from you yet. Please share your health metrics first so I can provide personalized advice and support!",
      });
    }

    // Construct the Gemini prompt
    const prompt = `You are PulsePal, a caring and supportive AI health and wellness assistant.

The user has just asked:  
"${message.trim()}"

Here is the user's most recent health data:
- Sleep Duration: ${latestHealthData.sleepHours} hours
- Heart Rate: ${latestHealthData.heartRate} bpm
- Water Intake: ${latestHealthData.hydrationLiters} liters
- Steps Taken Today: ${latestHealthData.stepsToday}
- Stress Level: ${latestHealthData.stressLevel} (scale of 1-5)
- Mood: ${latestHealthData.mood}

Based on this data and the user's message, provide a thoughtful, friendly, and empathetic response.  

Be concise but supportive. If stress or health risk is detected, gently recommend steps like rest, hydration, mindfulness, or seeking professional help.  

Always end your message with a helpful tip, positive affirmation, or a question to continue the conversation.

Respond as if you're talking to a real person who needs encouragement and practical health advice.`;

    // Make request to Gemini API
    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    // Extract the AI response
    const aiResponse =
      geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      throw new Error("Invalid response from Gemini API");
    }

    res.status(200).json({
      message: "AI response generated successfully",
      response: aiResponse.trim(),
      healthDataUsed: {
        sleepHours: latestHealthData.sleepHours,
        heartRate: latestHealthData.heartRate,
        hydrationLiters: latestHealthData.hydrationLiters,
        stepsToday: latestHealthData.stepsToday,
        stressLevel: latestHealthData.stressLevel,
        mood: latestHealthData.mood,
        dataTimestamp: latestHealthData.createdAt,
      },
    });
  } catch (error) {
    console.error("Error generating AI response:", error);

    // Handle specific API errors
    if (error.response?.status === 400) {
      return res.status(400).json({
        error: "Invalid request to AI service",
      });
    }

    if (error.response?.status === 401) {
      return res.status(500).json({
        error: "AI service authentication failed",
      });
    }

    if (error.response?.status === 429) {
      return res.status(429).json({
        error: "AI service rate limit exceeded. Please try again later.",
      });
    }

    res.status(500).json({
      error: "Internal server error while generating AI response",
    });
  }
};

module.exports = {
  getAIResponse,
};
