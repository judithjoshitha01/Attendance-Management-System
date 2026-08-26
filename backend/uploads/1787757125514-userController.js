const User = require('../models/User');

const getUserProfile = async (req, res) => { 
  res.json(req.user); 
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (error) { 
    res.status(500).json({ message: error.message }); 
  }
};

const getAllUsers = async (req, res) => { 
  res.json(await User.find({}).select('-password')); 
};

const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.role) user.role = req.body.role;
  await user.save();
  res.json({ message: 'User updated successfully' });
};

const deleteUser = async (req, res) => {
  await User.deleteOne({ _id: req.params.id });
  res.json({ message: 'User deleted successfully' });
};

module.exports = { getUserProfile, createUser, getAllUsers, updateUser, deleteUser };