module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
  }, {});

  user.associate = function (models) {
    user.hasMany(models.movie);
    user.hasMany(models.review);
  };

  return user;
};
