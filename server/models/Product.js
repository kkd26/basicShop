const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    group: String,
    price: Number,
    categories: [String]
});

module.exports = Product = mongoose.model('product', productSchema);