//Router
const favoriteRouter = require("express").Router();

//controllers
const { getFavorite } = require("../controllers/Favorite/getFavorite");
const { postFavorite } = require("../controllers/Favorite/postFavorite");
const { deleteFavorite } = require("../controllers/Favorite/deleteFavorite");
const { isFavorite } = require("../controllers/Favorite/isFavorite");

favoriteRouter.get("/:userId", getFavorite);

favoriteRouter.get("/", isFavorite);

favoriteRouter.post("/", postFavorite);

favoriteRouter.delete("/", deleteFavorite);

module.exports = favoriteRouter;