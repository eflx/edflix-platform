'use strict';

module.exports = (sequelize, DataTypes) => {
  const itemSchema = {
    title: DataTypes.STRING,
    url: DataTypes.STRING
  };

  const Item = sequelize.define('Item', itemSchema, { tableName: "items" });

  Item.associate = function(models) {
    Item.belongsToMany(models.User, { through: "user_items", as: "users", foreignKey: "user_id" });
    Item.belongsToMany(models.Collection, { through: "collection_items", as: "collection", foreignKey: "collection_id" });
    Item.belongsToMany(models.Tag, { through: "item_tags", as: "tags", foreignKey: "tag_id" });
  };

  return Item;
};
