const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      minLength: 8,
      maxLength: 20,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      minLength: 10,
      maxLength: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minLength: 8,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Time Create User, and Time Update User
);

module.exports = mongoose.model("User", userSchema);
