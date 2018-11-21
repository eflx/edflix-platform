'use strict';

module.exports = (sequelize, DataTypes) => {
  const itemSchema = {
    title: DataTypes.STRING,
    url: DataTypes.STRING
  };

  const Item = sequelize.define('Item', itemSchema, {tableName: "items", underscored: true});

  Item.associate = function(models) {
  };

  Item.exists = async url => {
    var item = await Item.findOne({
      where: {url: url}
    });

    return item; // false-y if item doesn't exist
  };

  return Item;
};
