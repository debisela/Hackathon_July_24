const {db} = require('../config/data.js')

const getCategory = async (itemsArr) =>{
    try {
        let newArr = await Promise.all(itemsArr.map(async (item)=>{
            const result = await db('groceries')
            .select('category')
            .where('item_name', 'ILIKE', item)
            return result[0].category;
        }))
        return newArr;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCategory
}