var express = require('express');
var router = express.Router();
const categoryController = require('../controller/categoryController')

router.get('/', categoryController.category_list)

router.get('/create', categoryController.category_create_get)

router.post('/create', categoryController.category_create_post)

router.get('/:id', categoryController.category_detail)

router.get('/:id/update', categoryController.category_update_get)

router.post('/:id/update', categoryController.category_update_post)

router.get('/:id/delete', categoryController.category_delete_get)

router.post('/:id/delete', categoryController.category_delete_post)


module.exports = router;