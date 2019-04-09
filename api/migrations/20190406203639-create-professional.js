module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('professionals', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    profilePicture: {
      type: Sequelize.STRING,
    },
    birthDate: {
      type: Sequelize.DATE,
    },
    nationality: {
      type: Sequelize.STRING,
    },
    job: {
      type: Sequelize.STRING,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'),
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('professionals'),
};
