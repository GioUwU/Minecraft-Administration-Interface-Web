require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_NAME } = process.env;

const validacion = () => {
  if (!MYSQL_USER || !MYSQL_PASSWORD || !MYSQL_HOST || !MYSQL_NAME) {
    return false;
  } else {
    return true;
  }
};

const sequelize = new Sequelize(MYSQL_NAME, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  dialect: "mysql",
  logging: false,
  native: false,
});

(async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
  
  }
})();

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
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

const { } = sequelize.models;
console.log(sequelize.models);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
  validacion: validacion(),
};
