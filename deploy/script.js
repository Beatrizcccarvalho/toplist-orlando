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

// Implement smooth scrolling for anchor links
function setupSmoothScrolling() {
    // Select all navigation links that point to in-page sections (hash links)
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply smooth scrolling for hash links (links to sections within the page)
            if (href && href.startsWith('#') && href.length > 1) { // Make sure it's not just "#"
                e.preventDefault();
                
                // Get the target ID from the href attribute
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Get the height of the fixed header
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    
                    // Calculate the position to scroll to (accounting for fixed header)
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    // Smooth scroll to the target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash without jumping
                    history.pushState(null, null, href);
                }
            }
            // For normal page links (like guest.html), let the browser handle navigation naturally
        });
    });
    
    // Handle initial page load with hash in URL
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Wait for page to fully load before scrolling
            setTimeout(() => {
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 300);
        }
    }
    
    // Add active class to navigation links based on scroll position
    function updateActiveNavLinks() {
        // Get all sections
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100; // Add offset to trigger earlier
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Check if we're in this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to the corresponding nav link
                const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Update active links on scroll
    window.addEventListener('scroll', updateActiveNavLinks);
    
    // Initial update
    updateActiveNavLinks();
}

// Function to handle service card interactions
function setupServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Add enhanced hover effects that are handled by CSS now
        card.addEventListener('mouseenter', function() {
            // The animations are now handled by CSS
            console.log('Card hover effect active');
        });
        
        // Add click event to navigate to detail pages if needed
        card.addEventListener('click', function() {
            // For future implementation: Navigate to service detail pages
            // Currently just logging that the card was clicked
            console.log('Service card clicked');
        });
    });
}

// Function to setup complimentary extras carousel
function setupExtrasCarousel() {
    const carousel = document.querySelector('.container .relative.flex.justify-center');
    if (!carousel) return;
    
    const itemsContainer = carousel.querySelector('.flex.justify-center.gap-8');
    const items = carousel.querySelectorAll('.flex-none');
    const prevButton = carousel.querySelector('button:first-of-type');
    const nextButton = carousel.querySelector('button:last-of-type');
    
    if (!itemsContainer || items.length === 0 || !prevButton || !nextButton) {
        console.warn('Could not find all required elements for the extras carousel.');
        return;
    }
    
    let currentIndex = 0;
    let maxIndex = Math.max(0, items.length - 3); // Show 3 items at once on large screens
    
    // Update button states
    function updateNavButtons() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= maxIndex;
        
        prevButton.classList.toggle('opacity-50', currentIndex === 0);
        nextButton.classList.toggle('opacity-50', currentIndex >= maxIndex);
    }
    
    // Move the carousel
    function slideCarousel() {
        const itemWidth = items[0].offsetWidth + 32; // Width + gap
        itemsContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        updateNavButtons();
    }
    
    // Initialize
    updateNavButtons();
    
    // Add event listeners
    prevButton.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            slideCarousel();
        }
    });
    
    nextButton.addEventListener('click', function() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            slideCarousel();
        }
    });
    
    // Responsive handling
    const updateCarouselLayout = () => {
        // Adjust max index based on viewport width
        if (window.innerWidth >= 1024) { // Large screens
            maxIndex = Math.max(0, items.length - 3);
        } else if (window.innerWidth >= 768) { // Medium screens
            maxIndex = Math.max(0, items.length - 2);
        } else { // Small screens
            maxIndex = Math.max(0, items.length - 1);
        }
        
        // Reset position if needed
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        
        slideCarousel();
    };
    
    // Initial layout setup
    updateCarouselLayout();
    
    // Update on resize
    window.addEventListener('resize', updateCarouselLayout);
}

// Function to make the fixed header transparent at top and solid on scroll
function setupHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const updateHeaderStyle = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    // Initialize
    updateHeaderStyle();
    
    // Update on scroll
    window.addEventListener('scroll', updateHeaderStyle);
}

// Function to handle home section full height and responsive adjustments
function setupHomeSection() {
    const homeSection = document.getElementById('home');
    if (!homeSection) return;
    
    const adjustHomeHeight = () => {
        const windowHeight = window.innerHeight;
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        
        // Set home section height to full viewport minus header
        homeSection.style.height = `${windowHeight}px`;
        homeSection.style.minHeight = `${windowHeight}px`;
    };
    
    // Initialize
    adjustHomeHeight();
    
    // Update on resize
    window.addEventListener('resize', adjustHomeHeight);
}

// Function to handle the Load More Properties button
function setupLoadMoreProperties() {
    const loadMoreBtn = document.getElementById('load-more-properties');
    console.log('Load More Button:', loadMoreBtn); // Debug: check if button is found
    
    if (!loadMoreBtn) {
        console.error('Load More Properties button not found!');
        return { handleClick: function() { console.error('Button not found'); } };
    }

    // Sample properties data for demonstration
    const additionalProperties = [
        {
            image: 'images/properties/property-4.jpg',
            title: '4 Bedrooms / 3 Baths / Solara Resort',
            resort: 'Solara Resort • Entire home',
            guests: '10 guests • 6 beds • 3 baths',
            amenities: '<i class="fas fa-wifi"></i> <i class="fas fa-swimming-pool"></i>'
        },
        {
            image: 'images/properties/property-5.jpg',
            title: '3 Bedrooms / 2 Baths / Terra Verde',
            resort: 'Terra Verde Resort • Townhouse',
            guests: '8 guests • 5 beds • 2 baths',
            amenities: '<i class="fas fa-wifi"></i> <i class="fas fa-dumbbell"></i>'
        },
        {
            image: 'images/properties/property-6.jpg',
            title: '5 Bedrooms / 4 Baths / Fantasy World',
            resort: 'Fantasy World Resort • Entire home',
            guests: '12 guests • 7 beds • 4 baths',
            amenities: '<i class="fas fa-wifi"></i> <i class="fas fa-gamepad"></i>'
        }
    ];

    let propertiesLoaded = false;

    // Create a handleClick function that will be returned
    function handleClick() {
        console.log('Load More Button clicked!'); // Debug: confirm click event fired
        if (propertiesLoaded) return;
        
        const propertiesContainer = document.querySelector('#all-properties .grid');
        console.log('Properties Container:', propertiesContainer); // Debug: check if container is found
        
        if (!propertiesContainer) {
            console.error('Properties container not found!');
            return;
        }

        // Create and append new property cards
        additionalProperties.forEach(property => {
            const propertyCard = document.createElement('div');
            propertyCard.className = 'bg-gray-200 rounded-lg overflow-hidden shadow-md flex flex-col h-full min-h-[450px]';
            propertyCard.innerHTML = `
                <div class="relative h-64">
                    <img src="${property.image}" alt="${property.title}" class="w-full h-full object-cover">
                </div>
                <div class="p-6 flex flex-col flex-grow">
                    <div class="text-gray-700 mb-2">${property.title}</div>
                    <div class="text-gray-700 mb-2">${property.resort}</div>
                    <div class="text-gray-700 mb-2">${property.guests}</div>
                    <div class="text-gray-500 mb-4">${property.amenities}</div>
                    <div class="mt-auto">
                        <a href="property-details.html" class="bg-blue-900 text-white py-2 px-4 rounded-lg w-full block text-center view-details-btn">View Details</a>
                    </div>
                </div>
            `;
            propertiesContainer.appendChild(propertyCard);
            console.log('Added property card:', property.title); // Debug: confirm card added
        });

        // Mark as loaded and update button text
        propertiesLoaded = true;
        loadMoreBtn.textContent = 'All Properties Loaded';
        loadMoreBtn.classList.add('opacity-70');
        
        // Attach event listeners to new view details buttons
        setupViewDetailsButtons();
        console.log('Load more complete!'); // Debug: confirm function completed
    }

    // Add click event listener to the button
    loadMoreBtn.onclick = handleClick;
    loadMoreBtn.addEventListener('click', handleClick);
    
    console.log('Load More Properties button setup complete'); // Debug: confirm setup is complete
    
    // Return an object with methods that can be called from outside
    return {
        handleClick: handleClick
    };
}

// Enhanced function to handle View Details buttons
function setupViewDetailsButtons() {
    const viewDetailsButtons = document.querySelectorAll('a[href="property-details.html"], a[href="#property-details"], .view-details-btn');
    
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get property information from the parent card
            const propertyCard = button.closest('.flex-col');
            if (!propertyCard) return;
            
            // Get property title from the card
            const propertyTitle = propertyCard.querySelector('.text-gray-700')?.textContent || 'Property Details';
            
            // Navigate to property details page with property info
            window.location.href = 'property-details.html?property=' + encodeURIComponent(propertyTitle);
        });
    });
}

// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    showFadeSlides();
    setupSlideCarousel();
    
    // Search bar components
    setupResortDropdown();
    setupDatePicker();
    
    // Navigation
    setupSmoothScrolling();
    setupHeaderScroll();
    setupHomeSection();
    
    // Service cards
    setupServiceCards();
    
    // Extras carousel
    setupExtrasCarousel();
    
    // Add the new functionality
    setupLoadMoreProperties();
    setupViewDetailsButtons();
});

