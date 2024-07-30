const {db} = require('../config/data.js')

const getCategory = (item) =>{
    return db('groceries')
    .select('category')
    .where('item_name', item)
}

module.exports = {
    getCategory
}