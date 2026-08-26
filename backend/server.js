const dotenv = require('dotenv'); 
dotenv.config(); 

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
app.use('/api/attendance',require('./routes/attendanceRoutes'));
app.use('/api/leave', require('./routes/leaveRoutes'));
app.use('/api/eod', require('./routes/eodRoutes'));

app.get('/', (req, res) => {
    res.send('Attendrix Backend Server Running Successfully!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));