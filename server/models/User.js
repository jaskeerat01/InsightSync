// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// // User schema
// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Method to compare password for login
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model('User', userSchema);

// module.exports = User;

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  inSightsCount: {
    type: Number,
    default: 0,
  },
  createdOn: {
    type: Date,
    default: Date.now, // Automatically set to the current date and time
  },
  dob: {
    type: Date, // Date of Birth field
    required: false, // Optional field
  },
  location: {
    type: String, // Can store city, state, or country
    required: false, // Optional field
  },
  image:{
    type:String
  },
  likedtopics:[{type: mongoose.Schema.Types.ObjectId, ref:'insightmodel'}],
  saveforlaterTopics:[{type: mongoose.Schema.Types.ObjectId , ref:'insightmodel'}],
  comments:[{type: mongoose.Schema.Types.ObjectId , ref:'Comment'}]
}, {timestamps: true});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password for login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
