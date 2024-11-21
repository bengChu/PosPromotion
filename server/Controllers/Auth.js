const User = require("../Models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    // 1.CheckUser
    var userfinded = await User.findOne({ name: req.body.name });
    if (userfinded) {
      return res.status(400).json({ message: "user already exists" });
    }
    console.log('in register req.body.name = ' + req.body.name)

    // 2.Encrypt (passwordที่ส่งมาไม่ได้เข้ารหัส(จริงๆ ควรจะเข้านะ), เราจะเก็บในdbแบบเข้ารหัสแล้ว)
    const salt = await bcrypt.genSalt(10);
    userfinded = new User({
      name: req.body.name,
      password: req.body.password,
    });
    userfinded.password = await bcrypt.hash(req.body.password, salt);

    // 3.Save
    await userfinded.save();
    return res.send("register successfully");
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

exports.login = async (req, res) => {
  //login ={name,password(ที่ส่งมาไม่ได้เข้ารหัส)} nameตรง passwordเข้ารหัสแล้วตรง จะres jwttokenกับpayloadส่งกลับไป
  try {
    var userfinded = await User.findOne({ name: req.body.name });
    if (userfinded) {
      const isMatch = await bcrypt.compare(
        req.body.password,
        userfinded.password
      );
      if (!isMatch) {
        return res.send("password not valid").status(400);
      }

      var payload = {
        user: { name: req.body.name,
            role: userfinded.role },
      };

      //jwt.sign(payload, "jwtsecret", { expiresIn: "1m" }, (err, token) => {
       jwt.sign(payload, "jwtsecret", { expiresIn: "1h" }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });
    } else {
      return res.send("user not found").status(400);
    }
  } catch (err) {
    return res.status(500).send("server error");
  }
};

exports.currentUser = async (req,res) => {
  try
  {
    var userfinded = await User.findOne({ name: req.user.name }).exec();
    return res.send(userfinded)
  }
  catch(err)
  {

  }
}