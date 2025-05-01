const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  supplier: String,
});
module.exports = mongoose.model('Item', ItemSchema);