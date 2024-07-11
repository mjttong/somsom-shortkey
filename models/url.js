const Sequelize = require('sequelize');

class Url extends Sequelize.Model { 
  static initiate(sequelize) { 
    Url.init({
      origin_url: {
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
			modelName: 'Url',
      tableName: 'url', 
      charset: 'uft8',
      collate: 'uft8_general_ci'
    });
  }
};

module.exports = Url;