const { isEmail, isLength } = require('validator');

function validateEmail(email) {
  return isEmail(email);
}

function validatePassword(password) {
  return isLength(password, { min: 6 });
}

function validateCPF(cpf) {
  // Implementar validação de CPF
  return /^\d{11}$/.test(cpf);
}

function validateCNPJ(cnpj) {
  // Implementar validação de CNPJ
  return /^\d{14}$/.test(cnpj);
}

function validatePhone(phone) {
  return /^\+?[\d\s-()]{10,}$/.test(phone);
}

module.exports = {
  validateEmail,
  validatePassword,
  validateCPF,
  validateCNPJ,
  validatePhone
};