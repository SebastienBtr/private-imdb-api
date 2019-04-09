module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addIndex('professionals', ['firstname', 'lastname'], {
    indexName: 'unique_name',
    indicesType: 'UNIQUE',
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('professionals'),
};
