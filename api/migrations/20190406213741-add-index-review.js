module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addIndex('reviews', ['movieId', 'userId'], {
    indexName: 'unique_review',
    indicesType: 'UNIQUE',
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('reviews'),
};
