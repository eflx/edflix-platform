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

  const isNumeric = value => !isNaN(value);

  // class methods
  User.findByExternalId = async function(externalId, options) {
    var user = await sequelize.models.User.findOne(Object.assign({where: {external_id: externalId}}, options));

    return user;
  };

  User.find = async function(id, options) {
    return isNumeric(id) ?
        await sequelize.models.User.findById(id, options) :
        await sequelize.models.User.findByExternalId(id, options);
  };

  // instance methods
  User.prototype.addCollection = async function(title) {
    var collection = await sequelize.models.Collection.create({title: title, user_id: this.id});

    return collection;
  };

  User.prototype.associateItem = async function(item, comment, rating) {
    await sequelize.models.UserItem.create({
      user_id: this.id,
      item_id: item.id,
      rating: rating,
      comment: comment
    });
  };

  User.prototype.addItem = async function(title, url, options) {
    // TODO: Check if an item with that URL already exists in the database.
    // If so, check to see if the *user* already has that item. If *that's*
    // true too, we're done. If not we need to manage the user and item
    // association in the database
    /*
    var item = await sequelize.models.Item.exists(url);

    if (item)
    {
      if (this.hasItem(item))
      {
        return item;
      }
    }
    else
    {
      // create the item...
      var item = await sequelize.models.Item.create({
        title: title,
        url: url
      });
    }
    */

    // create the item...
    var newItem = await sequelize.models.Item.create({
      title: title,
      url: url
    });
    
    // ..., then associate the item with this user
    await this.associateItem(newItem, options.comment || "", options.rating || 1);

    return newItem;
  };

  return User;
};
