const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = Group = mongoose.model('group', groupSchema);