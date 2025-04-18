require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token não fornecido' });

  const [scheme, token] = authHeader.split(' ');
  if (!/^Bearer$/i.test(scheme) || !token) {
    return res.status(401).json({ message: 'Formato de token inválido' });
  }

  jwt.verify(token, process.env.SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido ou expirado' });
    }
    req.user = { login: payload.sub, role: payload.role };
    next();
  });
};
