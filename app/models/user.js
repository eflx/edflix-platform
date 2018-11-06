'use strict';

module.exports = (sequelize, DataTypes) => {
  const userSchema = {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    external_id: DataTypes.STRING, // id from an identity provider, like Google.
    // the format of this field is <id-provider>-<id>, e.g. google-1234567
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

  // class methods
  User.findByExternalId = async function(externalId, options) {
    var user = await sequelize.models.User.findOne(Object.assign({where: {external_id: externalId}}, options));

    return user;
  };

  // instance methods
  User.prototype.addCollection = async function(title) {
    var collection = await sequelize.models.Collection.create({title: title, user_id: this.id});

    return collection;
  };

  return User;
};
