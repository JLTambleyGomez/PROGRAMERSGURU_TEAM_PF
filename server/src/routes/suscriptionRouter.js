const {
    deleteSuscription,
} = require("../controllers/Subscription/deleteSuscription");
const {
    getAllSubscriptions,
} = require("../controllers/Subscription/getAllSubscriptions");
const {
    postSubscription,
} = require("../controllers/Subscription/postSubscription");
const {
    putSubscription,
} = require("../controllers/Subscription/putSubscription");

//Router
const suscriptionRouter = require("express").Router();

suscriptionRouter.get("/", getAllSubscriptions);

suscriptionRouter.put("/:id", putSubscription);

suscriptionRouter.delete("/:id", deleteSuscription);

suscriptionRouter.post("/", postSubscription);

module.exports = suscriptionRouter;
