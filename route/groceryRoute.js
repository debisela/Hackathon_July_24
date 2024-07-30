const express = require('express')
const {_getCategory} = require('../controller/groceryController.js')

const router = express.Router()

router.get('/', _getCategory)

module.exports = router