const mongoose = require('mongoose')
const Item = require("../models/item")
const Category = require('../models/category')
const tryCatch = require("../util/trycatch"); 
const { body, validationResult } = require('express-validator');

let item_list = tryCatch (async(req,res,next) => {
    //get all items
    let items = await Item.find().populate("categories").exec();
    res.render("item/itemList",{
        items
    })
})

let item_detail = tryCatch (async(req,res,next) => {
    let item = await Item.findById(req.params.id).populate("categories").exec();
    if (!item) {
        throw new Error("item does not exist")
    }
    res.render("item_detail",{
        item
    })
    
})

let item_create_get = tryCatch (async(req,res,next) => {
    let categories = await Category.find();
    res.render("item/itemCreate",{categories});
})

let item_create_post = [
    body(["name"],"name must be greater than 2 and must not be empty")
    .isLength({min:2})
    .escape()
    .trim(),

    body(["description"],"description must be greater than 2 and must not be empty")
    .isLength({min:2})
    .escape()
    .trim()
    ,

    body(["stock"],"stock is not a non negative number")
    .isInt({min:0})
    .escape(),

    body(["price"],"price is not valid")
    .escape()
    .isCurrency({
        symbol: "",
        require_symbol: false,
        allow_negatives: false,
        decimal_separator: ".",
        thousands_separator: ",",
        digits_after_decimal: [0,1,2]
    })
    .trim(),

    tryCatch(async(req,res,next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let categories = await Category.find();
            console.log(errors);
            res.render("item/itemCreate",{categories,errors:errors.array()});
        }
        else {
            // todo : save and redirect
            res.redirect('/item')
        }

    })
] 

let item_update_get = tryCatch (async(req,res,next) => {
})

let item_update_post = tryCatch (async(req,res,next) => {
})

let item_delete_get = tryCatch (async(req,res,next) => {
})


let item_delete_post = tryCatch (async(req,res,next) => {
    
})

module.exports = {
    item_list,
    item_detail,
    item_create_get,
    item_create_post,
    item_update_get,
    item_update_post,
    item_delete_get,
    item_delete_post,
}