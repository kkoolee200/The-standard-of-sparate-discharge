const Sequelize = require('sequelize');
// const User = require('./user');
const Battery = require('./battery');
const Cloth = require('./cloth');
const Item = require('./item');
const Medi = require('./medi');
const Method = require('./method');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

// Sequelize 인스턴스의 define 속성에 timestamps 옵션 설정
sequelize.options.define.timestamps = true;

const db = {
    sequelize,
    // User,
    Battery,
    Cloth,
    Item,
    Medi,
    Method
};

// User.init(sequelize);
Battery.init(sequelize);
Cloth.init(sequelize);
Item.init(sequelize);
Medi.init(sequelize);
Method.init(sequelize);

// User.associate(db);

module.exports = db;