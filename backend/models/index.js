const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');

// `config` is a sqlite URI string such as 'sqlite:./emipay.sqlite'
const sequelize = new Sequelize(config, { logging: false });

// Models
const User = require('./User')(sequelize, DataTypes);
const Payment = require('./payment')(sequelize, DataTypes);
const Withdrawal = require('./withdrawal')(sequelize, DataTypes);
const Affiliate = require('./affiliate')(sequelize, DataTypes);
const Product = require('./product')(sequelize, DataTypes);
const Subscription = require('./subscription')(sequelize, DataTypes);
const WebhookLog = require('./webhooklog')(sequelize, DataTypes);
const Transaction = require('./transaction')(sequelize, DataTypes);

// Run associations if provided
const models = { User, Payment, Withdrawal, Affiliate, Product, Subscription, WebhookLog, Transaction };
Object.keys(models).forEach((name) => {
  if (typeof models[name].associate === 'function') {
    models[name].associate(models);
  }
});

// Test connection
sequelize.authenticate()
  .then(() => console.log('✅ Database connected successfully'))
  .catch(err => console.error('❌ Database connection failed:', err));

module.exports = {
  sequelize,
  Sequelize,
  ...models
};