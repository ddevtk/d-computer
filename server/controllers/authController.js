const { User } = require('../model/userModel');

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;
  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );
  if (user) {
    res.json(user);
  } else {
    const newUser = await User.create({ email, name, picture });
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({
      message: 'No user found',
    });
  }
};
