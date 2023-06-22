const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const {isEmail} = require("validator");


const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    minlength: [2, "First Name must be at least 2 characters"]
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    minlength: [2, "Last Name must be at least 2 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists within our system"],
    validate: [isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"]
  },
  // We can have trips saved in the user or the user saved for each trip or both
  trips: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trips"
  }]
}, {timestamps: true});


// Middleware to create virtual field confirm password
UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => this._confirmPassword = value);

// Middleware to validate the password and confirm password match
UserSchema.pre('validate', function (next) {
  // Only run this middleware if the password is modified or a new user is being created
  if (!this.isModified('password') && !this.isNew) {
    return next();
  }

  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Passwords must match');
  }
  next();
});

// Middleware to hash the password
UserSchema.pre('save', async function (next) {
  // Only run this middleware if the password is modified or a new user is being created
  if (!this.isModified('password') && !this.isNew) {
    return next();
  }

  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});


const User = mongoose.model('Users', UserSchema);

module.exports = User;