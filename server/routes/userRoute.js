const express = require('express');
const {
  createOrUpdateUser,
  createOrder,
  getUserOrders,
} = require('../controllers/userController');
const { authCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/create-order', authCheck, createOrder);
router.get('/orders', authCheck, getUserOrders);

module.exports = router;
