const { Categories } = require("../db"); 

const postCategories = async (req, res) => {
  try {
    const {category} = req.body 
    const [newCategory, created] = await Categories.findOrCreate({
        where: {
            name: category,
        }
    })

    const response = {
        category: "",
        message: created
        ? `The new category '${newCategory.name}' was created successfully`
        : `There is already a category called '${newCategory.name}'`
    }
    res.status(200).json(response)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = { postCategories } 
