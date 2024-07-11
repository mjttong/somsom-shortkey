const Sequelize = require('sequelize');

class Url extends Sequelize.Model { 
  static initiate(sequelize) { 
    Url.init({
      long_url: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      short_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: false, 
      underscored: false,
      paranoid: false, 
			modelName: 'Url',
      tableName: 'url', 
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  }
};

module.exports = Url;