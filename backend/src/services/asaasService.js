const axios = require('axios');

class AsaasService {
  constructor() {
    this.apiKey = process.env.ASAAS_API_KEY;
    this.baseURL = process.env.ASAAS_BASE_URL || 'https://sandbox.asaas.com/api/v3';
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'access_token': this.apiKey,
        'Content-Type': 'application/json'
      }
    });
  }

  async createPayment(paymentData) {
    try {
      const response = await this.client.post('/payments', paymentData);
      return response.data;
    } catch (error) {
      console.error('Asaas API Error:', error.response?.data);
      throw new Error(`Asaas payment creation failed: ${error.response?.data?.errors?.[0]?.description || error.message}`);
    }
  }

  async createCustomer(customerData) {
    try {
      const response = await this.client.post('/customers', customerData);
      return response.data;
    } catch (error) {
      console.error('Asaas Customer Error:', error.response?.data);
      throw new Error(`Asaas customer creation failed: ${error.message}`);
    }
  }

  async createWithdrawal(withdrawalData) {
    try {
      const response = await this.client.post('/transfers', withdrawalData);
      return response.data;
    } catch (error) {
      console.error('Asaas Withdrawal Error:', error.response?.data);
      throw new Error(`Asaas withdrawal failed: ${error.message}`);
    }
  }
}

module.exports = new AsaasService();