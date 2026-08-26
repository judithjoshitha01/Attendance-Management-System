const express = require('express');
const router = express.Router();

// Destructuring handles the exported functions correctly
const { markAttendance, getattendancehistory } = require('../controllers/attendanceController');

router.post('/timein', markAttendance);
router.post('/timeout', markAttendance);
router.get('/my', getattendancehistory);

module.exports = router;