const Attendance = require('../models/Attendance');

const markAttendance = async (req, res) => {
    try {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        
        let shiftType = "";

        // Morning Shift check (Allowing 9:00 AM to 9:30 AM)
        if (currentHour === 9 && currentMinute <= 30) {
            shiftType = "Morning";
        }
        // Afternoon Shift check (Allowing 1:00 PM to 1:30 PM)
        else if (currentHour === 13 && currentMinute <= 30) {
            shiftType = "Afternoon";
        }
        // Evening Shift check (Allowing 4:00 PM to 4:30 PM)
        else if (currentHour === 16 && currentMinute <= 30) {
            shiftType = "Evening";
        }
        // Block everything else outside these shift windows
        else {
            return res.status(400).json({ 
                message: "Access Denied. Attendance windows: 9:00-9:30 AM, 1:00-1:30 PM, or 4:00-4:30 PM." 
            });
        }

        const todayStr = now.toLocaleDateString('en-CA'); // YYYY-MM-DD format
        const currentTimeStr = now.toLocaleTimeString('en-US', { hour12: true });

        let attendance = await Attendance.findOne({ date: todayStr });

        if (!attendance) {
            attendance = new Attendance({
                date: todayStr,
                timeIn: currentTimeStr,
                status: "Present"
            });
        } else {
            attendance.timeout = currentTimeStr;
        }

        await attendance.save();
        return res.status(200).json({ message: "Attendance updated successfully", attendance });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getattendancehistory = async (req, res) => {
    try {
        const history = await Attendance.find({});
        return res.status(200).json(history);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Make sure both functions are correctly exported here!
module.exports = { markAttendance, getattendancehistory };