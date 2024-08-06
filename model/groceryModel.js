const {db} = require('../config/data.js')

const getCategory = async (itemsArr) =>{
    try {
        let newArr = await Promise.all(itemsArr.map(async (item)=>{
            if (item.length<3){
                const result = await db('groceries')
            .select('item_name','category')
            .where('item_name', item)
            return result.length > 0 ? {results:result,multiple:'false'} : {results:[{item_name: item, category: 'Category not found'}],multiple:'false'};
            }
            else {
            const result = await db('groceries')
            .select('item_name','category')
            .where('item_name', 'ILIKE', `%${item}%`)
            if (result.length == 0){
                return {results:[{item_name: item, category: 'Category not found'}],multiple:'false'};
            }
            else if(result.length == 1) {
                return {results:result,multiple:'false'}
            }
            return {results:result,multiple:'true'}
            }
            
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