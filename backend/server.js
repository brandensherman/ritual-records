const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const products = require('./data/products');
const { connectDB } = require('./db');
const { notFound, errorHandler } = require('./middleware/error');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api', require('./api'));

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
