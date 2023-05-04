let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let category = new Schema({
    name: { type: String, required:true , minLength: 3},
})

category.virtual("url").get(() => {
    return `/category/${this._id}` ;
})

let Category = mongoose.model("Category", category);
module.exports = Category;