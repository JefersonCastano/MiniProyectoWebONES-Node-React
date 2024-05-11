
const authorizeCoordinador = function(req, res, next) {
    const { role } = req.user;
  
    if (role !== 'coordinador') {
      return res.status(401).send('Not allowed');
    }
  
    return next();
};

module.exports = authorizeCoordinador;