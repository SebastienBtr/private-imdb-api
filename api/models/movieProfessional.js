module.exports = (sequelize, DataTypes) => {
  const movieProfessional = sequelize.define('movieProfessional', {
    role: DataTypes.STRING,
  }, {
    indexes: [
      {
        unique: true,
        fields: ['movieId', 'professionalId', 'role'],
      },
    ],
  });
  movieProfessional.associate = function (models) {
    movieProfessional.belongsTo(models.professional, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    movieProfessional.belongsTo(models.movie, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  };
  return movieProfessional;
};
