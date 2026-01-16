const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    },
    password: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
      max_length: 50,
      min_length: 3,
    },
    login_pin: {
      type: String,
      required: false,
      min_length: 4,
      max_length: 4,
    },
    phone_number: {
      type: String,
      required: false,
      match: [/^\d{10}$/, "Please use a valid 10-digit phone number."],
      unique: true,
      sparse: true,
    },
    date_of_birth: Date,
    biometricKey: String,
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    wrong_pin_attempts: {
      type: Number,
      default: 0,
    },
    blocked_until_pin: {
      type: Date,
      default: null,
    },
    wrong_passowrd_attempts: {
      type: Number,
      default: 0,
    },
    blocked_until_password: {
      type: Date,
      default: null,
    },
    balalnce: {
      type: Number,
      default: 50000.0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
