'use strict';

module.exports = (sequelize, DataTypes) => {
  const userItemSchema = {
    //user_id: DataTypes.INTEGER,
    //item_id: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    rating: DataTypes.INTEGER
  };

  const UserItem = sequelize.define('UserItem', userItemSchema, {tableName: "user_items", underscored: true});

  UserItem.associate = function(models) {
    // associations can be defined here
    models.User.belongsToMany(models.Item, {through: UserItem});
    models.Item.belongsToMany(models.User, {through: UserItem});
  };

  return UserItem;
};
