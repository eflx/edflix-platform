'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('collection_items', {
      collection_id: { type: Sequelize.INTEGER, allowNull: false },
      item_id: { type: Sequelize.INTEGER, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('collection_items');
  }
};
