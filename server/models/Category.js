const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = Category = mongoose.model('category', categorySchema);