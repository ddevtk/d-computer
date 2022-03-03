const slugify = require('slugify');
const { SubCategory } = require('../model/subCategoryModel');

exports.create = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, parent } = req.body;
    const sub = await SubCategory.create({
      name,
      slug: slugify(name),
      parent,
    });
    console.log(sub);
    res.json(sub);
  } catch (error) {
    console.log(error);
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
  const sub = await SubCategory.findOneAndUpdate(
    { slug: req.params.slug },
    {
      name: req.body.name,
      slug: slugify(req.body.name),
      parent: req.body.parent,
    },
    { new: true }
  );
  if (sub) {
    res.json(sub);
  } else {
    res.status(404).json({ message: 'No sub category found' });
  }
};
exports.remove = async (req, res) => {
  console.log(req.params.slug);
  const sub = await SubCategory.findOneAndDelete({
    slug: req.params.slug,
  });
  if (sub) {
    res.json({ message: 'Sub category removed' });
  } else {
    res.status(404).json({ message: 'Sub category not found' });
  }
};
