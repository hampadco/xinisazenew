// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Loading screen
    setTimeout(function() {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.classList.add('hidden');
        
        // Remove loading screen after transition completes
        setTimeout(function() {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
    
    // Variables
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const slides = document.querySelectorAll('.slide');
    const indicatorDots = document.querySelectorAll('.indicator-dot');
    const navLinks = document.querySelectorAll('nav ul li a');
    const progressBar = document.querySelector('.progress');
    
    let currentSlide = 0;
    let isScrolling = false;
    let touchStartY = 0;
    let touchEndY = 0;
    let isDetailView = false;
    
    // Update current slide
    function updateCurrentSlide(index) {
        // Reset portfolio view when changing slides
        if (currentSlide === 1) {
            // If we're navigating away from the portfolio slide
            resetPortfolioView();
        }
        
        // Update slides
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        
        // Update indicator dots
        indicatorDots.forEach(dot => dot.classList.remove('active'));
        indicatorDots[index].classList.add('active');
        
        // Update navigation links
        navLinks.forEach(link => link.classList.remove('active'));
        navLinks[index].classList.add('active');
        
        // Update progress bar
        const progress = ((index + 1) / slides.length) * 100;
        progressBar.style.width = `${progress}%`;
        
        // Update current slide index
        currentSlide = index;
        
        // Update URL hash
        window.location.hash = `#slide-${index + 1}`;
    }
    
    // Scroll to next slide
    function nextSlide() {
        // If we're in the portfolio slide and not in detail view yet, show detail view first
        if (currentSlide === 1 && !isDetailView) {
            showPortfolioDetail();
            return;
        }
        
        if (currentSlide < slides.length - 1) {
            updateCurrentSlide(currentSlide + 1);
        }
    }
    
    // Scroll to previous slide
    function prevSlide() {
        // If we're in the portfolio slide and in detail view, go back to overview
        if (currentSlide === 1 && isDetailView) {
            hidePortfolioDetail();
            return;
        }
        
        if (currentSlide > 0) {
            updateCurrentSlide(currentSlide - 1);
        }
    }
    
    // Handle mouse wheel scroll
    function handleWheel(e) {
        if (isScrolling) return;
        
        isScrolling = true;
        
        if (e.deltaY > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
        
        setTimeout(() => {
            isScrolling = false;
        }, 800);
    }
    
    // Handle touch events for mobile
    function handleTouchStart(e) {
        touchStartY = e.touches[0].clientY;
    }
    
    function handleTouchMove(e) {
        touchEndY = e.touches[0].clientY;
    }
    
    function handleTouchEnd() {
        if (isScrolling) return;
        
        isScrolling = true;
        
        const diff = touchStartY - touchEndY;
        
        // If the touch movement is significant
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        setTimeout(() => {
            isScrolling = false;
        }, 800);
    }
    
    // Indicator dot click
    indicatorDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Reset portfolio view when changing slides
            if (currentSlide === 1) {
                resetPortfolioView();
            }
            updateCurrentSlide(index);
        });
    });
    
    // Navigation link click
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Reset portfolio view when changing slides
            if (currentSlide === 1) {
                resetPortfolioView();
            }
            updateCurrentSlide(index);
        });
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        // Toggle menu icon
        const icon = menuToggle.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            
            // Reset menu icon
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Event listeners for scroll and touch
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    
    // Handle keyboard navigation
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            prevSlide();
        }
    });
    
    // Handle URL hash on page load
    function handleInitialHash() {
        const hash = window.location.hash;
        if (hash) {
            const slideNumber = parseInt(hash.replace('#slide-', ''));
            if (!isNaN(slideNumber) && slideNumber >= 1 && slideNumber <= slides.length) {
                updateCurrentSlide(slideNumber - 1);
            }
        }
    }
    
    // Portfolio functionality
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioOverview = document.querySelector('.portfolio-overview');
    const portfolioDetail = document.querySelector('.portfolio-detail');
    const portfolioSlideContent = document.querySelector('.portfolio-slide-content');
    const detailSlides = document.querySelectorAll('.detail-slide');
    const detailDots = document.querySelectorAll('.detail-dot');
    const prevDetailBtn = document.querySelector('.detail-navigation .prev-btn');
    const nextDetailBtn = document.querySelector('.detail-navigation .next-btn');
    const detailCurrentElement = document.querySelector('.detail-current');
    
    let currentDetailIndex = 0;
    
    // Show portfolio detail view
    function showPortfolioDetail() {
        if (portfolioSlideContent) {
            portfolioSlideContent.classList.add('show-detail');
            isDetailView = true;
        }
    }
    
    // Hide portfolio detail view
    function hidePortfolioDetail() {
        if (portfolioSlideContent) {
            portfolioSlideContent.classList.remove('show-detail');
            isDetailView = false;
        }
    }
    
    // Reset portfolio view
    function resetPortfolioView() {
        hidePortfolioDetail();
        currentDetailIndex = 0;
        updateDetailSlide(0);
    }
    
    // Update detail slide
    function updateDetailSlide(index) {
        detailSlides.forEach(slide => slide.classList.remove('active'));
        detailSlides[index].classList.add('active');
        
        detailDots.forEach(dot => dot.classList.remove('active'));
        detailDots[index].classList.add('active');
        
        if (detailCurrentElement) {
            detailCurrentElement.textContent = index + 1;
        }
        
        currentDetailIndex = index;
    }
    
    // Next detail slide
    function nextDetailSlide() {
        let index = currentDetailIndex + 1;
        if (index >= detailSlides.length) {
            index = 0;
        }
        updateDetailSlide(index);
    }
    
    // Previous detail slide
    function prevDetailSlide() {
        let index = currentDetailIndex - 1;
        if (index < 0) {
            index = detailSlides.length - 1;
        }
        updateDetailSlide(index);
    }
    
    // Detail navigation buttons
    if (prevDetailBtn && nextDetailBtn) {
        prevDetailBtn.addEventListener('click', prevDetailSlide);
        nextDetailBtn.addEventListener('click', nextDetailSlide);
    }
    
    // Detail dots navigation
    detailDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateDetailSlide(index);
        });
    });
    
    // Portfolio item click
    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateDetailSlide(index);
            showPortfolioDetail();
        });
    });
    
    // Services slider functionality
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceDots = document.querySelectorAll('.service-dot');
    
    let currentServiceItem = 0;
    
    // Update service item
    function updateServiceItem(index) {
        serviceItems.forEach(item => item.classList.remove('active'));
        serviceItems[index].classList.add('active');
        
        serviceDots.forEach(dot => dot.classList.remove('active'));
        serviceDots[index].classList.add('active');
        
        currentServiceItem = index;
    }
    
    // Next service item
    function nextServiceItem() {
        let index = currentServiceItem + 1;
        if (index >= serviceItems.length) {
            index = 0;
        }
        updateServiceItem(index);
    }
    
    // Service dots
    serviceDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateServiceItem(index);
        });
    });
    
    // Auto change service item
    let serviceInterval = setInterval(nextServiceItem, 4000);
    
    // Reset interval when manually changing service item
    function resetServiceInterval() {
        clearInterval(serviceInterval);
        serviceInterval = setInterval(nextServiceItem, 4000);
    }
    
    serviceDots.forEach(dot => {
        dot.addEventListener('click', resetServiceInterval);
    });
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');
            
            if (nameInput.value.trim() !== '' && 
                emailInput.value.trim() !== '' && 
                messageInput.value.trim() !== '') {
                
                // Show success message
                contactForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Message Sent Successfully!</h3>
                        <p>We'll get back to you soon.</p>
                    </div>
                `;
                
                // Style success message
                const successMessage = contactForm.querySelector('.success-message');
                successMessage.style.textAlign = 'center';
                successMessage.style.padding = '30px';
                successMessage.style.color = 'var(--light-text)';
                
                const successIcon = successMessage.querySelector('i');
                successIcon.style.fontSize = '3rem';
                successIcon.style.color = 'var(--secondary-color)';
                successIcon.style.marginBottom = '15px';
                successIcon.style.display = 'block';
            }
        });
    }
    
    // Initialize
    handleInitialHash();
    
    // If no hash is present, make sure the first slide is active
    if (!window.location.hash) {
        updateCurrentSlide(0);
    }
    
    // Initialize portfolio detail slider
    if (detailSlides.length > 0) {
        updateDetailSlide(0);
    }
    
    // Initialize services slider
    if (serviceItems.length > 0) {
        updateServiceItem(0);
    }
}); 