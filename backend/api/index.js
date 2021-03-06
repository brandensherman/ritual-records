const router = require('express').Router();

router.use('/products', require('./products'));
router.use('/users', require('./users'));
router.use('/orders', require('./orders'));

module.exports = router;
