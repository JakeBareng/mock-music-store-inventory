const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const item = new Schema({
    name: { type: String, required:true , minLength: 1},
    description: { type: String, required:true},
    price: { type: String, required: true },
    stock: { type: Number , required:true},
    category: [{type: Schema.Types.ObjectId, ref: "Category"}]
})

item.virtual("url").get(function () {
    return `/item/${this._id}` 
})

const Item = mongoose.model('Item', item, "item");
module.exports = Item;