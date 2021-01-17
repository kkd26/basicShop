const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: String,
});

module.exports = Group = mongoose.model('group', groupSchema);