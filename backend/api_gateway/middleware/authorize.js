module.exports = function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
      if (!req.user) return res.status(401).json({ message: 'Não autenticado' });
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Permissão negada' });
      }
      next();
    };
};
  