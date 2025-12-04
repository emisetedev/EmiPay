const crypto = require('crypto');

function generateApiKey() {
  return `emipay_${crypto.randomBytes(32).toString('hex')}`;
}

function generateAffiliateCode() {
  return crypto.randomBytes(8).toString('hex').toUpperCase();
}

function generatePaymentId() {
  return `pay_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
}

function generateRandomString(length = 8) {
  return crypto.randomBytes(length).toString('hex');
}

module.exports = {
  generateApiKey,
  generateAffiliateCode,
  generatePaymentId,
  generateRandomString
};