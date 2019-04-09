module.exports = (sequelize, DataTypes) => {
  const professional = sequelize.define('professional', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    nationality: DataTypes.STRING,
    job: DataTypes.STRING,
  }, {
    indexes: [
      {
        unique: true,
        fields: ['firstname', 'lastname'],
      },
    ],
  });
  professional.associate = function (models) {
    professional.belongsToMany(models.movie, { through: 'movieProfessional', as: 'movies' });
  };
  return professional;
};
