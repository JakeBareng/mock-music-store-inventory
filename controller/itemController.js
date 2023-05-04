const mongoose = require('mongoose')
const Item = require("../models/item")
const tryCatch = require("../util/trycatch")

let item_list = tryCatch (async(req,res,next) => {
    
})
let item_detail = tryCatch (async(req,res,next) => {
    
})
let item_create_get = tryCatch (async(req,res,next) => {
    
})
let item_create_post = tryCatch (async(req,res,next) => {
})

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