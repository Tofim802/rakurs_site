document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-button');
    const headerTop = document.querySelector('.header-top');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    

    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            

            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
            
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    

    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            headerTop.classList.add('scrolled');
        } else {
            headerTop.classList.remove('scrolled');
        }
    });
    

    document.addEventListener('click', function(e) {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (!e.target.closest('.navbar') && !e.target.closest('.navbar-toggler')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
    

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
    
    function adjustBannerHeight() {
        const headerBanner = document.querySelector('.header-banner');
        const navbarHeight = document.querySelector('.header-top').offsetHeight;
        
        if (headerBanner) {
            headerBanner.style.height = `calc(100vh - ${navbarHeight}px)`;
            headerBanner.style.marginTop = `${navbarHeight}px`;
        }
    }
    
    adjustBannerHeight();
    window.addEventListener('resize', adjustBannerHeight);
    
    function checkScroll() {
        const elements = document.querySelectorAll('.about-photo, .service-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    document.querySelectorAll('.about-photo, .service-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();
});