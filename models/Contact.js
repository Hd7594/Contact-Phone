const mongoose = require("mongoose");

const Contact = mongoose.model("Contact", {
  name: String,
  city: String,
  phone: String,
  number: String,
  notifications: Boolean,
});

module.exports = Contact;
