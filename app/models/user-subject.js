'use strict';

module.exports = (sequelize, DataTypes) => {
  const userSubjectSchema = {
    user_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER
  };

  const UserSubject = sequelize.define('UserSubject', userSubjectSchema, { tableName: "user_subjects" });
  
  UserSubject.associate = function(models) {
    // associations can be defined here
  };

  return UserSubject;
};
