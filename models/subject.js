'use strict';

module.exports = (sequelize, DataTypes) => {
  const subjectSchema = {
    name: DataTypes.STRING
  };

  const Subject = sequelize.define('Subject', subjectSchema, { tableName: "subjects" });

  Subject.associate = function(models) {
    Subject.belongsToMany(models.User, { through: "user_subjects", as: "users", foreignKey: "user_id" });
  };

  return Subject;
};
