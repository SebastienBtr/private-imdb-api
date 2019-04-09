const funct = require('../utils/commonFunctions.js');
const professionalsSrv = require('../services/professionals.srv.js');

/**
 * Create a professional
 * @see PUT /professionals/create-professional
 */
module.exports.createProfessional = (req, res) => {
  const { professional } = req.body;

  if (funct.checkParams(res, professional, professional.firstname, professional.lastname)) {
    professionalsSrv.create(professional, (rows) => {
      res.status(200).send(rows);
    }, (error) => {
      funct.errorFunct('professionalsSrv.create', error, res);
    });
  }
};

/**
 * Update a professional
 * @see PUT /professional/update-professional
 */
module.exports.updateProfessional = (req, res) => {
  const { professional } = req.body;

  if (funct.checkParams(res, professional, professional.id,
    professional.firstname, professional.lastname)) {
    professionalsSrv.update(professional, () => {
      res.status(200).end();
    }, (error) => {
      funct.errorFunct('professionalsSrv.update', error, res);
    });
  }
};

/**
 * Get a professional by id
 * @see GET /professionals/:id
 */
module.exports.getProfessionalById = (req, res) => {
  const { id } = req.params;

  if (funct.checkParams(res, id)) {
    professionalsSrv.findById(id, (professional) => {
      res.status(200).send(professional);
    }, (error) => {
      funct.errorFunct('professionalsSrv.findById', error, res);
    });
  }
};

/**
 * Get a professional by id with all associations
 * @see GET /professionals/with-details/:id
 */
module.exports.getProfessionalByIdWithAssociations = (req, res) => {
  const { id } = req.params;

  if (funct.checkParams(res, id)) {
    professionalsSrv.findByIdWithAssociations(id, (professional) => {
      res.status(200).send(professional);
    }, (error) => {
      funct.errorFunct('professionalsSrv.findByIdWithAssociations', error, res);
    });
  }
};

/**
 * Get a professional by name
 * @see GET /professionals/name/:name
 */
module.exports.getProfessionalByName = (req, res) => {
  const { name } = req.params;

  if (funct.checkParams(res, name)) {
    professionalsSrv.findByName(name, (professional) => {
      res.status(200).send(professional);
    }, (error) => {
      funct.errorFunct('professionalsSrv.findByName', error, res);
    });
  }
};

/**
 * Delete a professional by id
 * @see DELETE /professionals/:id
 */
module.exports.deleteProfessionalById = (req, res) => {
  const { id } = req.params;

  if (funct.checkParams(res, id)) {
    professionalsSrv.deleteById(id, () => {
      res.status(200).end();
    }, (error) => {
      funct.errorFunct('professionalsSrv.deleteById', error, res);
    });
  }
};
