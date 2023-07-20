const {PagoconMercadopago,FeedbackMercadoPago} = require ("../utils/mercadoPago")
const {FeedbackMetamask}= require ("../utils/MetamaskPago")

const PagoRouter = require("express").Router();

PagoRouter.post("/create_preference",PagoconMercadopago)
PagoRouter.post("/feedbackmercadopago/:email",FeedbackMercadoPago)
PagoRouter.post("/feedbackmetamask",FeedbackMetamask) 
//PagoRouter.post("/feedbackmetamask/:email",FeedbackMetamask)

// cree una carpeta llamada utils, supongo que ahí se deben añadir las utilidades externas a la pagina
// como pagos etc .
module.exports = PagoRouter;
