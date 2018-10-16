'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSubject = sequelize.define('UserSubject', {
    user_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER
  }, {});
  UserSubject.associate = function(models) {
    // associations can be defined here
  };
  return UserSubject;
};