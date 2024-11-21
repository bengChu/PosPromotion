const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers["authtoken"];

    if (!token) {
      //ถ้าหน้าบ้านส่ง token = null มา ก็จะเข้าตรงนี้ด้วย
      return res.status(401).send("no token");
      //return res.send('no token').status(401)
    }
    const decoded = jwt.verify(token, "jwtsecret");

    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).send("token invalid");
  }
};

exports.adminCheck = async (req, res, next) => {
  try {
    const token = req.headers["authtoken"];

    if (!token) {
      //ถ้าหน้าบ้านส่ง token = null มา ก็จะเข้าตรงนี้ด้วย
      return res.status(401).send("no token");
      //return res.send('no token').status(401)
    }
    const decoded = jwt.verify(token, "jwtsecret");

    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).send("token invalid");
  }
};


