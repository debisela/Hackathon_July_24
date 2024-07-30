const {getCategory} = require('../model/groceryModel.js')

const _getCategory = async (req, res) =>{
    const {itemsArr} = req.body;
    console.log(itemsArr);
    try {
        const result = await getCategory(itemsArr)
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:'something wrong'})
    }
}

module.exports = {
    _getCategory
}