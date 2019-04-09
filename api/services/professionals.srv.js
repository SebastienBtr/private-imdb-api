const Sequelize = require('sequelize');
const models = require('../models');

const Professional = models.professional;

/**
 * Create a professional:
 * Check if the firstname and lastname are unique
 * Insert the professional in the db
 * @param professional the professional data to insert in the db
 * @callback success return an object with the professional inserted id
 * @callback error executed if the name is not unique
 */
module.exports.create = (professional, success, error) => {
  this.uniqueName(professional.firstname, professional.lastname, (unique) => {
    if (unique) {
      const birthDate = professional.birthDate ? new Date(professional.birthDate) : null;
      Professional.create({
        firstname: professional.firstname,
        lastname: professional.lastname,
        profilePicture: professional.profilePicture,
        birthDate,
        nationality: professional.nationality,
        job: professional.job,
      }).then((result) => {
        success({ insertId: result.id });
      }).catch((err) => {
        error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
      });
    } else {
      error({ message: 'ERRORS.NAME_NOT_UNIQUE', status: 412 });
    }
  }, (err) => {
    error(err);
  });
};

/**
 * Update a professional:
 * Check if the new professional name is unique
 * Update the professional in the db
 * @param professional the professional data to update
 * @callback success
 * @callback error executed if the name is not unique
 */
module.exports.update = (professional, success, error) => {
  this.uniqueUpdatedName(professional.firstname, professional.lastname, professional.id,
    (unique) => {
      if (unique) {
        const birthDate = professional.birthDate ? new Date(professional.birthDate) : null;
        Professional.update({
          firstname: professional.firstname,
          lastname: professional.lastname,
          profilePicture: professional.profilePicture,
          birthDate,
          nationality: professional.nationality,
          job: professional.job,
        }, { where: { id: professional.id } }).then(() => {
          success();
        }).catch((err) => {
          error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
        });
      } else {
        error({ message: 'ERRORS.NAME_NOT_UNIQUE', status: 412 });
      }
    }, (err) => {
      error(err);
    });
};

/**
 * Check if a professional name is already present in the professional table
 * @param firstname the firstname to test
 * @param lastname the lastname to test
 * @callback success return true if the name is unique false otherwise
 * @callback error
 */
module.exports.uniqueName = (firstname, lastname, success, error) => {
  const name = `${firstname} ${lastname}`;

  this.findByName(name, () => {
    success(false);
  }, (err) => {
    if (err.status === 204) {
      success(true);
    } else {
      error(err);
    }
  });
};

/**
 * Check if the new name of a professional (when we update it) is already present
 * @param firstname the firstname to test
 * @param lastname the lastname to test
 * @param professionalId the professional that we update
 * @callback success return true if the name is unique false otherwise
 * @callback error
 */
module.exports.uniqueUpdatedName = (firstname, lastname, professionalId, success, error) => {
  const name = `${firstname} ${lastname}`;

  this.findByName(name, (professional) => {
    const unique = professional.id === professionalId;
    success(unique);
  }, (err) => {
    if (err.status === 204) {
      success(true);
    } else {
      error(err);
    }
  });
};

/**
 * Find a professional by name
 * @param name the name of the professional to find
 * @callback success return the professional
 * @callback error executed if the professional is not found
 */
module.exports.findByName = (name, success, error) => {
  Professional.findOne({
    where: Sequelize.where(
      Sequelize.fn('lower', Sequelize.fn('concat', Sequelize.col('firstname'), ' ', Sequelize.col('lastname'))), {
        eq: name.toLowerCase(),
      },
    ),
  }).then((professional) => {
    if (professional) {
      success(professional);
    } else {
      error({ message: 'ERRORS.NO_PROFESSIONAL_FIND', status: 204 });
    }
  }).catch((err) => {
    error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
  });
};

/**
 * Find a professional by id
 * @param id the id of the professional to find
 * @callback success return the professional
 * @callback error executed if the professional is not found
 */
module.exports.findById = (id, success, error) => {
  Professional.findByPk(id).then((professional) => {
    if (professional) {
      success(professional);
    } else {
      error({ message: 'ERRORS.NO_PROFESSIONAL_FIND', status: 204 });
    }
  }).catch((err) => {
    error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
  });
};

/**
 * Find a professional by id
 * Select all professional fields
 * Include movies associations
 * @param id the id of the professional to find
 * @callback success return the professional
 * @callback error executed if the professional is not found
 */
module.exports.findByIdWithAssociations = (id, success, error) => {
  Professional.findByPk(id, {
    include: [
      { model: models.movie, as: 'movies' },
    ],
  }).then((professional) => {
    if (professional) {
      success(professional);
    } else {
      error({ message: 'ERRORS.NO_PROFESSIONAL_FIND', status: 204 });
    }
  }).catch((err) => {
    error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
  });
};

/**
 * Delete a professional by id
 * @param id the id of the professional to delete
 * @callback success
 * @callback error
 */
module.exports.deleteById = (id, success, error) => {
  Professional.destroy({ where: { id } }).then(() => {
    success();
  }).catch((err) => {
    error({ message: 'ERRORS.DATABASE_ERROR', error: err, status: 500 });
  });
};
