class EmiTestimonials extends HTMLElement {
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
                    background: #111;
                    border-radius: 0.75rem;
                    margin: 3rem auto;
                    max-width: 1200px;
                    border: 1px solid #333;
                }
                
                .testimonials-container {
                    max-width: 1200px;
                    margin: 0 auto;
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
                
                .testimonials-grid {
                    display: grid;
                    gap: 2rem;
                }
                
                .testimonial-card {
                    background: #0a0a0a;
                    padding: 1.5rem;
                    border-radius: 0.75rem;
                    border: 1px solid #333;
                    transition: all 0.3s ease;
                }
                
                .testimonial-card:hover {
                    transform: scale(1.02);
                    border-color: #00c853;
                    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3);
                }
                
                .testimonial-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                
                .testimonial-avatar {
                    width: 3rem;
                    height: 3rem;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-right: 1rem;
                    border: 2px solid #00c853;
                }
                
                .testimonial-info h4 {
                    font-weight: 600;
                    color: #fff;
                    margin-bottom: 0.25rem;
                }
                
                .testimonial-role {
                    color: #00c853;
                    font-size: 0.875rem;
                }
                
                .testimonial-text {
                    color: #9ca3af;
                    line-height: 1.6;
                    margin-bottom: 1rem;
                    font-style: italic;
                }
                
                .testimonial-stars {
                    display: flex;
                    gap: 0.25rem;
                    color: #f59e0b;
                }
                
                .testimonial-stars i {
                    width: 1rem;
                    height: 1rem;
                }
                
                @media (min-width: 768px) {
                    .testimonials-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
            </style>
            
            <section>
                <div class="testimonials-container">
                    <div class="section-header">
                        <h2 class="gradient-text">O que nossos clientes dizem</h2>
                    </div>
                    
                    <div class="testimonials-grid">
                        <!-- Testimonial 1 -->
                        <div class="testimonial-card">
                            <div class="testimonial-header">
                                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                                     alt="Ana Silva" class="testimonial-avatar">
                                <div class="testimonial-info">
                                    <h4>Ana Silva</h4>
                                    <p class="testimonial-role">Produtora de cursos</p>
                                </div>
                            </div>
                            <p class="testimonial-text">
                                "O EmiPay revolucionou meu negócio. Agora recebo meus pagamentos em minutos e com taxas muito menores que outras plataformas."
                            </p>
                            <div class="testimonial-stars">
                                <i data-feather="star" class="fill-current"></i>
                                <i data-feather="star" class="fill-current"></i>
                                <i data-feather="star" class="fill-current"></i>
                                <i data-feather="star" class="fill-current"></i>
                                <i data-feather="star" class="fill-current"></i>
                            </div>
                        </div>

                        <!-- Testimonial 2 -->
                        <div class="testimonial-card">
                            <div class="testimonial-header">
                                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                                     alt="Carlos Mendes" class="testimonial-avatar">
                                <div class="testimonial-info">
                                    <h4>Carlos Mendes</h4>
                                    <p class="testimonial-role">Consultor digital</p>
                                </div>
                            </div>
                            <p class="testimonial-text">
                                "A facilidade de integração e o suporte excelente me fizeram migrar todas minhas vendas para o EmiPay. Recomendo muito!"
                            </p>
                            <div class="testimonial-stars">
                                <i data-feather="star" class="fill-current"></i>
                                <i data-feather="star" class="fill-current"></i>
                                <i data-feather="star" class="fill-current"></i>
                                <i data-feather="star" class="fill-current"></i>
                                <i data-feather="star" class="fill-current"></i>
                            </div>
                        </div>

                        <!-- Testimonial 3 -->
                        <div class="testimonial-card">
                            <div class="testimonial-header">
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                                     alt="Juliana Costa" class="testimonial-avatar">
                                <div class="testimonial-info">
                                    <h4>Juliana Costa</h4>
                                    <p class="testimonial-role">Autora de e-books</p>
                                </div>
                            </div>
                            <p class="testimonial-text">
                                "Finalmente uma plataforma que entende as necessidades de quem vende produtos digitais. O checkout é lindo e as taxas são justas."
                            </p>
                            <div class="testimonial-stars">
                                <i data-feather="star" class="fill-current"></i>
                                <i data-feather="star" class="fill-current"></i>
                                <i data-feather="star" class="fill-current"></i>
                                <i data-feather="star" class="fill-current"></i>
                                <i data-feather="star" class="fill-current"></i>
                            </div>
                        </div>
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

customElements.define('emi-testimonials', EmiTestimonials);