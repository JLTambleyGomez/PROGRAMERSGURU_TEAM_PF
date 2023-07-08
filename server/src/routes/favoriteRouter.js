//Router
const favoriteRouter = require("express").Router();

//controllers
const { getFavorite } = require("../controllers/Favorite/getFavorite");
const { postFavorite } = require("../controllers/Favorite/postFavorite");
const { deleteFavorite } = require("../controllers/Favorite/deleteFavorite");

favoriteRouter.get("/:idUser", getFavorite);

favoriteRouter.post("/", postFavorite);

favoriteRouter.delete("/:idCourse", deleteFavorite);

module.exports = favoriteRouter;