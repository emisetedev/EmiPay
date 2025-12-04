const db = require('../config/database');

class User {
  static create(userData, callback) {
    const { email, password, company_name, document, phone } = userData;
    
    const sql = `INSERT INTO users (email, password, company_name, document, phone) 
                 VALUES (?, ?, ?, ?, ?)`;
    
    db.run(sql, [email, password, company_name, document, phone], function(err) {
      callback(err, { id: this.lastID, ...userData });
    });
  }

  static findByEmail(email, callback) {
    db.get('SELECT * FROM users WHERE email = ?', [email], callback);
  }

  static findById(id, callback) {
    db.get('SELECT * FROM users WHERE id = ?', [id], callback);
  }

  static updateBalance(userId, amount, callback) {
    db.run('UPDATE users SET balance = balance + ? WHERE id = ?', [amount, userId], callback);
  }
}

module.exports = User;