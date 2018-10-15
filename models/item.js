'use strict';

module.exports = (sequelize, DataTypes) => {
  const itemSchema = {
    title: DataTypes.STRING,
    url: DataTypes.STRING
  };

  const Item = sequelize.define('items', itemSchema, {});

  Item.associate = function(models) {
    Item.belongsToMany(models.Collection, { through: "collections_items", as: "collection", foreignKey: "collection_id" });
  };

  return Item;
};
