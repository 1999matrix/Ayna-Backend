// models/Author.js
const mongoose = require('mongoose');
const faker = require('faker');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_no: {
    type: String,
    required: true,
  },
  
});

// Generate mock authors using faker
authorSchema.statics.generateMockAuthors = async function (count = 10) {
  const authors = [];
  for (let i = 0; i < count; i++) {
    authors.push({
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone_no: faker.phone.phoneNumber(),
      // Add other fields as needed
    });
  }
  return this.create(authors);
};

module.exports = mongoose.model('Author', authorSchema);
