'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_items', {
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      item_id: { type: Sequelize.INTEGER, allowNull: false },
      comment: { type: Sequelize.STRING },
      rating: { type: Sequelize.INTEGER },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_items');
  }
};
