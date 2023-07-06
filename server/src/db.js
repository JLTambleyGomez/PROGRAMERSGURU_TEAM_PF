require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/railway`,
    {
        logging: false,
        native: false,
    }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
    .filter(
        (file) =>
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
    )
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, "/models", file)));
    });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Course, Technology, Comment, Product, Payment } =
    sequelize.models; //Sequaliza los modelos > ejemplo

// Aca vendrian las relaciones
Course.belongsToMany(User, { through: "Favorite", timestamps: false });
User.belongsToMany(Course, { through: "Favorite", timestamps: false });

Course.belongsToMany(Technology, {
    through: "technology_course",
    timestamps: false,
});
Technology.belongsToMany(Course, {
    through: "technology_course",
    timestamps: false,
});

Product.belongsToMany(Payment, { through: "shopping_cart", timestamps: false });
Payment.belongsToMany(Product, { through: "shopping_cart", timestamps: false });

User.hasMany(Comment);
Comment.belongsTo(User);

Course.hasMany(Comment);
Comment.belongsTo(Course);

User.hasMany(Payment);
Payment.belongsTo(User);

module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
