document.addEventListener('DOMContentLoaded', function() {
    const servicesHeaderTop = document.querySelector('.services-header-top');
    const servicesNavButtons = document.querySelectorAll('.services-nav-button');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Плавная прокрутка для навигационных ссылок
    servicesNavButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                
                // Закрываем мобильное меню Bootstrap при клике на ссылку
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
    
    // Изменение шапки при скролле
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            servicesHeaderTop.classList.add('scrolled');
        } else {
            servicesHeaderTop.classList.remove('scrolled');
        }
    });
    
    // Закрытие мобильного меню при клике вне его области
    document.addEventListener('click', function(e) {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (!e.target.closest('.navbar') && !e.target.closest('.navbar-toggler')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        }
    });
    
    // Обработка клавиши Escape для закрытия меню
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
    });
    
    // Адаптивная высота header-banner
    function adjustBannerHeight() {
        const servicesBanner = document.querySelector('.services-banner');
        const navbarHeight = document.querySelector('.services-header-top').offsetHeight;
        
        if (servicesBanner) {
            servicesBanner.style.paddingTop = navbarHeight + 'px';
            servicesBanner.style.height = `calc(100vh - ${navbarHeight}px)`;
        }
    }
    
    // Инициализация при загрузке и изменении размера окна
    adjustBannerHeight();
    window.addEventListener('resize', adjustBannerHeight);
    
    // Добавление класса для анимации при скролле
    function checkScroll() {
        const elements = document.querySelectorAll('.service-card, .stat-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Инициализация анимаций
    document.querySelectorAll('.service-card, .stat-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Проверка при загрузке
    
    // Обработка кнопок "Начать проект" в модальных окнах Bootstrap
    const projectButtons = document.querySelectorAll('.modal-project-button');
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            alert('Спасибо за интерес к нашей услуге! Мы свяжемся с вами в ближайшее время.');
            
            // Закрываем модальное окно Bootstrap
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        });
    });
    
    // Дополнительные анимации для улучшения UX
    function initAnimations() {
        // Анимация появления статистики
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const statNumbers = document.querySelectorAll('.stat-number');
                        statNumbers.forEach((stat, index) => {
                            setTimeout(() => {
                                stat.style.transform = 'scale(1.1)';
                                setTimeout(() => {
                                    stat.style.transform = 'scale(1)';
                                }, 300);
                            }, index * 200);
                        });
                    }
                });
            });
            
            observer.observe(statsSection);
        }
        
        // Анимация ховера для карточек услуг
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-10px)';
            });
        });
    }
    
    initAnimations();
    
    // Фикс для мобильной навигации
    function fixMobileNav() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarToggler) {
            navbarToggler.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                if (isExpanded) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }
    
    fixMobileNav();
});