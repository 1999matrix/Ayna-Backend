


// routes/books.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Book = mongoose.model('Book');

// Get all books (public route)
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Private route example
router.get('/my-books', isAuthenticated, async (req, res) => {
  try {
    const books = await Book.find({ author: req.user._id });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like a book (private route)
router.put('/like/:id', isAuthenticated, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    book.likes += 1;
    await book.save();
    res.status(200).json({ message: 'Book liked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Unlike a book (private route)
router.put('/unlike/:id', isAuthenticated, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    book.likes -= 1;
    await book.save();
    res.status(200).json({ message: 'Book unliked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}



const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};



// Private route: Get all books (accessible only to authenticated users)
router.get('/private/books', isAuthenticated, async (req, res) => {
  try {
    const books = await Book.find({}).populate('author').sort({ _id: -1 });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Private route: Like a book (accessible only to authenticated users)
router.put('/private/books/like/:id', isAuthenticated, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if the user has already liked the book
    const likedByUser = book.likes.some((userId) => userId.equals(req.user._id));

    if (!likedByUser) {
      book.likes.push(req.user._id);
      await book.save();
      res.status(200).json({ message: 'Book liked successfully' });
    } else {
      res.status(400).json({ message: 'You have already liked this book' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Private route: Unlike a book (accessible only to authenticated users)
router.put('/private/books/unlike/:id', isAuthenticated, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if the user has liked the book
    const likedByUser = book.likes.some((userId) => userId.equals(req.user._id));

    if (likedByUser) {
      book.likes = book.likes.filter((userId) => !userId.equals(req.user._id));
      await book.save();
      res.status(200).json({ message: 'Book unliked successfully' });
    } else {
      res.status(400).json({ message: 'You have not liked this book' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

