// models/Book.js
const mongoose = require('mongoose');
const faker = require('faker');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
});

// Generate mock books using faker
bookSchema.statics.generateMockBooks = async function (count = 20, authors) {
  const books = [];
  for (let i = 0; i < count; i++) {
    books.push({
      title: faker.random.words(3), // Generating a random group of up to 3 words
      likes: faker.random.number({ min: 0, max: 100 }),
      author: faker.random.arrayElement(authors),
      // Add other fields as needed
    });
  }
  return this.create(books);
};

module.exports = mongoose.model('Book', bookSchema);
