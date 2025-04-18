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

// Initialize resort dropdown functionality
function setupResortDropdown() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(dropdownToggle => {
        const resortDropdown = dropdownToggle.closest('.resort-selector').querySelector('.resort-dropdown');
        const selectedResortText = dropdownToggle.querySelector('span');
        const resortOptions = resortDropdown.querySelectorAll('div');
        
        if (!dropdownToggle || !resortDropdown) return;
        
        // Toggle resort dropdown
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            resortDropdown.classList.toggle('hidden');
            resortDropdown.classList.toggle('active');
        });
        
        // Handle resort selection
        resortOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const value = this.getAttribute('data-value');
                const text = this.textContent;
                
                selectedResortText.textContent = text;
                resortDropdown.classList.add('hidden');
                resortDropdown.classList.remove('active');
                
                // Add selected value as a data attribute to the parent for form submission
                dropdownToggle.parentElement.setAttribute('data-selected', value);
            });
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        dropdownToggles.forEach(dropdownToggle => {
            const resortDropdown = dropdownToggle.closest('.resort-selector').querySelector('.resort-dropdown');
            if (resortDropdown && !dropdownToggle.contains(event.target) && !resortDropdown.contains(event.target)) {
                resortDropdown.classList.add('hidden');
                resortDropdown.classList.remove('active');
            }
        });
    });
}

// Initialize date picker
function setupDatePicker() {
    // First ensure flatpickr is loaded
    if (typeof flatpickr !== 'function') {
        console.error('Flatpickr not found. Make sure to include the flatpickr script in your HTML.');
        return;
    }
    
    // Find all date range toggles on the page 
    const dateRangeToggles = document.querySelectorAll('#date-range-toggle');
    if (dateRangeToggles.length === 0) {
        console.warn('No date-range-toggle elements found.');
        return;
    }
    
    dateRangeToggles.forEach(dateRangeToggle => {
        const dateRangePickerContainer = dateRangeToggle.closest('.travel-dates');
        if (!dateRangePickerContainer) {
            console.warn('Could not find travel-dates container for a date toggle.');
            return;
        }
        
        const dateRangePickerInput = dateRangePickerContainer.querySelector('#date-range-picker');
        if (!dateRangePickerInput) {
            console.warn('Could not find date-range-picker input for a travel-dates container.');
            return;
        }
        
        // Ensure the container can show overflow
        dateRangePickerContainer.style.overflow = 'visible';

        // Initialize flatpickr date range picker
        const datePicker = flatpickr(dateRangePickerInput, {
            mode: 'range',
            minDate: 'today',
            dateFormat: 'Y-m-d',
            position: 'below',
            allowInput: false,
            static: false,
            disableMobile: true,
            onClose: function(selectedDates, dateStr) {
                if (selectedDates.length > 0) {
                    const startDate = new Date(selectedDates[0]);
                    const endDate = selectedDates[1] ? new Date(selectedDates[1]) : startDate;
                    
                    const formattedStartDate = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    const formattedEndDate = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    
                    dateRangeToggle.querySelector('span').textContent = `${formattedStartDate} - ${formattedEndDate}`;
                } else {
                    // Reset text if dates are cleared
                    dateRangeToggle.querySelector('span').textContent = 'Travel Dates';
                }
            },
            onOpen: function(selectedDates, dateStr, instance) {
                // Ensure the calendar has high z-index on open
                const calendarElem = instance.calendarContainer;
                if (calendarElem) {
                    calendarElem.style.zIndex = "9999";
                    document.body.appendChild(calendarElem);
                }
            },
            onError: function(error) {
                console.error('Flatpickr error:', error);
            }
        });
        
        // Open the date picker when the toggle area is clicked
        dateRangeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Date range toggle clicked - opening picker');
            datePicker.open();
        });
        
        // Prevent the hidden input from interfering with clicks if it overlaps
        dateRangePickerInput.addEventListener('click', (e) => e.stopPropagation());

    });
}

// Memory card flip effect
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded - initializing components');
    
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

    // Initialize search bar components
    setupResortDropdown();
    
    // Ensure flatpickr is loaded before initializing the date picker
    if (typeof flatpickr === 'function') {
        console.log('Flatpickr loaded, initializing date picker');
        setupDatePicker();
    } else {
        console.error('Flatpickr not loaded yet, attempting to load dynamically or wait...');
        // If flatpickr might load later, add a check
        let attempts = 0;
        const checkFlatpickr = setInterval(() => {
            attempts++;
            if (typeof flatpickr === 'function') {
                console.log('Flatpickr loaded after delay, initializing date picker');
                setupDatePicker();
                clearInterval(checkFlatpickr);
            } else if (attempts > 10) { // Stop checking after 5 seconds
                console.error('Flatpickr failed to load after multiple attempts.');
                clearInterval(checkFlatpickr);
            }
        }, 500);
    }
    
    // Add hero-text class to the hero heading
    const heroHeading = document.querySelector('.text-black.text-4xl.font-normal');
    if (heroHeading) {
        heroHeading.classList.add('hero-text');
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
