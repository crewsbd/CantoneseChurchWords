const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  id: Number,
  displayName: String,
  userName: String,
  profileUrl: String,
  authProvider: String,
});

const User = model('User', userSchema, 'users');

module.exports = User;
