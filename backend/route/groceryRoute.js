const express = require('express')
const {_getCategory} = require('../controller/groceryController.js')

const router = express.Router()

router.post('/', _getCategory)

module.exports = router