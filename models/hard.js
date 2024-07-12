const Sequelize = require('sequelize');

class Hard extends Sequelize.Model { 
  static initiate(sequelize) { 
    Hard.init({
      id: {
        type: Sequelize.BIGINT(20), 
        primaryKey: true,
        allowNull: false,
      },
      long_url: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      short_url: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false, 
      underscored: false,
      paranoid: false, 
			modelName: 'Hard',
      tableName: 'hard', 
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  }
};

module.exports = Hard;