const { Sequelize } = require("sequelize");
const { DataTypes } = require("sequelize");

const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "./.env") }); // para recibir las constantes de .env
const { DB_USER, DB_PASSWORD, DB_DEPLOY } = process.env;

// const sequelize = new Sequelize(
//     `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/railway`,
//     {
//         logging: false,
//         native: false,
//     }
// );
// DEPLOYMENT:
const sequelize = new Sequelize(
         DB_DEPLOY,    {
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

const { User, Course, Technology, Comment, Product, Payment, Subscription, Category} =
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

const shopping_cart = sequelize.define(
    "shopping_cart",
    {
        quantity: {
            type: DataTypes.INTEGER,
        },
    },
    { timestamps: false, freezeTableName: true }
);
Product.belongsToMany(Payment, { through: shopping_cart, timestamps: false });
Payment.belongsToMany(Product, { through: shopping_cart, timestamps: false });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

Course.hasMany(Comment, { foreignKey: "courseId" });
Comment.belongsTo(Course, { foreignKey: "courseId" });

Category.hasMany(Product,{ foreignKey: "categoryId" })
Product.belongsTo(Category,{ foreignKey: "categoryId" })

User.hasMany(Payment, { foreignKey: "userId" });
Payment.belongsTo(User, { foreignKey: "userId" });

Subscription.hasMany(Payment, { foreignKey: "subscriptionId" });
Payment.belongsTo(Subscription, { foreignKey: "subscriptionId" });

module.exports = {
    ...sequelize.models,
    conn: sequelize, 
};
