const funct = require('../utils/commonFunctions.js');
const movieProfessionalsSrv = require('../services/movieProfessionals.srv.js');

/**
 * Add relation between a movie and a professional
 * @see PUT /movie-professionals/add-relation
 */
module.exports.addMovieProfessional = (req, res) => {
  const { movieId } = req.body;
  const { professionalId } = req.body;
  const { role } = req.body;

  if (funct.checkParams(res, movieId, professionalId, role)) {
    movieProfessionalsSrv.create(movieId, professionalId, role, () => {
      res.status(200).end();
    }, (error) => {
      funct.errorFunct('movieProfessionalsSrv.create', error, res);
    });
  }
};

/**
 * Delete a relation between a movie and a professional
 * @see DELETE /movie-professionals/:movieId/:professionalId
 */
module.exports.deleteMovieProfessional = (req, res) => {
  const { movieId } = req.body;
  const { professionalId } = req.body;

  if (funct.checkParams(res, movieId, professionalId)) {
    movieProfessionalsSrv.delete(movieId, professionalId, () => {
      res.status(200).end();
    }, (error) => {
      funct.errorFunct('movieProfessionalsSrv.delete', error, res);
    });
  }
};
