const { json } = require('body-parser');
const admin = require('../firebase/index');

const authCheck = async (req, res, next) => {
  console.log(req.headers.authorization);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    console.log(token);
    try {
      const firebaseUser = await admin.auth().verifyIdToken(token);
      req.user = firebaseUser;
      next();
    } catch (error) {
      res.status(401).json({
        err: 'Invalid or expired token',
      });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { authCheck };
