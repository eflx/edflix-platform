'use strict';

module.exports = (sequelize, DataTypes) => {
  const userSchema = {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  };

  const User = sequelize.define('User', userSchema, {tableName: "users", underscored: true});

  User.associate = function(models) {
    User.hasMany(models.Collection);

    //User.belongsToMany(models.UserType, { through: "user_types_users", as: "userTypes", foreignKey: "user_type_id" });
    //User.belongsToMany(models.Subject, { through: "user_subjects", as: "subjects", foreignKey: "subject_id" });
    User.belongsToMany(models.Item, {through: models.UserItem});
  };

  User.prototype.addCollection = async function(title) {
    var collection = await sequelize.models.Collection.create({title: title, user_id: this.id});

    return collection;
  };

  User.prototype.items = async function() {
    var userItems = await this.getItems({
      attributes: ["title", "url"]
      // find a way to get comment and rating too
    });

    return userItems;
  };

  return User;
};
