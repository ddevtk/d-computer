const { Category } = require('../model/categoryModel');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name, slug: slugify(name) });
    res.json(category);
  } catch (error) {
    res.status(400).json({
      message: 'Create category failed',
    });
  }
};
exports.list = (req, res) => {};
exports.read = (req, res) => {};
exports.update = (req, res) => {};
exports.remove = (req, res) => {};
