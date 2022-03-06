const express = require('express');
const { adminCheck } = require('../controllers/authController');
const { create, list } = require('../controllers/productController');
const { authCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authCheck, adminCheck, create);
router.get('/', list);

module.exports = router;
