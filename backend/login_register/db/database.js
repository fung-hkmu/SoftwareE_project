const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
    default: () => uuidv4().slice(0, 6),
    index: { unique: true }
  },
  username: {
    type: String,  
    index: { unique: true },
    required: true
  },
  useremail: {
    type: String,  
    required: true
  },
  userphone: {
    type: Number,  
    required: true,
    minlength: 8,  
    maxlength: 8
  },
  password: {
    type: String,
    required: true,
    minlength: 8  
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  timestamp: {
    type: Number,
    default: Date.now  
  }
});

module.exports = mongoose.model("user_datas", userSchema);