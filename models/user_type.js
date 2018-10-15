'use strict';

module.exports = (sequelize, DataTypes) => {
  const userTypeSchema = {
    name: DataTypes.STRING
  };

  const UserType = sequelize.define('user_types', userTypeSchema, {});

  UserType.associate = function(models) {
    // associations can be defined here
  };
  
  return UserType;
};
