const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// User registration
module.exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ isSuccess: false, message: 'Email already registered' });
    }

    const newUser = new User({ email, password });
    await newUser.save();
    res.json({ isSuccess: true, message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ isSuccess: false, message: 'Failed to register user' });
  }
};

// User login
module.exports.login = async (req, res) =>{
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        isSuccess: false,
        message: "Incorrect email",
        data:{}
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.json({
        isSuccess: true,
        message: "success",
        data:{
          token: generateToken(user),
          user
        }
      });
    } else {
      return res.json({
        isSuccess: false,
        message: "faile",
        data:{}
      });
    }
  } catch (err) {
    console.log("Error in login", err);
    return res.json({
      isSuccess: false,
      message: "faile",
      data:{}
    });
  }
};


// Function to generate a JWT token
const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
};
