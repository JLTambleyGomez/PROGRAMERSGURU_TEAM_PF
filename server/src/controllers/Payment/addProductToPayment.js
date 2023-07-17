const { Payment, Product, User, shopping_cart } = require("../../db");

const addProductToPayment = async (req, res) => {
    try {
        const { userId, productId, amount } = req.body;

        //traemos el usuario
        // const user = await User.findByPk(userId)

        //traemos el producto a agregar
        const productToAdd = await Product.findByPk(productId);

        const priceOfProducts = amount * productToAdd.price;

        if (!productToAdd)
            return res.status(400).json({
                message: `No exite un producto con el id ${productId}}`,
            });

        const stock = productToAdd.stock;

        if (amount > stock)
            return res.status(403).json({ message: "No hay stock suficiente" });

        //traemos la orden de pago
        const paymentOrder = await Payment.findOne({
            where: {
                userId: userId,
                status: "pending",
            },
        });

        // Buscamos en el carrito si ya hay un producto con ese id
        const productAdded = await shopping_cart.findOne({
            where: { ProductId: productId },
        });

        // EXISTE UNA ORDEN DE PAGO
        if (paymentOrder) {
            //no existe el producto en el carrito
            if (!productAdded) {
                await paymentOrder.addProduct(productToAdd);
            }

            const newAmount = productAdded.amount + amount;
            if (newAmount > stock) {
                return res
                    .status(403)
                    .json({ message: "No hay stock suficiente" });
            }

            productAdded.amount = newAmount;

            paymentOrder.userId = userId;
            paymentOrder.totalPrice += priceOfProducts;

            await productAdded.save();
            await paymentOrder.save();

            return res.json({
                message:
                    amount === 1
                        ? "Se agregó correctamente el producto al carrito"
                        : "Se agregaron correctamente los productos al carrito",
                ...paymentOrder,
            });
        }
        //NO EXISTE UNA ORDEN DE PAGO

        const newPayment = await Payment.create({
            totalPrice: priceOfProducts,
            userId,
        });

        // aca se crea el producto en el shopping_cart
        await newPayment.addProduct(productToAdd);
        // se setea la cantidad
        const newProductAdded = await shopping_cart.findOne({
            where: {
                ProductId: productId,
            },
        });
        newProductAdded.amount = amount;
        await newProductAdded.save();

        return res.json({
            message:
                amount === 1
                    ? "Se agregó correctamente el producto al nuevo carrito"
                    : "Se agregaron correctamente los productos al nuevo carrito",
            ...newPayment,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { addProductToPayment };
