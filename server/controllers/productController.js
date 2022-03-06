const slugify = require('slugify');
const { Product } = require('../model/productModel');

exports.create = async (req, res) => {
  try {
    const product = await Product.find({ slug: slugify(req.body.title) });
    if (product.length !== 0) {
      return res.status(400).json({ message: 'Sản phẩm đã được tạo' });
    }
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: 'Create product failed' });
  }
};

exports.list = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });

  res.json(products);
};
