const path = require('path');

// Usa arquivo SQLite na pasta backend
const file = path.join(__dirname, '..', 'emipay.sqlite').replace(/\\/g, '/');

module.exports = `sqlite:${file}`;
