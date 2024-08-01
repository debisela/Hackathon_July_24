const {db} = require('../config/data.js')

const getCategory = async (itemsArr) =>{
    try {
        let newArr = await Promise.all(itemsArr.map(async (item)=>{
            const result = await db('groceries')
            .select('item_name','category')
            .where('item_name', 'ILIKE', `%${item}%`)
            return result.length > 0 ? result : { item_name: item, category: 'Category not found' };
            
        }))
        return newArr.flat();

    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getCategory
}