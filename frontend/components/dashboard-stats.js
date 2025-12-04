class EmiDashboardStats extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }
                
                .stat-card {
                    background: #111;
                    padding: 1.5rem;
                    border-radius: 0.75rem;
                    border: 1px solid #333;
                    transition: all 0.3s ease;
                }
                
                .stat-card:hover {
                    border-color: #00c853;
                    transform: translateY(-2px);
                }
                
                .stat-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                
                .stat-title {
                    color: #9ca3af;
                    font-size: 0.875rem;
                    font-weight: 500;
                }
                
                .stat-icon {
                    width: 2.5rem;
                    height: 2.5rem;
                    border-radius: 0.5rem;
                    background: linear-gradient(135deg, #00c853, #69f0ae);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #000;
                }
                
                .stat-value {
                    font-size: 1.875rem;
                    font-weight: bold;
                    color: #fff;
                    margin-bottom: 0.25rem;
                }
                
                .stat-change {
                    color: #00c853;
                    font-size: 0.875rem;
                    font-weight: 500;
                }
                
                .stat-change.negative {
                    color: #ef4444;
                }
            </style>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-title">Saldo Disponível</div>
                        <div class="stat-icon">
                            <i data-feather="dollar-sign"></i>
                        </div>
                    </div>
                    <div class="stat-value" id="balanceValue">R$ 0,00</div>
                    <div class="stat-change" id="balanceChange">+0% este mês</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-title">Vendas Hoje</div>
                        <div class="stat-icon">
                            <i data-feather="shopping-cart"></i>
                        </div>
                    </div>
                    <div class="stat-value" id="salesValue">0</div>
                    <div class="stat-change" id="salesChange">+0% vs ontem</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-title">Taxa de Conversão</div>
                        <div class="stat-icon">
                            <i data-feather="trending-up"></i>
                        </div>
                    </div>
                    <div class="stat-value" id="conversionValue">0%</div>
                    <div class="stat-change" id="conversionChange">+0% este mês</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-title">Produtos Ativos</div>
                        <div class="stat-icon">
                            <i data-feather="package"></i>
                        </div>
                    </div>
                    <div class="stat-value" id="productsValue">0</div>
                    <div class="stat-change" id="productsChange">+0 este mês</div>
                </div>
            </div>
        `;
        
        this.loadStats();
    }
    
    async loadStats() {
        try {
            // Simular carregamento de dados
            const stats = {
                balance: 2847.50,
                balanceChange: 12,
                sales: 24,
                salesChange: 8,
                conversion: 3.2,
                conversionChange: 0.4,
                products: 8,
                productsChange: 2
            };
            
            this.updateStats(stats);
        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
        }
    }
    
    updateStats(stats) {
        this.shadowRoot.getElementById('balanceValue').textContent = `R$ ${stats.balance.toFixed(2)}`;
        this.shadowRoot.getElementById('balanceChange').textContent = `+${stats.balanceChange}% este mês`;
        
        this.shadowRoot.getElementById('salesValue').textContent = stats.sales;
        this.shadowRoot.getElementById('salesChange').textContent = `+${stats.salesChange}% vs ontem`;
        
        this.shadowRoot.getElementById('conversionValue').textContent = `${stats.conversion}%`;
        this.shadowRoot.getElementById('conversionChange').textContent = `+${stats.conversionChange}% este mês`;
        
        this.shadowRoot.getElementById('productsValue').textContent = stats.products;
        this.shadowRoot.getElementById('productsChange').textContent = `+${stats.productsChange} este mês`;
        
        // Atualizar ícones
        setTimeout(() => {
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }, 100);
    }
}

customElements.define('emi-dashboard-stats', EmiDashboardStats);