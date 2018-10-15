'use strict';

module.exports = (sequelize, DataTypes) => {
  const tagSchema = {
    name: DataTypes.STRING
  };

  const Tag = sequelize.define('Tag', tagSchema, { tableName: "tags" });

  Tag.associate = function(models) {
    // associations can be defined here
  };

  return Tag;
};
