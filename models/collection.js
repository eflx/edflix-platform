'use strict';

module.exports = (sequelize, DataTypes) => {
  const collectionSchema = {
    title: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  };

  const Collection = sequelize.define('collections', collectionSchema, { tableName: "collections" });

  Collection.associate = function(models) {
    Collection.belongsTo(models.User);

    Collection.belongsToMany(models.Item, { through: models.CollectionItem, as: "items", foreignKey: "item_id" });
  };

  return Collection;
};