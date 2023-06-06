const Sequelize = require('sequelize');

module.exports = class Method extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      clas_num: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        primaryKey: true
      },
      clas: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      method: {
        type: Sequelize.STRING(200),
        allowNull: false
      }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Method',
      tableName: 'methods',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
};
