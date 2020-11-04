const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { User } = require('../db');
const { generateToken } = require('../utils/generateToken');
const { protect } = require('../middleware/authMiddleware');

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
router.get(
  '/profile',
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      const { _id, name, email, isAdmin } = user;

      res.json({
        _id,
        name,
        email,
        isAdmin,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }

    res.send('success');
  })
);

// @desc Register a new user
// @route POST /api/users
// @access Public
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      const { _id, name, email, isAdmin } = user;
      const token = generateToken(_id);

      res.status(201).json({
        _id,
        name,
        email,
        isAdmin,
        token,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  })
);

// @desc Login user
// @route POST /api/users/login
// @access Public
router.post(
  '/login',

  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const { _id, name, email, isAdmin } = user;
      const token = generateToken(_id);

      res.json({
        _id,
        name,
        email,
        isAdmin,
        token,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  })
);

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
router.put(
  '/profile',
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    console.log(user);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();

      const { _id, name, email, isAdmin } = updatedUser;
      const token = generateToken(_id);

      res.json({
        _id,
        name,
        email,
        isAdmin,
        token,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  })
);

module.exports = router;
