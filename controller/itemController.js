const mongoose = require('mongoose')
const Item = require("../models/item")
const Category = require('../models/category')
const tryCatch = require("../util/trycatch"); 
const { body, validationResult } = require('express-validator');

let item_list = tryCatch (async(req,res,next) => {
    //get all items
    let items = await Item.find().populate("category").exec();
    res.render("item/itemList",{
        items
    })
})

let item_detail = tryCatch (async(req,res,next) => {
    let item = await Item.findById(req.params.id).populate("category").exec();
    if (!item) {
        throw new Error("item does not exist")
    }
    res.render("item/itemDetail",{
        title:`Item: ${item.name}`,
        name:item.name,
        price:item.price,
        description:item.description,
        stock:item.stock,
        categories:item.category,
        url:item.url
    })
    
})

let item_create_get = tryCatch (async(req,res,next) => {
    let categories = await Category.find().exec();
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
            let category = await Category.find();
            console.log(errors);
            res.render("item/itemCreate",{category,errors:errors.array()});
        }
        else {
            if (!(req.body.category instanceof Array)) {
                if (typeof req.body.category === "undefined") req.body.category = [];
                else req.body.category = new Array(req.body.category);
            }
            const item = new Item({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock,
                category: req.body.category,
            })
            await item.save();
            res.redirect('/item')
        }

    })
] 

let item_update_get = tryCatch (async(req,res,next) => {
    const item = await Item.findById(req.params.id).exec()
    const categories = await Category.find().exec()
    res.render("item/itemUpdate", {
        item,
        categories
    })
})

let item_update_post = [
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
            const category = await Category.find();
            const item = await Item.findById(req.params.id);
            console.log(errors);
            res.render("item/itemUpdate",{item,category,errors:errors.array()});
        }
        else {
            if (!(req.body.category instanceof Array)) {
                if (typeof req.body.category === "undefined") req.body.category = [];
                else req.body.category = new Array(req.body.category);
            }
            await Item.findByIdAndUpdate(req.params.id,{
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock,
                category: req.body.category,
            })
            res.redirect('/item')
        }

    })
] 

let item_delete_get = tryCatch (async(req,res,next) => {
    const item = await Item.findById(req.params.id).exec();
    if (!item) {
        throw new Error("item not found");
    }
    
    res.render("item/itemDelete",{item})
})


let item_delete_post = tryCatch (async(req,res,next) => {
    const item = await Item.findById(req.params.id).exec;
    if (!item) {
        throw new Error("item not found");
    }

    await Item.findByIdAndDelete(req.params.id);
    res.redirect("/item")
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