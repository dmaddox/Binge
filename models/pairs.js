module.exports = function(sequelize, DataTypes) {
  var Pairs = sequelize.define("Pairs", {
    pair_id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true,
      primaryKey: true
    },
    media_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    media_title: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    food_name: DataTypes.STRING,
    recipe_url: DataTypes.STRING(512),
    playlist_url: DataTypes.STRING(512),
    drink_name: DataTypes.STRING,
    drink_url: DataTypes.STRING(512),
    user_name: DataTypes.STRING,
    // user_id: DataTypes.INTEGER,
    pairing_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
      },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, 
  {underscored: true}
  );

  Pairs.associate = function(models) {
    // We're saying that a Pairs should belong to a User
    // A Pair can't be created without an User due to the foreign key constraint
    Pairs.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Pairs;

};
