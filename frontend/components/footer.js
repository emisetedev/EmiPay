class EmiFooter extends HTMLElement {
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
                
                footer {
                    background: #0a0a0a;
                    color: white;
                    padding: 3rem 1rem;
                    border-top: 1px solid #333;
                }
                
                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                .footer-grid {
                    display: grid;
                    gap: 2rem;
                    margin-bottom: 2rem;
                }
                
                .footer-column h3 {
                    font-size: 1.25rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                    background: linear-gradient(90deg, #00c853, #69f0ae);
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    color: transparent;
                }
                
                .footer-column h4 {
                    font-size: 1.125rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    color: #fff;
                }
                
                .footer-description {
                    color: #9ca3af;
                    line-height: 1.6;
                    margin-bottom: 1rem;
                }
                
                .footer-links {
                    list-style: none;
                }
                
                .footer-links li {
                    margin-bottom: 0.5rem;
                }
                
                .footer-link {
                    color: #9ca3af;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    display: inline-block;
                    font-weight: 500;
                }
                
                .footer-link:hover {
                    color: #00c853;
                    transform: translateX(4px);
                }
                
                .footer-bottom {
                    border-top: 1px solid #333;
                    padding-top: 2rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }
                
                .copyright {
                    color: #9ca3af;
                    text-align: center;
                }
                
                .social-links {
                    display: flex;
                    gap: 1.5rem;
                }
                
                .social-link {
                    color: #9ca3af;
                    transition: all 0.3s ease;
                    padding: 0.5rem;
                    border-radius: 0.375rem;
                }
                
                .social-link:hover {
                    color: #00c853;
                    background: rgba(0, 200, 83, 0.1);
                    transform: translateY(-2px);
                }
                
                @media (min-width: 768px) {
                    .footer-grid {
                        grid-template-columns: repeat(4, 1fr);
                        gap: 3rem;
                    }
                    
                    .footer-bottom {
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                    }
                    
                    .copyright {
                        text-align: left;
                    }
                }
                
                @media (max-width: 767px) {
                    .footer-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
            </style>
            
            <footer>
                <div class="footer-container">
                    <div class="footer-grid">
                        <!-- Column 1 -->
                        <div class="footer-column">
                            <h3>EmiPay</h3>
                            <p class="footer-description">
                                A solução completa para pagamentos digitais com taxas justas e saque imediato.
                            </p>
                        </div>

                        <!-- Column 2 -->
                        <div class="footer-column">
                            <h4>Produto</h4>
                            <ul class="footer-links">
                                <li><a href="pages/features.html" class="footer-link">Recursos</a></li>
                                <li><a href="#plans" class="footer-link">Preços</a></li>
                                <li><a href="/integrations" class="footer-link">Integrações</a></li>
                                <li><a href="/updates" class="footer-link">Atualizações</a></li>
                            </ul>
                        </div>

                        <!-- Column 3 -->
                        <div class="footer-column">
                            <h4>Suporte</h4>
                            <ul class="footer-links">
                                <li><a href="/docs" class="footer-link">Documentação</a></li>
                                <li><a href="/help" class="footer-link">Central de Ajuda</a></li>
                                <li><a href="/contact" class="footer-link">Contato</a></li>
                                <li><a href="/status" class="footer-link">Status</a></li>
                            </ul>
                        </div>

                        <!-- Column 4 -->
                        <div class="footer-column">
                            <h4>Legal</h4>
                            <ul class="footer-links">
                                <li><a href="/privacy" class="footer-link">Privacidade</a></li>
                                <li><a href="/terms" class="footer-link">Termos</a></li>
                                <li><a href="/security" class="footer-link">Segurança</a></li>
                                <li><a href="/compliance" class="footer-link">Conformidade</a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="footer-bottom">
                        <p class="copyright">© 2024 EmiPay. Todos os direitos reservados.</p>
                        <div class="social-links">
                            <a href="#" class="social-link">
                                <i data-feather="twitter"></i>
                            </a>
                            <a href="#" class="social-link">
                                <i data-feather="facebook"></i>
                            </a>
                            <a href="#" class="social-link">
                                <i data-feather="instagram"></i>
                            </a>
                            <a href="#" class="social-link">
                                <i data-feather="linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
        
        setTimeout(() => {
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }, 100);
    }
}

customElements.define('emi-footer', EmiFooter);