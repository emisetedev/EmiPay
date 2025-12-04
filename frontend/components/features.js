class EmiFeatures extends HTMLElement {
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
                }
                
                .features-grid {
                    display: grid;
                    gap: 2rem;
                    margin-bottom: 3rem;
                }
                
                .feature-card {
                    background: #111;
                    padding: 1.5rem;
                    border-radius: 0.75rem;
                    border: 1px solid #333;
                    transition: all 0.3s ease;
                }
                
                .feature-card:hover {
                    transform: translateY(-0.5rem);
                    border-color: #00c853;
                    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3);
                }
                
                .feature-icon {
                    width: 3rem;
                    height: 3rem;
                    border-radius: 0.5rem;
                    background: linear-gradient(135deg, #00c853, #69f0ae);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1rem;
                }
                
                .feature-icon i {
                    color: #000;
                    width: 1.5rem;
                    height: 1.5rem;
                }
                
                h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #fff;
                    margin-bottom: 0.5rem;
                }
                
                .feature-description {
                    color: #9ca3af;
                    line-height: 1.6;
                }
                
                .cta-section {
                    background: #111;
                    padding: 3rem 2rem;
                    border-radius: 0.75rem;
                    text-align: center;
                    border: 1px solid #333;
                }
                
                .cta-buttons {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    margin-top: 1.5rem;
                    flex-wrap: wrap;
                }
                
                .btn-primary {
                    background: linear-gradient(135deg, #00c853, #69f0ae);
                    color: #000;
                    padding: 0.75rem 2rem;
                    border-radius: 0.5rem;
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    border: none;
                    cursor: pointer;
                }
                
                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(0, 200, 83, 0.3);
                }
                
                .btn-secondary {
                    border: 2px solid #00c853;
                    color: #00c853;
                    padding: 0.75rem 2rem;
                    border-radius: 0.5rem;
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }
                
                .btn-secondary:hover {
                    background: #00c853;
                    color: #000;
                    transform: translateY(-2px);
                }
                
                @media (min-width: 768px) {
                    .features-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                
                @media (min-width: 1024px) {
                    .features-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
            </style>
            
            <section>
                <div class="section-header">
                    <h2 class="gradient-text">Tudo que você precisa para vender online</h2>
                    <p class="section-subtitle">Recursos poderosos para impulsionar suas vendas de produtos digitais</p>
                </div>
                
                <div class="features-grid">
                    <!-- Feature 1 -->
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i data-feather="zap"></i>
                        </div>
                        <h3>Saque Imediato</h3>
                        <p class="feature-description">Receba seu dinheiro em minutos, não em dias. Taxas transparentes sem surpresas.</p>
                    </div>

                    <!-- Feature 2 -->
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i data-feather="shopping-cart"></i>
                        </div>
                        <h3>Checkout Personalizável</h3>
                        <p class="feature-description">Checkout totalmente branco com sua marca. Experiência profissional para seus clientes.</p>
                    </div>

                    <!-- Feature 3 -->
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i data-feather="bar-chart-2"></i>
                        </div>
                        <h3>Relatórios Detalhados</h3>
                        <p class="feature-description">Acompanhe suas vendas, conversões e métricas importantes em tempo real.</p>
                    </div>

                    <!-- Feature 4 -->
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i data-feather="users"></i>
                        </div>
                        <h3>Sistema de Afiliados</h3>
                        <p class="feature-description">Crie seu próprio programa de afiliados e expanda suas vendas sem esforço.</p>
                    </div>

                    <!-- Feature 5 -->
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i data-feather="shield"></i>
                        </div>
                        <h3>Segurança Máxima</h3>
                        <p class="feature-description">Pagamentos seguros com criptografia de ponta a ponta e proteção contra fraudes.</p>
                    </div>

                    <!-- Feature 6 -->
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i data-feather="code"></i>
                        </div>
                        <h3>API Completa</h3>
                        <p class="feature-description">Integre com sua plataforma usando nossa API RESTful bem documentada.</p>
                    </div>
                </div>
                
                <div class="cta-section">
                    <h3 style="margin-bottom: 1rem; color: #fff;">Pronto para começar?</h3>
                    <p style="color: #9ca3af; margin-bottom: 1.5rem;">Junte-se a milhares de criadores que já usam o EmiPay para vender seus produtos digitais.</p>
                    <div class="cta-buttons">
                        <a href="pages/signup.html" class="btn-primary">Criar conta gratuita</a>
                        <a href="/" class="btn-secondary">Voltar para Home</a>
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

customElements.define('emi-features', EmiFeatures);