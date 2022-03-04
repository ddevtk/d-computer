const slugify = require('slugify');
const { Product } = require('../model/productModel');

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: 'Create product failed' });
  }
};
