const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const item = new Schema({
    name: { type: String, required:true , minLength: 3},
    description: { type: String, required:true},
    price: { type: mongoose.Types.Decimal128, required: true },
    stock: { type: Number , required:true},
    category: [{type: Schema.Types.ObjectId, ref: "Category"}]
})

item.virtual("url").get(() => {
    return `/item/${this._id}` 
})

const Item = mongoose.model('Item', item);
module.exports = Item;