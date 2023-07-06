require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require('fs');
const path = require('path');
// Esto es para importar las variables del archivo .env, descomentar si funciona tambien para el equipo.
// require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;
//__________________________________________________

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/railway`, {
  logging: false,
  native: false,
});
const basename = path.basename(__filename);


// Extrae archivos de "models" y los agrega al array:
const modelDefiners = [];
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });
// Pasa la instancia de sequelize a cada modelo:
modelDefiners.forEach(model => model(sequelize));
// Capitaliza el nombre de los modelos:
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


// Todos los modelos:
const { User, Course, Category, Comment, Subscription, Product } = sequelize.models;  //Sequaliza los modelos > ejemplo

// Aca vendrian las relaciones
Course.belongsToMany(User, { through: "Favorite", timestamps: false });
User.belongsToMany(Course, { through: "Favorite", timestamps: false });

Course.belongsToMany(Category, { through: "category_course", timestamps: false });
Category.belongsToMany(Course, { through: "category_course", timestamps: false });

User.hasMany(Comment);
Comment.belongsTo(User);

Course.hasMany(Comment);
Comment.belongsTo(Course);

User.hasMany(Subscription);
Subscription.belongsTo(User);

Product.belongsToMany(User, { through: "user_product", timestamps: false });
User.belongsToMany(Product, { through: "user_product", timestamps: false });


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};