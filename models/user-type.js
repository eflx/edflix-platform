'use strict';

module.exports = (sequelize, DataTypes) => {
  const userTypeSchema = {
    name: DataTypes.STRING
  };

  const UserType = sequelize.define('UserType', userTypeSchema, { tableName: "user_types" });

  UserType.associate = function(models) {
    UserType.belongsToMany(models.User, { through: "user_types_users", as: "users", foreignKey: "user_id" });
  };
  
  return UserType;
};
