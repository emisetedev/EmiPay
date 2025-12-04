/**
 * EmiPay - Gateway de Pagamentos
 * App Principal - Funcionalidades Globais
 */

class EmiPayApp {
    constructor() {
        this.currentUser = null;
        // Determine API base URL dynamically:
        // 1) If a global override is set: window.__API_BASE_URL__
        // 2) If the page is served from a web origin, use that origin + /api
        // 3) Fallback to localhost:3002 (server chooses an available port, default 3000/3002)
        try {
            const override = window.__API_BASE_URL__;
            if (override) {
                this.apiBaseUrl = override.replace(/\/$/, '') + '/api';
            } else if (window.location && window.location.origin && window.location.origin !== 'null') {
                this.apiBaseUrl = `${window.location.origin}/api`;
            } else {
                this.apiBaseUrl = 'http://localhost:3002/api';
            }
        } catch (e) {
            this.apiBaseUrl = 'http://localhost:3002/api';
        }

        this.init();
    }

    init() {
        console.log('🚀 EmiPay App Inicializado');
        this.setupEventListeners();
        this.checkAuthentication();
        this.loadUserData();
    }

    // 🔐 AUTENTICAÇÃO
    async login(email, password) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                this.setAuthToken(data.token);
                this.currentUser = data.user;
                this.showNotification('Login realizado com sucesso!', 'success');
                this.redirectToDashboard();
                return true;
            } else {
                this.showNotification(data.error || 'Erro no login', 'error');
                return false;
            }
        } catch (error) {
            console.error('Erro no login:', error);
            this.showNotification('Erro de conexão', 'error');
            return false;
        }
    }

    async register(userData) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                this.setAuthToken(data.token);
                this.currentUser = data.user;
                this.showNotification('Conta criada com sucesso!', 'success');
                this.redirectToDashboard();
                return true;
            } else {
                this.showNotification(data.error || 'Erro no cadastro', 'error');
                return false;
            }
        } catch (error) {
            console.error('Erro no cadastro:', error);
            this.showNotification('Erro de conexão', 'error');
            return false;
        }
    }

    logout() {
        localStorage.removeItem('emipay_token');
        localStorage.removeItem('emipay_user');
        this.currentUser = null;
        this.showNotification('Logout realizado', 'info');
        window.location.href = 'pages/login.html';
    }

    // 🔒 GERENCIAMENTO DE TOKEN
    setAuthToken(token) {
        localStorage.setItem('emipay_token', token);
    }

    getAuthToken() {
        return localStorage.getItem('emipay_token');
    }

    isAuthenticated() {
        return !!this.getAuthToken();
    }

    checkAuthentication() {
        if (!this.isAuthenticated() && window.location.pathname.includes('/pages/')) {
            if (!window.location.pathname.includes('/login.html') && 
                !window.location.pathname.includes('/signup.html')) {
                window.location.href = 'pages/login.html';
            }
        }
    }

    // 👤 DADOS DO USUÁRIO
    async loadUserData() {
        const savedUser = localStorage.getItem('emipay_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        }

        if (this.isAuthenticated()) {
            try {
                const response = await fetch(`${this.apiBaseUrl}/auth/me`, {
                    headers: {
                        'Authorization': `Bearer ${this.getAuthToken()}`
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    this.currentUser = userData;
                    localStorage.setItem('emipay_user', JSON.stringify(userData));
                }
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
            }
        }
    }

    // 💰 PAGAMENTOS
    async createPayment(productData) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/payments/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getAuthToken()}`
                },
                body: JSON.stringify(productData)
            });

            return await response.json();
        } catch (error) {
            console.error('Erro ao criar pagamento:', error);
            return { success: false, error: 'Erro de conexão' };
        }
    }

    async processPayment(paymentData) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/payments/process`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getAuthToken()}`
                },
                body: JSON.stringify(paymentData)
            });

            return await response.json();
        } catch (error) {
            console.error('Erro ao processar pagamento:', error);
            return { success: false, error: 'Erro de conexão' };
        }
    }

    // 📊 DASHBOARD
    async getDashboardStats() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/dashboard/stats`, {
                headers: {
                    'Authorization': `Bearer ${this.getAuthToken()}`
                }
            });

            if (response.ok) {
                return await response.json();
            }
            return null;
        } catch (error) {
            console.error('Erro ao carregar stats:', error);
            return null;
        }
    }

    async getRecentTransactions() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/transactions/recent`, {
                headers: {
                    'Authorization': `Bearer ${this.getAuthToken()}`
                }
            });

            if (response.ok) {
                return await response.json();
            }
            return [];
        } catch (error) {
            console.error('Erro ao carregar transações:', error);
            return [];
        }
    }

    // 🛍️ PRODUTOS
    async getProducts() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/products`, {
                headers: {
                    'Authorization': `Bearer ${this.getAuthToken()}`
                }
            });

            if (response.ok) {
                return await response.json();
            }
            return [];
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            return [];
        }
    }

    async createProduct(productData) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getAuthToken()}`
                },
                body: JSON.stringify(productData)
            });

            return await response.json();
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            return { success: false, error: 'Erro de conexão' };
        }
    }

    // 💸 SAQUES
    async requestWithdrawal(amount) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/withdrawals`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getAuthToken()}`
                },
                body: JSON.stringify({ amount })
            });

            return await response.json();
        } catch (error) {
            console.error('Erro ao solicitar saque:', error);
            return { success: false, error: 'Erro de conexão' };
        }
    }

    // 🔔 NOTIFICAÇÕES
    showNotification(message, type = 'info') {
        // Remove notificação existente
        const existingNotification = document.querySelector('.emipay-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `emipay-notification emipay-notification--${type}`;
        notification.innerHTML = `
            <div class="emipay-notification__content">
                <span class="emipay-notification__message">${message}</span>
                <button class="emipay-notification__close">&times;</button>
            </div>
        `;

        // Adiciona estilos se não existirem
        if (!document.querySelector('#emipay-notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'emipay-notification-styles';
            styles.textContent = `
                .emipay-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10000;
                    min-width: 300px;
                    max-width: 500px;
                    background: #111;
                    border: 1px solid #333;
                    border-radius: 0.5rem;
                    padding: 1rem;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
                    animation: slideIn 0.3s ease;
                }
                .emipay-notification--success { border-left: 4px solid #00c853; }
                .emipay-notification--error { border-left: 4px solid #ef4444; }
                .emipay-notification--info { border-left: 4px solid #3b82f6; }
                .emipay-notification__content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .emipay-notification__message {
                    color: #fff;
                    flex: 1;
                }
                .emipay-notification__close {
                    background: none;
                    border: none;
                    color: #9ca3af;
                    font-size: 1.25rem;
                    cursor: pointer;
                    margin-left: 1rem;
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Fecha automaticamente após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

        // Fecha ao clicar no X
        notification.querySelector('.emipay-notification__close').addEventListener('click', () => {
            notification.remove();
        });
    }

    // 🎯 REDIRECIONAMENTOS
    redirectToDashboard() {
        window.location.href = 'pages/dashboard.html';
    }

    redirectToLogin() {
        window.location.href = 'pages/login.html';
    }

    // 📍 ROTEAMENTO
    setupEventListeners() {
        // Logout global
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-logout]')) {
                e.preventDefault();
                this.logout();
            }
        });

        // Links protegidos
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-protected]')) {
                if (!this.isAuthenticated()) {
                    e.preventDefault();
                    this.showNotification('Faça login para acessar', 'error');
                    this.redirectToLogin();
                }
            }
        });
    }

    // 🛠️ UTILITÁRIOS
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('pt-BR');
    }

    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// 🌟 INICIALIZAÇÃO GLOBAL
window.emipay = new EmiPayApp();

// 🎯 INICIALIZAÇÃO QUANDO O DOM ESTIVER PRONTO
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM Carregado - EmiPay Pronto');
    
    // Inicializa Feather Icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // Configura formulários de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            await window.emipay.login(email, password);
        });
    }

    // Configura formulários de cadastro
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                plan: document.getElementById('plan') ? document.getElementById('plan').value : undefined,
                company_name: document.getElementById('company_name') ? document.getElementById('company_name').value : undefined,
                phone: document.getElementById('phone') ? document.getElementById('phone').value : undefined,
                document: document.getElementById('document') ? document.getElementById('document').value : undefined,
                document_type: document.getElementById('document_type') ? document.getElementById('document_type').value : undefined
            };

            // Normalize: backend expects 'document' field; include document_type in metadata
            if (formData.document_type) {
                formData.metadata = { document_type: formData.document_type };
            }

            await window.emipay.register(formData);
        });
    }
});

// 📡 EVENTOS GLOBAIS
window.addEventListener('online', () => {
    window.emipay.showNotification('Conexão restaurada', 'success');
});

window.addEventListener('offline', () => {
    window.emipay.showNotification('Sem conexão com a internet', 'error');
});