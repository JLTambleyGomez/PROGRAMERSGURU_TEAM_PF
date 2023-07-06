const { Category } = require("../../db"); 
//__________________________________________________

const postCategory = async (req, res) => {
    try {

        const { category } = req.body;
        const [newCategory, created] = await Category.findOrCreate({
            where: {
                name: category,
            }
        });

        const response = {
            category: category,
            message: created
            ? `The new category '${newCategory.name}' was created successfully`
            : `There is already a category called '${newCategory.name}'`
        }
        return res.status(200).json(response);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = {postCategory};