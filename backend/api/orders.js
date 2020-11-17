const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Order } = require('../db');
const { protect } = require('../middleware/authMiddleware');

// @desc Fetch all orders
// @route GET /api/orders
// @access Public
// router.get(
//   '/',
//   asyncHandler(async (req, res) => {
//     const products = await Order.find({});
//     res.json(products);
//   })
// );

// @desc Create new order
// @route POST /api/orders
// @access Public
router.post(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);

      throw new Error('No order items');
    } else {
      const order = await Order.create({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      res.status(201).json(order);
    }
  })
);
module.exports = router;
