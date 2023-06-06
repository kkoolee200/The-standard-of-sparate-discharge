const Sequelize = require('sequelize');

module.exports = class Medi extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            no: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            place: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            local: {
                type: Sequelize.STRING(40),
                allowNull: false
            },
            datail: {
                type: Sequelize.STRING(60),
                allowNull: false
            },
            phone: {
                type: Sequelize.STRING(24),
                allowNull: true
            },
            etc: {
                type: Sequelize.STRING(40),
                allowNull: true
            },
            full_Address: {
                type: Sequelize.STRING(),
                allowNull: true
            },
            lat: {
                type: Sequelize.DECIMAL,
                allowNull: false
            },
            lon: {
                type: Sequelize.DECIMAL,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Medi',
            tableName: 'medis',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
};
