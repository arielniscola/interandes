"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize = new sequelize_1.Sequelize(``, {
    logging: false,
    native: false,
});
const basename = path_1.default.basename(__filename);
const modelDefiners = [];
fs_1.default.readdirSync(path_1.default.join(__dirname, "/models"))
    .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
    .forEach((file) => {
    modelDefiners.push(require(path_1.default.join(__dirname, "/models", file)));
});
modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
const {} = sequelize.models;
//relations
exports.default = Object.assign(Object.assign({}, sequelize.models), { conn: sequelize });
