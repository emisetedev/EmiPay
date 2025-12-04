const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = (req, res) => {
  const { email, password, company_name, document, phone } = req.body;

  // Verificar se usuário já existe
  User.findByEmail(email, (err, existingUser) => {
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    // Hash da senha
    bcrypt.hash(password, 12, (err, hashedPassword) => {
      if (err) throw err;

      // Criar usuário
      User.create({
        email,
        password: hashedPassword,
        company_name,
        document,
        phone
      }, (err, user) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao criar usuário' });
        }

        // Gerar token
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET || 'secret',
          { expiresIn: '7d' }
        );

        res.status(201).json({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            company_name: user.company_name
          },
          token
        });
      });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, user) => {
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verificar senha
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Gerar token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          company_name: user.company_name,
          balance: user.balance
        },
        token
      });
    });
  });
};