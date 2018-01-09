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
  });


  // Instance Method - 1st try
  Users.prototype.generateHash = function(password) {
    console.log("generating hash");
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  Users.prototype.validPassword = function(userpass, password) {
    console.log("validPassword() is running");
      return bcrypt.compareSync(password, userpass);
  };

  return Users;

};
