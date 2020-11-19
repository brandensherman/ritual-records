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

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
router.get(
  '/:id',
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  })
);

// @desc Create new order
// @route POST /api/orders
// @access Private
router.post(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const {
      cartItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    console.log(cartItems);
    if (cartItems && cartItems.length === 0) {
      res.status(400);

      throw new Error('No order items');
    } else {
      const order = await Order.create({
        orderItems: cartItems,
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
