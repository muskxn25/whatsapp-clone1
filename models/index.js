const config = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.db, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
  operatorsAliases: false,
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user_model = require("./user.modal")(sequelize, Sequelize);
db.chat_model = require("./messages.modal")(sequelize, Sequelize);

module.exports = db;
