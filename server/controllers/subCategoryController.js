const slugify = require('slugify');
const { SubCategory } = require('../model/subCategoryModel');

const checkDuplicateError = (data, res) => {
  if (data.length !== 0) {
    return res.status(400).json({ message: 'Tên danh mục con đã tồn tại' });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const sub = await SubCategory.find({ slug: slugify(name) });
    if (sub.length !== 0) {
      return res.status(400).json({ message: 'Tên danh mục con đã tồn tại' });
    }
    const newSub = await SubCategory.create({
      name,
      slug: slugify(name),
      parent,
    });
    res.json(newSub);
  } catch (error) {
    res.status(400).json({
      message: 'Create sub category failed',
    });
  }
};
exports.list = async (req, res) => {
  const subCategories = await SubCategory.find({}).sort({ createdAt: -1 });

  res.json(subCategories);
};
exports.getOne = async (req, res) => {
  const sub = await SubCategory.findOne({ slug: req.params.slug });
  console.log(sub);
  if (!sub) {
    res.status(403).json({
      message: 'No sub category found',
    });
  } else {
    res.json(sub);
  }
};
exports.update = async (req, res) => {
  const sub = await SubCategory.find({ name: req.body.name });
  if (sub.length !== 0) {
    return res.status(400).json({ message: 'Tên danh mục con đã tồn tại' });
  }
  const updateSub = await SubCategory.findOneAndUpdate(
    { slug: req.params.slug },
    {
      name: req.body.name,
      slug: slugify(req.body.name),
      parent: req.body.parent,
    },
    { new: true }
  );
  if (updateSub) {
    res.json(updateSub);
  } else {
    res.status(404).json({ message: 'No sub category found' });
  }
};
exports.remove = async (req, res) => {
  const sub = await SubCategory.findOneAndDelete({
    slug: req.params.slug,
  });
  if (sub) {
    res.json({ message: 'Sub category removed' });
  } else {
    res.status(404).json({ message: 'Sub category not found' });
  }
};
