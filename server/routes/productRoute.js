const express = require('express');
const { adminCheck } = require('../controllers/authController');
const {
  create,
  getProductPerPage,
  remove,
  getOne,
  update,
} = require('../controllers/productController');
const { authCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authCheck, adminCheck, create);
router.get('/', getProductPerPage);
router.delete('/:slug', authCheck, adminCheck, remove);
router.get('/:slug', getOne);
router.put('/:slug', authCheck, adminCheck, update);

module.exports = router;
