const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 1. Importing the already existing EOD model from your models folder
const EOD = require('../models/EOD');

// Ensure 'uploads' folder exists, if not create it automatically
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// POST Route to handle EOD upload and save it directly to database
router.post('/upload', upload.single('workDocument'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const filePath = req.file ? req.file.path : null;

    console.log("Processing EOD for Database Submission:", { title, description, filePath });

    // 2. Creating a new document and saving it directly into MongoDB Compass
    const newEOD = new EOD({
      title,
      description,
      filePath
    });

    await newEOD.save();

    return res.status(200).json({ 
      success: true, 
      message: "EOD data successfully saved to MongoDB!",
      data: newEOD
    });
  } catch (error) {
    console.error("MongoDB Saving Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;