const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

// this is all to enable us to authenticate users and allow or deny them to access cetain pages depending on if they are logged in or not
module.exports = {
  authenticate: (req, res, next) => {
    const token = req.cookies["usertoken"]
    if (!token) {
      console.log(token)
      return res.status(403).json({
        message: "Cookie Token not found, please login"
      });
    }
    try {
      const data = jwt.verify(token, secret);
      req.userId = data._id;
      req.userEmail = data.userEmail;
      return next();
    } catch {
      return res.status(403).json({
        message: "Invalid credentials, please logout and log back in"
      });
    }
  }
}