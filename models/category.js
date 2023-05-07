let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let category = new Schema({
    name: { type: String, required:true , minLength: 1},
})

category.virtual("url").get(function () {
    return `/category/${this._id}`
})

let Category = mongoose.model("Category", category, "category");
module.exports = Category;