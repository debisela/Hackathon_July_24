const {db} = require('../config/data.js')

const getCategory = async (itemsArr) =>{
    try {
        let newArr = await Promise.all(itemsArr.map(async (item)=>{
            if (item.length<3){
                const result = await db('groceries')
            .select('item_name','category')
            .where('item_name', item)
            return result.length > 0 ? result : { item_name: item, category: 'Category not found' };
            }
            else {
            const result = await db('groceries')
            .select('item_name','category')
            .where('item_name', 'ILIKE', `%${item}%`)
            // return result.length > 0 ? result : { item_name: item, category: 'Category not found' };
            if (result.length == 0){
                return { item_name: item, category: 'Category not found' }
            }
            else if(result.length == 1) {
                return result
            }
            return {item_name: item, category: 'multiple items found, please choose'}
            }
            
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