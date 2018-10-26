'use strict';

module.exports = (sequelize, DataTypes) => {
  const collectionItemSchema = {
    collection_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER
  };

  const CollectionItem = sequelize.define('CollectionItem', collectionItemSchema, { tableName: "collection_items" });

  CollectionItem.associate = function(models) {
    // associations can be defined here
  };

  return CollectionItem;
};
