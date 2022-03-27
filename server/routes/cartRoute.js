const express = require('express');
const { saveCart } = require('../controllers/cartController');
const { authCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/save', authCheck, saveCart);

module.exports = router;
