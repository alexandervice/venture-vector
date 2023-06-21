const User = require('../models/user.models');
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
// Will need this for login funcitonality
const bcrypt = require('bcrypt');

module.exports = {
  // register a new user
  register: async (req, res) => {
    try {
      const potentialUser = await User.findOne({ email: req.body.email }); // check if the user exists in database already
      if (potentialUser) {
        return res.status(400).json({
          message: "Email already exists"
        });
      }
      const newUser = await User.create(req.body);
      const userToken = jwt.sign({_id: newUser._id, email:newUser.email}, secret); // This is to save a backend only cookie that stores the user info with our secret key. We can make this expire later with "7d" or "24h"
      res.cookie("usertoken", userToken, {httpOnly: true}).json({
        message: "Success!",
        user: newUser
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  }
  ,
  // login an existing user
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if(user){
        const passwordMatch = await bcrypt.compare(req.body.password, user.password); // check for password and email matching
        if(passwordMatch){
          const userToken = jwt.sign({_id: user._id, email:user.email}, secret); // can add {expiresIn: "2h"} make this expire in 2h or later with "7d" or "24h"
          res.cookie("usertoken", userToken, {httpOnly: true}).json({
            message: "Log in successful!",
            user: user
          });
        }
        else {
          res.status(400).json({
            message: "Invalid login attempt"
          });
        }
      }
      else {
        res.status(400).json({
          message: "Invalid login attempt"
        });
      }
    }
    catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // logout an existing user
  logout: (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
  }

}