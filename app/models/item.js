'use strict';

module.exports = (sequelize, DataTypes) => {
  const itemSchema = {
    title: DataTypes.STRING,
    url: DataTypes.STRING
  };

  const Item = sequelize.define('Item', itemSchema, {tableName: "items", underscored: true});

  Item.associate = function(models) {
    Item.belongsToMany(models.User, {through: models.UserItem});
    //Item.belongsToMany(models.Collection, { through: "collection_items", as: "collection", foreignKey: "collection_id" });
    //Item.belongsToMany(models.Tag, { through: "item_tags", as: "tags", foreignKey: "tag_id" });
  };

  Item.exists = async url => {
    var item = await Item.findOne({
      where: {url: url}
    });

    return item; // false-y if item doesn't exist
  };

  return Item;
};
