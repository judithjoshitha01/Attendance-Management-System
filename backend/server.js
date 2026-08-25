const dotenv = require('dotenv'); // 1. இதை ஃபர்ஸ்ட் லைனுக்கு கொண்டு வந்தாச்சு
dotenv.config(); // 2. இதை செகண்ட் லைன்ல ரன் பண்றோம்

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Active routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Connect Database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Active Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Attendrix Backend Server Running Successfully!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));