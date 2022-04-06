const express = require('express');
const {
  createOrUpdateUser,
  createOrderWithPayment,
  getUserOrders,
  createCodOrder,
} = require('../controllers/userController');
const { authCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/create-order-with-payment', authCheck, createOrderWithPayment);
router.post('/create-cod-order', authCheck, createCodOrder);
router.get('/orders', authCheck, getUserOrders);

module.exports = router;
