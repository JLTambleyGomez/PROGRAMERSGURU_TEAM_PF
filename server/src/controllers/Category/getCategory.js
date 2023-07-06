const { Category } = require('../../db')
//__________________________________________________

const getCategory = async (req, res) => {
    try {

        let categories = await Category.findAll()
        categories = categories.map(cat => cat.dataValues.name)
        console.log(categories);
        res.json(categories);

    } catch (error) {
        res.status(500).json({message: 'Algo salió mal'});
    }
}

module.exports = {getCategory}