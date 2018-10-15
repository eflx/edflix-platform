'use strict';
module.exports = (sequelize, DataTypes) => {
  const userSchema = {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  };

  const User = sequelize.define('User', userSchema, {});

  User.associate = function(models) {
    User.hasMany(models.Collection);
  };
  
  return User;
};
