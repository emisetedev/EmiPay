class EmiNavbar extends HTMLElement {
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
                
                nav {
                    background: #0a0a0a;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                    position: fixed;
                    width: 100%;
                    top: 0;
                    z-index: 1000;
                    border-bottom: 1px solid #333;
                }
                
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }
                
                .nav-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 0;
                }
                
                .logo {
                    font-size: 1.5rem;
                    font-weight: bold;
                    background: linear-gradient(90deg, #00c853, #69f0ae);
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    color: transparent;
                    text-decoration: none;
                }
                
                .desktop-menu {
                    display: none;
                    align-items: center;
                    gap: 2rem;
                }
                
                .nav-link {
                    color: #9ca3af;
                    text-decoration: none;
                    position: relative;
                    transition: all 0.3s ease;
                    font-weight: 500;
                }
                
                .nav-link:hover {
                    color: #00c853;
                }
                
                .nav-link::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: -4px;
                    left: 0;
                    background: linear-gradient(90deg, #00c853, #69f0ae);
                    transition: width 0.3s ease;
                }
                
                .nav-link:hover::after {
                    width: 100%;
                }
                
                .btn-signup {
                    background: linear-gradient(135deg, #00c853, #69f0ae);
                    color: #000;
                    padding: 0.6rem 1.5rem;
                    border-radius: 0.5rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                }
                
                .btn-signup:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(0, 200, 83, 0.3);
                }
                
                .mobile-menu-btn {
                    display: block;
                    background: none;
                    border: none;
                    color: #9ca3af;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 0.375rem;
                    transition: all 0.3s ease;
                }
                
                .mobile-menu-btn:hover {
                    color: #00c853;
                    background: rgba(0, 200, 83, 0.1);
                }
                
                .mobile-menu {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease-out;
                    background: #111;
                    border-radius: 0.5rem;
                    margin-top: 0.5rem;
                    border: 1px solid #333;
                }
                
                .mobile-menu.open {
                    max-height: 500px;
                }
                
                .mobile-menu-content {
                    padding: 1rem;
                }
                
                .mobile-link {
                    display: block;
                    padding: 0.75rem 1rem;
                    color: #9ca3af;
                    text-decoration: none;
                    border-radius: 0.375rem;
                    transition: all 0.3s ease;
                    font-weight: 500;
                    margin-bottom: 0.5rem;
                }
                
                .mobile-link:hover {
                    color: #00c853;
                    background: rgba(0, 200, 83, 0.1);
                }
                
                .mobile-link:last-child {
                    margin-bottom: 0;
                }
                
                .mobile-divider {
                    border-top: 1px solid #333;
                    margin: 1rem 0;
                    padding-top: 1rem;
                }
                
                @media (min-width: 768px) {
                    .desktop-menu {
                        display: flex;
                    }
                    .mobile-menu-btn {
                        display: none;
                    }
                }
            </style>
            
            <nav>
                <div class="container">
                    <div class="nav-content">
                        <a href="./index.html" class="logo">EmiPay</a>
                        
                        <div class="desktop-menu">
                            <a href="./pages/features.html" class="nav-link">Recursos</a>
                            <a href="./pages/pricing.html" class="nav-link">Preços</a>
                            <a href="./pages/docs.html" class="nav-link">Documentação</a>
                            <a href="./pages/login.html" class="nav-link">Entrar</a>
                            <a href="./pages/signup.html" class="btn-signup">Cadastre-se</a>
                        </div>
                        
                        <button class="mobile-menu-btn" id="mobileMenuBtn">
                            <i data-feather="menu"></i>
                        </button>
                    </div>
                    
                    <div class="mobile-menu" id="mobileMenu">
                        <div class="mobile-menu-content">
                            <a href="./pages/features.html" class="mobile-link">Recursos</a>
                            <a href="./pages/pricing.html" class="mobile-link">Preços</a>
                            <a href="./pages/docs.html" class="mobile-link">Documentação</a>
                            <div class="mobile-divider">
                                <a href="./pages/login.html" class="mobile-link">Entrar</a>
                                <a href="./pages/signup.html" class="mobile-link" style="color: #000; background: linear-gradient(135deg, #00c853, #69f0ae); font-weight: 600;">Cadastre-se</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        `;
        
        setTimeout(() => {
            const menuBtn = this.shadowRoot.getElementById('mobileMenuBtn');
            const menu = this.shadowRoot.getElementById('mobileMenu');
            
            if (menuBtn && menu) {
                menuBtn.addEventListener('click', () => {
                    menu.classList.toggle('open');
                });
            }
            
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }, 100);
    }
}

customElements.define('emi-navbar', EmiNavbar);