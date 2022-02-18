const admin = require('../firebase/index');

const authCheck = (req, res, next) => {
  console.log(req.headers, admin); // token
  next();
};

module.exports = { authCheck };
