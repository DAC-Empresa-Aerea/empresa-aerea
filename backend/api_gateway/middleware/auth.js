//refazer esse arquivo usando o auth posteriomente
const jwt = require('jsonwebtoken');
require('dotenv-safe').config();

module.exports = function verifyJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Ex: "Bearer token"

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    req.user = decoded;
    next();
  });
};