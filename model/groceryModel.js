const {db} = require('../config/data.js')

const getCategory = async (itemsArr) =>{
    try {
        let newArr = await Promise.all(itemsArr.map(async (item)=>{
            const result = await db('groceries')
            .select('item_name','category')
            .where('item_name', 'ILIKE', item)
            return result.length > 0 ? result[0] : { item_name: item, category: 'Not found' };
            
        }))
        return newArr;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getCategory
}