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
    };

    const isNumeric = value => !isNaN(value);

    const isEmail = email => {
        // regex for email taken from
        //   https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email);
    };

    // class methods
    User.findByEmail = async function(email, options) {
        var user = await sequelize.models.User.findOne(Object.assign({where: {email: email}}, options));

        return user;
    };
    
    User.findByExternalId = async function(externalId, options) {
        var user = await sequelize.models.User.findOne(Object.assign({where: {external_id: externalId}}, options));

        return user;
    };

    User.find = async function(id, options) {
        if (isNumeric(id))
        {
            return await sequelize.models.User.findById(id, options);
        }

        if (isEmail(id))
        {
            return await sequelize.models.User.findByEmail(id, options);
        }

        return await sequelize.models.User.findByExternalId(id, options);
    };

    return User;
};
