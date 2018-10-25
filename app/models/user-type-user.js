'use strict';

module.exports = (sequelize, DataTypes) => {
  const userTypeUserSchema = {
    user_type_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  };

  const UserTypeUser = sequelize.define('UserTypeUser', userTypeUserSchema, { tableName: "user_types_users" });

  UserTypeUser.associate = function(models) {
  };

  return UserTypeUser;
};
