const { User } = require('../db');
const{ Op } = require("sequelize");

const get_user_by_email = (email) => {
    const user = User.findOne({
        where: {
            email: email
        }
    })
    return user;
}

module.exports = {
    get_user_by_email
}