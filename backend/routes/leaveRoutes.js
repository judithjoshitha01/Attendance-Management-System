const express = require('express');
const router = express.Router();
const { applyLeave, getAllLeaves } = require('../controllers/leaveController');
const Leave = require('../models/Leave');

router.post('/apply', applyLeave);
router.get('/all', getAllLeaves);

// Add this brand new PUT router line for update status action
router.put('/status/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedLeave = await Leave.findByIdAndUpdate(req.params.id, { status }, { new: true });
        return res.status(200).json({ message: "Status Updated", updatedLeave });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;