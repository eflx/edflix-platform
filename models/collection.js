'use strict';

module.exports = (sequelize, DataTypes) => {
  const collectionSchema = {
    title: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  };

  const Collection = sequelize.define('Collection', collectionSchema, { tableName: "collections" });

  Collection.associate = function(models) {
    Collection.belongsTo(models.User, { as: "user" });

    Collection.belongsToMany(models.Item, { through: "collection_items", as: "items", foreignKey: "item_id" });
  };

  return Collection;
};
