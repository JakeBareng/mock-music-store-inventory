const mongoose = require('mongoose')
const Category = require("../models/category")
const tryCatch = require("../util/trycatch")
const { body, validationResult } = require('express-validator');

let category_list = tryCatch (async(req, res, next) => {
    const categories = await Category.find().exec();
    res.render('category/categoryList',{categories})
})
let category_detail = tryCatch (async(req, res, next) => {

})
let category_create_get = tryCatch (async(req, res, next) => {
    res.render('category/categoryCreate',{title:"create new category"});
})
let category_create_post = [
    body(["name"],"name cannot be empty")
    .isLength({min:2})
    .trim()
    .escape()
    ,
    tryCatch (async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('category/categoryCreate',{errors:errors.array()})
        }
        else {
            const category = new Category({name:req.body.name})
            await category.save();
            res.redirect('/category')
        }
    })
]
let category_update_get = tryCatch (async(req, res, next) => {

})
let category_update_post = tryCatch (async(req, res, next) => {

})
let category_delete_get = tryCatch (async(req, res, next) => {

})
let category_delete_post = tryCatch (async(req, res, next) => {

})
module.exports = {
    category_list,
    category_detail,
    category_create_get,
    category_create_post,
    category_update_get,
    category_update_post,
    category_delete_get,
    category_delete_post,
}