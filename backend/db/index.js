const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const connectDB = require('./db');

module.exports = {
  User,
  Product,
  Order,
  connectDB,
};
