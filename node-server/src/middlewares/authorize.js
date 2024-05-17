const messagesEs = require("../utils/messagesEs");

const authorizeCoordinador = function(req, res, next) {
    const { role } = req.user;
  
    if (role !== 'COORDINADOR') {
      return res.status(500).send({ status: "FAILED", data: { error: messagesEs.errors.NOT_ACCESS } });
    }
  
    return next();
};

module.exports = authorizeCoordinador;