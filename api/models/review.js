module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define('review', {
    rate: DataTypes.FLOAT,
    review: DataTypes.TEXT,
  }, {});
  review.associate = function (models) {
    review.belongsTo(models.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    review.belongsTo(models.movie, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  };
  return review;
};
