
const authorizeCoordinador = function(req, res, next) {
    const { role } = req.user;
  
    if (role !== 'coordinator') {
      return res.status(401).send('Not allowed');
    }
  
    return next();
};

module.exports = authorizeCoordinador;