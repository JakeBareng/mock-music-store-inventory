var express = require('express');
var router = express.Router();
const itemController = require('../controller/itemController')

router.get('/', itemController.item_list)

router.get('/create', itemController.item_create_get)

router.post('/create', itemController.item_create_post)

router.get('/:id', itemController.item_detail)

router.get('/:id/update', itemController.item_update_get)

router.post('/:id/update', itemController.item_update_post)

router.get('/:id/delete', itemController.item_delete_get)

router.post('/:id/delete', itemController.item_delete_post)


module.exports = router;