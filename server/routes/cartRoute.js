const express = require('express');
const {
  saveCart,
  getUserCart,
  capNhatThongTinNguoiMuaHang,
} = require('../controllers/cartController');
const { authCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/save', authCheck, saveCart);
router.get('/get-user-cart', authCheck, getUserCart);
router.put('/update-user-info', authCheck, capNhatThongTinNguoiMuaHang);

module.exports = router;
