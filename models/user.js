'use strict';

//const Collection = require("./collection");

module.exports = (sequelize, DataTypes) => {
  const userSchema = {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  };

  const User = sequelize.define('User', userSchema, { tableName: "users" });

  User.associate = function(models) {
    User.hasMany(models.Collection);

    User.belongsToMany(models.UserType, { through: "user_types_users", as: "userTypes", foreignKey: "user_type_id" });
    User.belongsToMany(models.Subject, { through: "user_subjects", as: "subjects", foreignKey: "subject_id" });
    User.belongsToMany(models.Item, { through: "user_items", as: "items", foreignKey: "item_id" });
  };

  User.prototype.addCollection = async function(title) {
    var collection = await sequelize.models.Collection.create({title: title, user_id: this.id});

    return collection;
  };

  return User;
};
