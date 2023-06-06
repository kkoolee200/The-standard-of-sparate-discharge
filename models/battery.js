const Sequelize = require('sequelize');

module.exports = class Battery extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            no: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            city: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            district: {
                type: Sequelize.STRING(6),
                allowNull: false
            },
            town: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            loca: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            place: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            detail: {
                type: Sequelize.STRING(100),
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
            },
            box: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            person: {
                type: Sequelize.STRING(8),
                allowNull: false
            },
            manage: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            phone: {
                type: Sequelize.STRING(24),
                allowNull: false
            }           
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Battery',
            tableName: 'batterys',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
};
