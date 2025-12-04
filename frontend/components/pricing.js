class EmiPricing extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Inter', sans-serif;
                }
                
                section {
                    padding: 4rem 1rem;
                    max-width: 1200px;
                    margin: 0 auto;
                    background: #0a0a0a;
                }
                
                .section-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }
                
                h2 {
                    font-size: 1.875rem;
                    font-weight: bold;
                    color: #fff;
                    margin-bottom: 1rem;
                }
                
                .gradient-text {
                    background: linear-gradient(90deg, #00c853, #69f0ae);
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    color: transparent;
                }
                
                .section-subtitle {
                    color: #9ca3af;
                    max-width: 42rem;
                    margin: 0 auto;
                    line-height: 1.6;
                }
                
                .pricing-grid {
                    display: grid;
                    gap: 2rem;
                    max-width: 80rem;
                    margin: 0 auto;
                }
                
                .pricing-card {
                    background: #111;
                    padding: 2rem;
                    border-radius: 0.75rem;
                    border: 1px solid #333;
                    transition: all 0.3s ease;
                    position: relative;
                }
                
                .pricing-card:hover {
                    transform: translateY(-0.625rem);
                    border-color: #00c853;
                    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3);
                }
                
                .popular-badge {
                    position: absolute;
                    top: -0.75rem;
                    right: 1.25rem;
                    background: linear-gradient(135deg, #00c853, #69f0ae);
                    color: #000;
                    font-size: 0.75rem;
                    font-weight: bold;
                    padding: 0.25rem 0.75rem;
                    border-radius: 9999px;
                }
                
                .popular-card {
                    border: 2px solid #00c853;
                }
                
                .plan-name {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #fff;
                    margin-bottom: 0.5rem;
                }
                
                .plan-description {
                    color: #9ca3af;
                    margin-bottom: 1.5rem;
                }
                
                .price {
                    margin-bottom: 1.5rem;
                }
                
                .price-amount {
                    font-size: 2.25rem;
                    font-weight: bold;
                    color: #00c853;
                }
                
                .price-details {
                    color: #9ca3af;
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                }
                
                .features-list {
                    list-style: none;
                    margin-bottom: 2rem;
                }
                
                .feature-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 0.75rem;
                    color: #9ca3af;
                }
                
                .feature-item i {
                    color: #00c853;
                    margin-right: 0.5rem;
                    flex-shrink: 0;
                }
                
                .btn {
                    display: block;
                    width: 100%;
                    text-align: center;
                    padding: 0.75rem 1rem;
                    border-radius: 0.5rem;
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    border: none;
                    cursor: pointer;
                }
                
                .btn-primary {
                    background: linear-gradient(135deg, #00c853, #69f0ae);
                    color: #000;
                }
                
                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(0, 200, 83, 0.3);
                }
                
                .btn-secondary {
                    background: #333;
                    color: #fff;
                }
                
                .btn-secondary:hover {
                    background: #444;
                    transform: translateY(-2px);
                }
                
                @media (min-width: 768px) {
                    .pricing-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
            </style>
            
            <section>
                <div class="section-header">
                    <h2 class="gradient-text">Planos simples e transparentes</h2>
                    <p class="section-subtitle">Taxas justas e sem pegadinhas. Saque imediato sem custos adicionais.</p>
                </div>
                
                <div class="pricing-grid">
                    <!-- Free Plan -->
                    <div class="pricing-card">
                        <h3 class="plan-name">Free</h3>
                        <p class="plan-description">Para quem está começando</p>
                        <div class="price">
                            <span class="price-amount">R$ 0</span>
                            <span style="color: #9ca3af;">/mês</span>
                            <div class="price-details">Taxa: 3.9% por transação</div>
                        </div>
                        <ul class="features-list">
                            <li class="feature-item">
                                <i data-feather="check"></i>
                                <span>Até 100 vendas/mês</span>
                            </li>
                            <li class="feature-item">
                                <i data-feather="check"></i>
                                <span>Checkout personalizável</span>
                            </li>
                            <li class="feature-item">
                                <i data-feather="check"></i>
                                <span>Relatórios básicos</span>
                            </li>
                            <li class="feature-item">
                                <i data-feather="check"></i>
                                <span>Suporte por e-mail</span>
                            </li>
                        </ul>
                        <a href="pages/signup.html?plan=free" class="btn btn-secondary">Começar agora</a>
                    </div>

                    <!-- Growth Plan (Popular) -->
                    <div class="pricing-card popular-card">
                        <div class="popular-badge">POPULAR</div>
                        <h3 class="plan-name">Growth</h3>
                        <p class="plan-description">Para negócios em crescimento</p>
                        <div class="price">
                            <span class="price-amount">R$ 79</span>
                            <span style="color: #9ca3af;">/mês</span>
                            <div class="price-details">Taxa: 1.9% por transação</div>
                        </div>
                        <ul class="features-list">
                            <li class="feature-item">
                                <i data-feather="check"></i>
                                <span>Até 1.000 vendas/mês</span>
                            </li>
                            <li class="feature-item">
                                <i data-feather="check"></i>
                                <span>Checkout avançado</span>
                            </li>
                            <li class="feature-item">
                                <i data-feather="check"></i>
                                <span>Relatórios completos</span>
                            </li>
                            <li class="feature-item">
                                <i data-feather="check"></i>
                                <span>Programa de afiliados</span>
                            </li>
                            <li class="feature-item">
                                <i data-feather="check"></i>
                                <span>Suporte prioritário</span>
                            </li>
                        </ul>
                        <a href="pages/signup.html?plan=growth" class="btn btn-primary">Começar agora</a>
                    </div>

                    <!-- Pro Plan -->
                    <div class="pricing-card">
                        <h3 class="plan-name">Pro</h3>
                        <p class="plan-description">Para grandes volumes</p>
                        <div class="price">
                            <span class="price-amount">R$ 197</span>
                            <span style="color: #9ca3af;">/mês</span>
                            <div class="price-details">Taxa: 0.9% por transação</div>
                        </div>
                        <ul class="features-list">
                            <li class="feature-item">
                                <i data-feather="check"></i>
                                <span>Vendas ilimitadas</span>
                            </li>
                            <li class="feature-item">
                                <i data-feather="check"></i>
                                <span>Checkout white-label</span>
                            </li>
                            <li class="feature-item">
                                <i data-feather="check"></i>
                                <span>API completa</span>
                            </li>
                            <li class="feature-item">
                                <i data-feather="check"></i>
                                <span>Conta múltiplos usuários</span>
                            </li>
                            <li class="feature-item">
                                <i data-feather="check"></i>
                                <span>Suporte dedicado 24/7</span>
                            </li>
                        </ul>
                        <a href="pages/signup.html?plan=pro" class="btn btn-secondary">Testar Pro</a>
                    </div>
                </div>
            </section>
        `;
        
        setTimeout(() => {
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }, 100);
    }
}

customElements.define('emi-pricing', EmiPricing);