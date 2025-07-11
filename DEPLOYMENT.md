# PulsePal Backend - Vercel Deployment Guide

## 🚀 Deploy to Vercel

### Prerequisites
1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Set up a cloud MongoDB database at [mongodb.com/atlas](https://mongodb.com/atlas)
3. **Gemini API Key**: Get your API key from [Google AI Studio](https://aistudio.google.com/apikey)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Set Up MongoDB Atlas
1. Create a new cluster on MongoDB Atlas
2. Create a database user with read/write permissions
3. Get your connection string (it should look like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/pulsepal?retryWrites=true&w=majority
   ```

### Step 4: Deploy to Vercel
From your project root directory:
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No
- **Project name?** → pulsepal-backend (or your preferred name)
- **Directory?** → ./ (current directory)
- **Override settings?** → No

### Step 5: Set Environment Variables
After deployment, set your environment variables:

```bash
# Set MongoDB connection string
vercel env add MONGO_URI

# Set session secret (generate a random string)
vercel env add SESSION_SECRET

# Set Gemini API key
vercel env add GEMINI_API_KEY
```

When prompted, enter the values:
- **MONGO_URI**: Your MongoDB Atlas connection string
- **SESSION_SECRET**: A random secret string (e.g., `your-super-secret-session-key-12345`)
- **GEMINI_API_KEY**: Your Gemini API key from Google AI Studio

### Step 6: Redeploy with Environment Variables
```bash
vercel --prod
```

## 🔧 Environment Variables Required

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/pulsepal` |
| `SESSION_SECRET` | Secret for session encryption | `your-super-secret-session-key-12345` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIzaSyC...` |

## 📡 API Endpoints

Once deployed, your API will be available at: `https://your-project-name.vercel.app`

### Health Data API
- **POST** `/api/health` - Save health data
- **GET** `/api/health` - Get all health data

### AI Assistant API
- **POST** `/api/ai` - Get AI response based on health data

## 🧪 Testing Your Deployed API

### Test Health Endpoint
```bash
curl -X POST https://your-project-name.vercel.app/api/health \
  -H "Content-Type: application/json" \
  -d '{
    "sleepHours": 8,
    "hydrationLiters": 2.5,
    "heartRate": 72,
    "stepsToday": 8500,
    "stressLevel": 2,
    "mood": "good"
  }'
```

### Test AI Endpoint
```bash
curl -X POST https://your-project-name.vercel.app/api/ai \
  -H "Content-Type: application/json" \
  -d '{
    "message": "How am I doing with my health today?"
  }'
```

## 🔍 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Ensure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0)
   - Check that your connection string is correct
   - Verify database user permissions

2. **Gemini API Error**
   - Verify your API key is correct
   - Check that the Gemini API is enabled in your Google Cloud project
   - Ensure you have sufficient API quota

3. **Environment Variables Not Working**
   - Run `vercel env ls` to check if variables are set
   - Redeploy after setting environment variables: `vercel --prod`

### View Logs
```bash
vercel logs your-project-name
```

## 🔄 Updating Your Deployment

To update your deployed API:
1. Make changes to your code
2. Commit changes to git (optional but recommended)
3. Run: `vercel --prod`

## 📱 Frontend Integration

Your frontend can now make requests to:
```javascript
const API_BASE_URL = 'https://your-project-name.vercel.app';

// Save health data
fetch(`${API_BASE_URL}/api/health`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sleepHours: 8,
    hydrationLiters: 2.5,
    heartRate: 72,
    stepsToday: 8500,
    stressLevel: 2,
    mood: "good"
  })
});

// Get AI response
fetch(`${API_BASE_URL}/api/ai`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: "How am I doing today?"
  })
});
```
