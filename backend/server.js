const express = require('express');
const dotenv = require('dotenv');
const products = require('./data/products');
const { connectDB } = require('./db');
const { notFound, errorHandler } = require('./middleware/error');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./api'));

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
