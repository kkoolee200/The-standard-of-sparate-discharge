const Sequelize = require('sequelize');

module.exports = class Cloth extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            no: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            place: {
                type: Sequelize.STRING(6),
                allowNull: false
            },
            local: {
                type: Sequelize.STRING(40),
                allowNull: false
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
            modelName: 'Cloth',
            tableName: 'clothes',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
};
