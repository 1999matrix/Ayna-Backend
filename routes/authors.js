
const express = require('express');
const router = express.Router();
const faker = require('faker');
const mongoose = require('mongoose');
const passport = require('passport');
const Author = mongoose.model('Author');
const Book = mongoose.model('Book');



// Register
router.post('/register', async (req, res) => {
  try {
    const newUser = new Author({ username: req.body.username, email: req.body.email });
    await Author.register(newUser, req.body.password);
    res.status(200).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ message: 'Login successful' });
    });
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
});


router.get('/profile', isAuthenticated, (req, res) => {
  res.status(200).json({ user: req.user });
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

module.exports = router;
