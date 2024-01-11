
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(session({ secret: process.env.secretKey , resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(MongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const Author = require('./models/Author');
const Book = require('./models/Book');


app.use('/api', require('./routes'));

// Passport.js configuration
passport.use(new LocalStrategy(Author.authenticate()));
passport.serializeUser(Author.serializeUser());
passport.deserializeUser(Author.deserializeUser());

async function generateMockData() {
  try {
    // Generate mock authors
    const authors = await Author.generateMockAuthors();

    // Generate mock books with authors
    await Book.generateMockBooks(20, authors);

    console.log('Mock data generated successfully');
  } catch (error) {
    console.error('Error generating mock data:', error);
  }
}

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  generateMockData(); 
});