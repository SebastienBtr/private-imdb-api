module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addIndex('movieProfessionals', ['movieId', 'professionalId', 'role'], {
    indexName: 'unique_relation',
    indicesType: 'UNIQUE',
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('movieProfessionals'),
};
