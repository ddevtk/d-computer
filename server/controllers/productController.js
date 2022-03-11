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

exports.getProductPerPage = async (req, res) => {
  const limit = +req.query.limit || 4;
  const current = +req.query.page || 1;
  const skip = (current - 1) * limit;
  const allProducts = await Product.find({});
  const products = await Product.find({})
    .skip(skip)
    .limit(limit)
    .populate('category')
    .populate('sub')
    .sort([['createdAt', 'desc']]);

  res.json({ total: allProducts.length, products });
};

exports.remove = async (req, res) => {
  const deleted = await Product.findOneAndDelete({ slug: req.params.slug });
  if (deleted) {
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

exports.getOne = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate('category')
    .populate('sub')
    .exec();
  if (!product) {
    return res.status(404).json({ message: 'No product found' });
  }
  res.json(product);
};
exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Updated product failed' });
  }
};
