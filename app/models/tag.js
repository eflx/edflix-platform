'use strict';

module.exports = (sequelize, DataTypes) => {
  const tagSchema = {
    name: DataTypes.STRING
  };

  const Tag = sequelize.define('Tag', tagSchema, { tableName: "tags" });

  Tag.associate = function(models) {
    Tag.belongsToMany(models.Item, { through: "items_tags", as: "items", foreignKey: "item_id" });
  };

  return Tag;
};
