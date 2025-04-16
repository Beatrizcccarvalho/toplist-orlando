// Carousel functionality for the old fade-style carousel
let slideIndex = 0;
function showFadeSlides() {
    let slides = document.getElementsByClassName('carousel-slide fade');
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    
    // Increment slideIndex
    slideIndex++;
    
    // Reset to first slide if at the end
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    // Show the current slide
    if (slides.length > 0 && slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = 'block';
    
        // Change image every 3 seconds
        setTimeout(showFadeSlides, 3000);
    }
}

// New carousel for homepage with sliding effect
function setupSlideCarousel() {
    const slideContainer = document.querySelector('.carousel-slide.flex');
    if (!slideContainer) return;
    
    const images = slideContainer.querySelectorAll('img');
    const imageCount = images.length;
    let currentIndex = 0;
    
    // Set initial position
    slideContainer.style.width = `${imageCount * 100}%`;
    images.forEach(img => {
        img.style.width = `${100 / imageCount}%`;
    });
    
    // Function to move to next slide
    function moveToNextSlide() {
        currentIndex = (currentIndex + 1) % imageCount;
        slideContainer.style.transform = `translateX(-${currentIndex * (100 / imageCount)}%)`;
        setTimeout(moveToNextSlide, 5000);
    }
    
    // Start the carousel
    setTimeout(moveToNextSlide, 5000);
}

// Memory card flip effect
document.addEventListener('DOMContentLoaded', function() {
    // Add WhatsApp button to all pages except homepage
    const whatsappBtn = document.querySelector('.fixed.bottom-6.right-6');
    if (whatsappBtn && window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
        whatsappBtn.classList.remove('hidden');
    }
    
    // Initialize the appropriate carousel based on which elements exist
    if (document.querySelector('.carousel-slide.fade')) {
        showFadeSlides();
    }
    
    if (document.querySelector('.carousel-slide.flex')) {
        setupSlideCarousel();
    }
    
    // Handle flip cards on management and services pages
    const cards = document.querySelectorAll('.flip-card');
    cards.forEach(card => {
        card.addEventListener('mouseover', function() {
            this.querySelector('.flip-card-inner').style.transform = 'rotateY(180deg)';
        });
        
        card.addEventListener('mouseout', function() {
            this.querySelector('.flip-card-inner').style.transform = 'rotateY(0deg)';
        });
    });
});
