const mongoose = require('mongoose')
const Category = require("../models/category")
const tryCatch = require("../util/trycatch")

let category_list = tryCatch (async(req, res, next) => {

})
let category_detail = tryCatch (async(req, res, next) => {

})
let category_create_get = tryCatch (async(req, res, next) => {

})
let category_create_post = tryCatch (async(req, res, next) => {

})
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