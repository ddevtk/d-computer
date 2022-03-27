const { Cart } = require('../model/cartModel');
const { User } = require('../model/userModel');

exports.saveCart = async (req, res) => {
  try {
    const { cart, sl, total } = req.body;

    const user = await User.findOne({ email: req.user.email });

    let products = [];

    const oldCart = await Cart.findOne({ orderedBy: user._id });

    if (oldCart) {
      oldCart.remove();
      if (cart.length === 0) {
        return;
      }
    }

    for (let i = 0; i < cart.length; i++) {
      let cartItem = cart[i];
      let object = {};
      object.product = cartItem._id;
      object.count = cartItem.count;
      products.push(object);
    }

    const newCart = await new Cart({
      products,
      total,
      sl,
      totalAfterDiscount: total,
      orderedBy: user._id,
    }).save();

    res.json(newCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
