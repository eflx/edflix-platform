'use strict';
module.exports = (sequelize, DataTypes) => {
  const userSchema = {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  };

  const User = sequelize.define('User', userSchema, { tableName: "users" });

  User.associate = function(models) {
    User.hasMany(models.Collection);
    User.belongsToMany(models.UserType, { through: "user_types_users", as: "userTypes", foreignKey: "user_type_id" });
  };
  
  return User;
};
