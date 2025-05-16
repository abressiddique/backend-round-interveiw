const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",           // This refers to the User model
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Contact", contactSchema);
