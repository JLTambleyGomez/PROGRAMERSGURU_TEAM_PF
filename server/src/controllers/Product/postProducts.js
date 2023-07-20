const fs = require('fs');
const path = require('path');
const { Product } = require("../../db"); // Importa tu modelo de productos

const productosFilePath = path.join(__dirname, './productos.json');

const postProducts = async (req, res) => {
  try {
    const archivoProductos = fs.readFileSync(productosFilePath, 'utf8');

    const productos = JSON.parse(archivoProductos).products;

    await Product.bulkCreate(productos);

    return res.status(200).json({ message: 'Productos creados exitosamente.' });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Error al crear los productos. ' + error.message });
  }
};

module.exports = {
    postProducts,
};