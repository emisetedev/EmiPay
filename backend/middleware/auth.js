const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || req.headers.Authorization;
    if (!header) return res.status(401).json({ error: 'Token não fornecido' });

    const token = header.split(' ')[1] || header;
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.userId = decoded.userId;

    // Optional: load user to req.user
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(401).json({ error: 'Usuário inválido' });
    req.user = user;

    next();
  } catch (err) {
    console.error('Auth error', err.message);
    return res.status(401).json({ error: 'Autenticação inválida' });
  }
};

exports.adminAuth = (req, res, next) => {
  try {
    // auth middleware should have populated req.user
    if (!req.user) return res.status(401).json({ error: 'Token não fornecido ou inválido' });
    // check admin flag on user model
    if (!req.user.is_admin && !req.user.isAdmin) return res.status(403).json({ error: 'Acesso negado: administrador necessário' });
    next();
  } catch (err) {
    console.error('adminAuth error', err.message);
    res.status(500).json({ error: 'Erro de autorização' });
  }
};
