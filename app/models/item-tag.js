'use strict';

module.exports = (sequelize, DataTypes) => {
  const itemTagSchema = {
    item_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  };

  const ItemTag = sequelize.define('ItemTag', itemTagSchema, { tableName: "item_tags" });

  ItemTag.associate = function(models) {
    // associations can be defined here
  };

  return ItemTag;
};
