require('dotenv').config();
const dbConfig = require("../config/config");
const Sequelize = require("sequelize");
const NODE_ENV = process.env.NODE_ENV || "development";
const sequelize = new Sequelize(dbConfig[NODE_ENV].database, dbConfig[NODE_ENV].username, dbConfig[NODE_ENV].password, {
    host: dbConfig[NODE_ENV].host,
    dialect: dbConfig[NODE_ENV].dialect,
    timezone: dbConfig[NODE_ENV].timezone,
    pool: {
        max: dbConfig[NODE_ENV].pool.max,
        min: dbConfig[NODE_ENV].pool.min,
        acquire: dbConfig[NODE_ENV].pool.acquire,
        idle: dbConfig[NODE_ENV].pool.idle,
    },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require("./User")(sequelize, Sequelize);
db.Product = require("./Product")(sequelize, Sequelize);

// db.UserGift.belongsToMany(db.UserGift, {
//     through: db.User,
//     foreignKey: 'user_id',
//     as: '_user_gifts'
// })


module.exports = db;