const {getCategory} = require('../model/groceryModel.js')

const _getCategory = async (req, res) =>{
    const {item} = req.body;
    try {
        const result = await getCategory(item)
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:'something wrong'})
    }
}

module.exports = {
    _getCategory
}