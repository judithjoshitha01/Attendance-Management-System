const Leave = require('../models/Leave');

// 1. Function to apply for leave (Students/Users)
const applyLeave = async (req, res) => {
    try {
        const { userId, startDate, endDate, reason } = req.body;
        const newLeave = new Leave({ userId, startDate, endDate, reason });
        await newLeave.save();
        res.status(201).json({ message: 'Leave application submitted successfully!', newLeave });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Function to get all leave applications (Admin Only)
const getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate('userId', 'name email').sort({ createdAt: -1 });
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Function to update leave status (Admin Approve/Reject)
const updateLeaveStatus = async (req, res) => {
    try {
        const { leaveId } = req.params;
        const { status } = req.body; // status can be 'Approved' or 'Rejected'

        const updatedLeave = await Leave.findByIdAndUpdate(
            leaveId,
            { status },
            { new: true }
        );

        if (!updatedLeave) {
            return res.status(404).json({ message: 'Leave application not found!' });
        }

        res.status(200).json({ message: `Leave status updated to ${status}!`, updatedLeave });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { applyLeave, getAllLeaves, updateLeaveStatus };