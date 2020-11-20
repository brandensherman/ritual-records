const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Order } = require('../db');
const { protect } = require('../middleware/authMiddleware');

// @desc Get all logged in user orders
// @route GET /api/orders/myorders
// @access Private
router.get(
  '/myorders',
  protect,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  })
);

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

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
router.put(
  '/:id/pay',
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      const { id, status, update_time, payer } = req.body;

      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: id,
        status: status,
        update_time: update_time,
        email_address: payer.email_address,
      };

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  })
);
module.exports = router;
