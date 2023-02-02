import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";

const sequelize = new Sequelize(``, {
  logging: false,
  native: false,
});

const basename = path.basename(__filename);

const modelDefiners: any = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model: any) => model(sequelize));

let entries = Object.entries(sequelize.models);

let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
(sequelize.models as any) = Object.fromEntries(capsEntries);

const {} = sequelize.models;

//relations

export default {
  ...sequelize.models,
  conn: sequelize,
};
