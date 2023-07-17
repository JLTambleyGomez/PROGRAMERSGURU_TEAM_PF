const {PagoconMercadopago,FeedbackMercadoPago} = require ("../utils/mercadoPago")

const MPRouter = require("express").Router();

MPRouter.post("/create_preference",PagoconMercadopago)
MPRouter.get("/feedbackmp",FeedbackMercadoPago)


// cree una carpeta llamada utils, supongo que ahí se deben añadir las utilidades externas a la pagina
// como pagos etc .
module.exports = MPRouter;
