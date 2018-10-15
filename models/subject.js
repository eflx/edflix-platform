'use strict';

module.exports = (sequelize, DataTypes) => {
  const subjectSchema = {
    name: DataTypes.STRING
  };

  const Tag = sequelize.define('Subject', tagSchema, { tableName: "subjects" });

  Subject.associate = function(models) {
    // associations can be defined here
  };

  return Subject;
};
