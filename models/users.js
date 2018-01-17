var bcrypt   = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },   
    last_login: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }
  }, 
    {underscored: true}
  );

  Users.associate = function(models) {
    // Associating Users with Pairs
    // When an Users is deleted, also delete any associated Pairs
    Users.hasMany(models.Pairs);
  };

  return Users;

};
