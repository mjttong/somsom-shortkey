const Sequelize = require('sequelize');
const env = 'development'; // .env를 사용하지 않음
const config = require('../config/config.json')[env];
const Url = require('./url');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

db.Url = Url;
Url.initiate(sequelize);

module.exports = db;