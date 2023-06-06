const Sequelize = require('sequelize');

module.exports = class Item extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            no: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(40),
                allowNull: false
            },
            clas: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            clas_num: {
                type: Sequelize.NUMERIC,
                allowNull: false
            },
            method: {
                type: Sequelize.STRING(300),
                allowNull: false
            },
            etc: {
                type: Sequelize.STRING(200),
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Item',
            tableName: 'items',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    // static associate(db) {
    //   db.Comment.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
    // }
};
