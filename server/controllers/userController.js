const { Cart } = require('../model/cartModel');
const { Order } = require('../model/orderModel');
const { Product } = require('../model/productModel');
const { User } = require('../model/userModel');

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;
  const user = await User.findOneAndUpdate(
    { email },
    { avatar: picture },
    { new: true }
  );
  if (user) {
    res.json(user);
  } else {
    const newUser = await User.create({ email, name, avatar: picture });
    res.json(newUser);
  }
};

module.exports.createOrder = async (req, res) => {
  try {
    const { paymentIntent } = req.body;
    const user = await User.findOne({ email: req.user.email });
    let { products } = await Cart.findOne({ orderedBy: user._id });
    let newOrder = await new Order({
      products,
      paymentIntent,
      orderedBy: user._id,
    }).save();

    // update left quantity , sold quantity for product
    let bulkOptions = products.map((p) => {
      return {
        updateOne: {
          filter: { _id: p.product._id },
          update: { $inc: { sold: +p.count } },
        },
      };
    });

    let updated = await Product.bulkWrite(bulkOptions);
    console.log(updated);

    res.json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getUserOrders = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const userOrders = await Order.find({ orderedBy: user._id })
      .populate('products.product')
      .sort([['createdAt', 'desc']]);
    res.json(userOrders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
