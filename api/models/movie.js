module.exports = (sequelize, DataTypes) => {
  const movie = sequelize.define('movie', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    rate: DataTypes.FLOAT,
    date: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    synopsis: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    teaserUrl: DataTypes.STRING,
    nationality: DataTypes.STRING,
  }, {});
  movie.associate = function (models) {
    movie.belongsTo(models.user, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    movie.hasMany(models.review);
    movie.belongsToMany(models.professional, { through: 'movieProfessional', as: 'professionals' });
  };
  return movie;
};
