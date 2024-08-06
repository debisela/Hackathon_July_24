const {db} = require('../config/data.js')

const getCategory = async (itemsArr) =>{
    try {
        let newArr = await Promise.all(itemsArr.map(async (item)=>{
            //if less than 3 letters insertes-> return exact same item
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
            //if no match found, show not found
            if (result.length == 0){
                return {results:[{item_name: item, category: 'Category not found'}],multiple:'false'};
            }
            // if one match found return result and mark as non multiple
            else if(result.length == 1) {
                return {results:result,multiple:'false'}
            }
            // if more than one match found return results and mark them as multiple
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