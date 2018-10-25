'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('item_tags', {
      item_id: { type: Sequelize.INTEGER, allowNull: false },
      subject_id: { type: Sequelize.INTEGER, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('item_tags');
  }
};
