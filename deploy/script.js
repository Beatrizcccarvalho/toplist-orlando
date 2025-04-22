// Register Service Worker for offline capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(function(error) {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// Service worker event listeners for offline/online status
window.addEventListener('online', function() {
    console.log('Back online');
    // Sync any offline data if needed
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then(function(registration) {
            if ('sync' in registration) {
                registration.sync.register('sync-forms');
            }
        });
    }
});

window.addEventListener('offline', function() {
    console.log('Gone offline');
    // Show offline notification if needed
    if (document.querySelector('.offline-notification') === null) {
        const notification = document.createElement('div');
        notification.className = 'offline-notification';
        notification.textContent = 'You are offline. Some features may be unavailable.';
        notification.style.position = 'fixed';
        notification.style.top = '0';
        notification.style.left = '0';
        notification.style.right = '0';
        notification.style.backgroundColor = '#f8d7da';
        notification.style.color = '#721c24';
        notification.style.padding = '0.75rem';
        notification.style.textAlign = 'center';
        notification.style.zIndex = '9999';
        document.body.appendChild(notification);
        
        // Remove notification when back online
        window.addEventListener('online', function removeNotification() {
            notification.remove();
            window.removeEventListener('online', removeNotification);
        });
    }
});

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

        // Check if we're on mobile
        const isMobile = window.innerWidth < 768;

        // Initialize flatpickr date range picker
        const datePicker = flatpickr(dateRangePickerInput, {
            mode: 'range',
            minDate: 'today',
            dateFormat: 'Y-m-d',
            position: 'auto',
            allowInput: false,
            static: true,
            disableMobile: false, // Allow native mobile experience when needed
            appendTo: isMobile ? document.body : undefined, // Append to body on mobile for better positioning
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
                    // On mobile, append to body and center
                    if (isMobile) {
                    document.body.appendChild(calendarElem);
                        calendarElem.style.position = "fixed";
                        calendarElem.style.top = "50%";
                        calendarElem.style.left = "50%";
                        calendarElem.style.transform = "translate(-50%, -50%)";
                        calendarElem.style.maxWidth = "90vw";
                    }
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
    // Select all navigation links in the header
    const navLinks = document.querySelectorAll('header nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply smooth scrolling for hash links (links to sections within the page)
            if (href && href.startsWith('#')) { // Check if href exists and starts with #
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
                }
            } 
            // For normal page links (like guest.html or links on other pages), let the browser handle navigation naturally
        });
    });
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
    
    if (!itemsContainer || !items.length || !prevButton || !nextButton) return;
    
    let currentPosition = 0;
    const itemWidth = 280; // Width + gap
    const visibleItems = Math.floor(itemsContainer.offsetWidth / itemWidth);
    const maxPosition = Math.max(0, items.length - visibleItems);
    
    // Update navigation button states
    function updateNavButtons() {
        prevButton.disabled = currentPosition <= 0;
        prevButton.style.opacity = prevButton.disabled ? '0.5' : '1';
        
        nextButton.disabled = currentPosition >= maxPosition;
        nextButton.style.opacity = nextButton.disabled ? '0.5' : '1';
    }
    
    // Slide the carousel to the current position
    function slideCarousel() {
        const offset = currentPosition * -itemWidth;
        itemsContainer.style.transform = `translateX(${offset}px)`;
        updateNavButtons();
    }
    
    // Add event listeners to navigation buttons
    prevButton.addEventListener('click', () => {
        if (currentPosition > 0) {
            currentPosition--;
            slideCarousel();
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (currentPosition < maxPosition) {
            currentPosition++;
            slideCarousel();
        }
    });
    
    // Initialize the carousel
    itemsContainer.style.transition = 'transform 0.5s ease';
    updateNavButtons();
    
    // Handle window resize events
    window.addEventListener('resize', () => {
        const newVisibleItems = Math.floor(itemsContainer.offsetWidth / itemWidth);
        const newMaxPosition = Math.max(0, items.length - newVisibleItems);
        
        // Adjust current position if needed
        if (currentPosition > newMaxPosition) {
            currentPosition = newMaxPosition;
            slideCarousel();
        }
        
        // Update max position
        maxPosition = newMaxPosition;
        updateNavButtons();
    });
}

// Ensure window scrolls properly
window.addEventListener('load', function() {
    // Delay to ensure DOM is fully loaded
    setTimeout(() => {
        // Force a small scroll to activate the scrolling mechanism
        window.scrollBy(0, 1);
        window.scrollBy(0, -1);
        
        console.log('Window loaded, scroll reset');
    }, 500);
});

// Handle responsive layout
function handleResponsiveLayout() {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    // Get relevant elements
    const mainSearchBar = document.getElementById('main-search-bar');
    const navContainer = document.querySelector('header .container');
    const headerButtons = document.querySelector('header .flex.space-x-2');
    
    // Apply responsive classes based on screen size
    if (isMobile) {
        // Ensure search bar is stacked vertically on mobile
        if (mainSearchBar) {
            mainSearchBar.style.flexDirection = 'column';
            mainSearchBar.style.borderRadius = '1rem';
            
            // Make each section full width
            const sections = mainSearchBar.querySelectorAll('.search-bar-section');
            sections.forEach(section => {
                section.style.width = '100%';
            });
        }
        
        // Make the header more compact
        if (navContainer) {
            navContainer.style.flexDirection = 'column';
            navContainer.style.padding = '0.5rem';
        }
        
        // Ensure buttons are visible
        if (headerButtons) {
            headerButtons.style.width = '100%';
            headerButtons.style.justifyContent = 'center';
            headerButtons.style.marginTop = '0.5rem';
        }
    } else {
        // Reset styles for larger screens
        if (mainSearchBar) {
            mainSearchBar.style.flexDirection = 'row';
            
            const sections = mainSearchBar.querySelectorAll('.search-bar-section');
            sections.forEach(section => {
                section.style.width = '';
            });
        }
        
        if (navContainer) {
            navContainer.style.flexDirection = isTablet ? 'column' : 'row';
            navContainer.style.padding = '';
        }
        
        if (headerButtons) {
            headerButtons.style.width = isTablet ? '100%' : '';
            headerButtons.style.justifyContent = isTablet ? 'center' : '';
            headerButtons.style.marginTop = isTablet ? '0.5rem' : '';
        }
    }
}

// Main initialization
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

    // Handle fixed header transparency when scrolling
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Set the home section to take the full viewport height
    const adjustHomeHeight = () => {
        const homeSection = document.getElementById('home');
        if (homeSection) {
            const headerHeight = document.querySelector('header').offsetHeight;
            homeSection.style.height = `calc(100vh - ${headerHeight}px)`;
            // Ensure the video fills the entire home section
            const videoBackground = document.querySelector('.video-background');
            if (videoBackground) {
                videoBackground.style.height = '100vh';
            }
        }
    };
    
    // Run on load and resize
    adjustHomeHeight();
    window.addEventListener('resize', adjustHomeHeight);

    // Initialize smooth scrolling
    setupSmoothScrolling(); // Re-enabled smooth scrolling

    // Setup service cards interaction
    setupServiceCards();
    
    // Setup complimentary extras carousel
    setupExtrasCarousel();

    // Handle responsive layout
    handleResponsiveLayout();

    // Load more properties functionality
    setupLoadMoreProperties();

    // Setup explore buttons
    setupExploreButtons();
    
    // Initialize property detail buttons - make sure View Details buttons work
    setupPropertyDetailButtons();

    // Mobile Menu Toggle
    if (!document.querySelector('.mobile-menu-btn')) {
        const header = document.querySelector('header');
        const nav = document.querySelector('header nav');
        
        if (header && nav) {
            // Create mobile menu button
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
            mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
            
            // Insert before nav
            header.insertBefore(mobileMenuBtn, nav);
            
            // Add mobile classes to nav
            nav.classList.add('mobile-nav');
            
            // Toggle menu on button click
            mobileMenuBtn.addEventListener('click', function() {
                nav.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!nav.contains(event.target) && !mobileMenuBtn.contains(event.target) && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            });
        }
    }
    
    // Responsive behavior for search bar
    const searchBar = document.getElementById('main-search-bar');
    if (searchBar) {
        const resizeSearchBar = function() {
            if (window.innerWidth <= 768) {
                const searchSections = searchBar.querySelectorAll('.search-bar-section');
                searchSections.forEach(section => {
                    section.addEventListener('click', function() {
                        // Close any open dropdowns before opening this one
                        searchSections.forEach(s => {
                            if (s !== section && s.classList.contains('active')) {
                                s.classList.remove('active');
                            }
                        });
                        
                        section.classList.toggle('active');
                    });
                });
                
                // Close dropdowns when clicking outside
                document.addEventListener('click', function(event) {
                    if (!searchBar.contains(event.target)) {
                        searchSections.forEach(section => {
                            section.classList.remove('active');
                        });
                    }
                });
            }
        };
        
        resizeSearchBar();
        window.addEventListener('resize', resizeSearchBar);
    }
    
    // Improve touch experience for carousels
    const improveCarouselTouchExperience = function() {
        const carousels = document.querySelectorAll('.carousel');
        carousels.forEach(carousel => {
            let startX, scrollLeft, isDragging = false;
            
            carousel.addEventListener('mousedown', function(e) {
                isDragging = true;
                startX = e.pageX - carousel.offsetLeft;
                scrollLeft = carousel.scrollLeft;
            });
            
            carousel.addEventListener('touchstart', function(e) {
                isDragging = true;
                startX = e.touches[0].pageX - carousel.offsetLeft;
                scrollLeft = carousel.scrollLeft;
            });
            
            carousel.addEventListener('mouseleave', function() {
                isDragging = false;
            });
            
            carousel.addEventListener('mouseup', function() {
                isDragging = false;
            });
            
            carousel.addEventListener('touchend', function() {
                isDragging = false;
            });
            
            carousel.addEventListener('mousemove', function(e) {
                if (!isDragging) return;
                e.preventDefault();
                const x = e.pageX - carousel.offsetLeft;
                const walk = (x - startX) * 2; // Adjust scrolling speed
                carousel.scrollLeft = scrollLeft - walk;
            });
            
            carousel.addEventListener('touchmove', function(e) {
                if (!isDragging) return;
                const x = e.touches[0].pageX - carousel.offsetLeft;
                const walk = (x - startX) * 2;
                carousel.scrollLeft = scrollLeft - walk;
            });
        });
    };
    
    improveCarouselTouchExperience();

    // User Preferences Manager
    const UserPrefs = {
        // Keys for local storage
        keys: {
            lastResort: 'toplist_last_resort',
            lastDates: 'toplist_last_dates',
            visitCount: 'toplist_visit_count',
            colorScheme: 'toplist_color_scheme',
            videoAutoplay: 'toplist_video_autoplay'
        },
        
        // Save the last selected resort
        saveLastResort: function(resort) {
            if (resort) {
                localStorage.setItem(this.keys.lastResort, resort);
            }
        },
        
        // Get the last selected resort
        getLastResort: function() {
            return localStorage.getItem(this.keys.lastResort);
        },
        
        // Save the last selected date range
        saveLastDates: function(startDate, endDate) {
            if (startDate && endDate) {
                const dateRange = {
                    start: startDate,
                    end: endDate
                };
                localStorage.setItem(this.keys.lastDates, JSON.stringify(dateRange));
            }
        },
        
        // Get the last selected date range
        getLastDates: function() {
            const savedDates = localStorage.getItem(this.keys.lastDates);
            return savedDates ? JSON.parse(savedDates) : null;
        },
        
        // Increment visit count
        incrementVisitCount: function() {
            let count = parseInt(localStorage.getItem(this.keys.visitCount) || '0');
            count++;
            localStorage.setItem(this.keys.visitCount, count.toString());
            return count;
        },
        
        // Get visit count
        getVisitCount: function() {
            return parseInt(localStorage.getItem(this.keys.visitCount) || '0');
        },
        
        // Save color scheme preference (light/dark)
        saveColorScheme: function(scheme) {
            if (scheme === 'light' || scheme === 'dark') {
                localStorage.setItem(this.keys.colorScheme, scheme);
            }
        },
        
        // Get color scheme preference
        getColorScheme: function() {
            return localStorage.getItem(this.keys.colorScheme) || 'light';
        },
        
        // Save video autoplay preference
        saveVideoAutoplay: function(autoplay) {
            localStorage.setItem(this.keys.videoAutoplay, autoplay ? 'true' : 'false');
        },
        
        // Get video autoplay preference
        getVideoAutoplay: function() {
            return localStorage.getItem(this.keys.videoAutoplay) === 'true';
        },
        
        // Clear all preferences
        clearAll: function() {
            Object.values(this.keys).forEach(key => {
                localStorage.removeItem(key);
            });
        }
    };

    // Apply user preferences on page load
    function applyUserPreferences() {
        // Increment visit count
        const visitCount = UserPrefs.incrementVisitCount();
        
        // If returning visitor, apply saved preferences
        if (visitCount > 1) {
            console.log('Welcome back! Visit count:', visitCount);
            
            // Apply last resort selection if available
            const lastResort = UserPrefs.getLastResort();
            if (lastResort) {
                const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
                dropdownToggles.forEach(dropdownToggle => {
                    const selectedResortText = dropdownToggle.querySelector('span');
                    const resortOptions = dropdownToggle.closest('.resort-selector').querySelectorAll('.resort-dropdown div');
                    
                    resortOptions.forEach(option => {
                        if (option.getAttribute('data-value') === lastResort) {
                            selectedResortText.textContent = option.textContent;
                            dropdownToggle.parentElement.setAttribute('data-selected', lastResort);
                        }
                    });
                });
            }
            
            // Apply last dates selection if available
            const lastDates = UserPrefs.getLastDates();
            if (lastDates) {
                const dateRangeToggles = document.querySelectorAll('#date-range-toggle');
                if (dateRangeToggles.length > 0 && typeof flatpickr === 'function') {
                    dateRangeToggles.forEach(dateRangeToggle => {
                        const dateRangePickerContainer = dateRangeToggle.closest('.travel-dates');
                        if (dateRangePickerContainer) {
                            const dateRangePickerInput = dateRangePickerContainer.querySelector('#date-range-picker');
                            if (dateRangePickerInput && dateRangePickerInput._flatpickr) {
                                dateRangePickerInput._flatpickr.setDate([lastDates.start, lastDates.end]);
                            }
                        }
                    });
                }
            }
            
            // Apply video autoplay preference
            const videoAutoplay = UserPrefs.getVideoAutoplay();
            const videos = document.querySelectorAll('video');
            videos.forEach(video => {
                if (!videoAutoplay) {
                    video.autoplay = false;
                    video.pause();
                }
            });
        }
    }

    // Apply saved preferences
    applyUserPreferences();
    
    // Save resort selection when changed
    const resortOptions = document.querySelectorAll('.resort-dropdown div');
    resortOptions.forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            UserPrefs.saveLastResort(value);
        });
    });
    
    // Save date selection when changed
    if (typeof flatpickr === 'function') {
        const dateRangePickerInputs = document.querySelectorAll('#date-range-picker');
        dateRangePickerInputs.forEach(input => {
            if (input._flatpickr) {
                input._flatpickr.config.onChange.push(function(selectedDates) {
                    if (selectedDates.length === 2) {
                        UserPrefs.saveLastDates(
                            selectedDates[0].toISOString(),
                            selectedDates[1].toISOString()
                        );
                    }
                });
            }
        });
    }

    // Add scroll-to-top button
    addScrollToTopButton();
    
    // Enhance swipe support for galleries
    enhanceSwipeSupport();
    
    // Add home screen prompt
    addHomeScreenPrompt();
});

// Add resize event listener
window.addEventListener('resize', function() {
    handleResponsiveLayout();
});

// Load more properties functionality
function setupLoadMoreProperties() {
    const loadMoreBtn = document.getElementById('load-more-properties');
    if (!loadMoreBtn) return;

    let loaded = false; // ensures only one load for demo

    loadMoreBtn.addEventListener('click', function() {
        if (loaded) return;
        const container = loadMoreBtn.closest('#all-properties').querySelector('.grid');
        if (!container) return;

        const propertiesToAdd = [
            {
                img: 'images/properties/Solara/Solara house.jpeg',
                title: '4 Bedrooms / 3 Baths / Solara',
                subtitle: 'Solara Resort • Pool Home',
                details: '9 guests • 5 beds • 3 baths',
                id: 'solara-added'
            },
            {
                img: 'images/properties/Fantasy/Fantasy Property.jpg',
                title: '2 Bedrooms / 2 Baths / Fantasy World',
                subtitle: 'Fantasy World Resort • Townhouse',
                details: '6 guests • 4 beds • 2 baths',
                id: 'fantasy-added'
            },
            {
                img: 'images/properties/Terra Verde/property-2.jpg',
                title: '6 Bedrooms / 5.5 Baths / Terra Verde',
                subtitle: 'Terra Verde Resort • Entire Home',
                details: '16 guests • 9 beds • 5.5 baths',
                id: 'terra-verde-added'
            }
        ];

        propertiesToAdd.forEach(prop => {
            const card = document.createElement('div');
            card.className = 'bg-gray-200 rounded-lg overflow-hidden shadow-md flex flex-col h-full min-h-[450px]';
            card.innerHTML = `
                <div class="relative h-64">
                    <img src="${prop.img}" class="w-full h-full object-cover" alt="${prop.title}">
                </div>
                <div class="p-6 flex flex-col flex-grow">
                    <div class="text-gray-700 mb-2">${prop.title}</div>
                    <div class="text-gray-700 mb-2">${prop.subtitle}</div>
                    <div class="text-gray-700 mb-2">${prop.details}</div>
                    <div class="text-gray-500 mb-4"><i class='fas fa-wifi'></i></div>
                    <div class="mt-auto">
                        <a href="#" data-property-id="${prop.id}" class="bg-blue-900 text-white py-2 px-4 rounded-lg w-full block text-center view-details-btn">View Details</a>
                    </div>
                </div>`;
            container.appendChild(card);
            
            // Add click event to the new button
            const newButton = card.querySelector('.view-details-btn');
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                const propertyId = this.getAttribute('data-property-id');
                showPropertyDetails(propertyId);
            });
        });

        loaded = true;
        loadMoreBtn.style.display = 'none';
        
        console.log('Added new property cards with working View Details buttons');
    });
}

// Enhanced Property details functionality
function showPropertyDetails(propertyId) {
    // Prevent scrolling of the background when modal is open
    document.body.style.overflow = 'hidden';
    
    // Property data - in a real implementation, this would come from a database
    const propertyData = {
        'lake-berkley': {
            name: 'Lake Berkley Resort - 4BR Pool Home',
            description: 'This beautiful 4-bedroom pool home in Lake Berkley Resort features spacious living areas, a private pool, and access to resort amenities including tennis courts, clubhouse, and a fishing lake.',
            amenities: ['Private Pool', 'Free WiFi', 'Fully Equipped Kitchen', 'Resort Facilities', 'Gated Community'],
            capacity: '8 guests · 4 bedrooms · 6 beds · 3 bathrooms',
            images: [
                'images/properties/Lake Berkley/Lake Berkley house.jpeg',
                'images/properties/Lake Berkley/Lake Berkley lake.jpeg',
                'images/properties/Lake Berkley/Lake Berkley resort.jpeg',
                'images/resorts/Lake Berkley/Lake Berkley Resort view 2.jpeg'
            ],
            price: 'From $179/night'
        },
        'terra-verde': {
            name: 'Terra Verde Resort - 6BR Luxury Villa',
            description: 'This luxurious 6-bedroom villa in Terra Verde Resort offers premium accommodations with a private pool, game room, and access to resort amenities including a clubhouse, fitness center, and community pool.',
            amenities: ['Private Pool', 'Game Room', 'Free WiFi', 'Resort Facilities', 'Gated Community'],
            capacity: '12 guests · 6 bedrooms · 8 beds · 5.5 bathrooms',
            images: [
                'images/properties/Terra Verde/Terra Verde house.jpeg',
                'images/properties/Terra Verde/property-2.jpg',
                'images/properties/Terra Verde/Terra Verde pool.jpeg',
                'images/resorts/Terra Verde/terra-verde-resort.jpg'
            ],
            price: 'From $269/night'
        },
        'solara': {
            name: 'Solara Resort - 4BR Contemporary Home',
            description: 'This modern 4-bedroom home in Solara Resort features stylish design, a private splash pool, and access to resort amenities including a water park, fitness center, and sports courts.',
            amenities: ['Private Splash Pool', 'Free WiFi', 'Resort Water Park', 'Sports Facilities', 'Contemporary Design'],
            capacity: '9 guests · 4 bedrooms · 5 beds · 3 bathrooms',
            images: [
                'images/properties/Solara/Solara house.jpeg',
                'images/properties/Solara/Solara Resort.jpeg',
                'images/properties/Solara/Solara pool.jpeg',
                'images/resorts/Solara/Solara Resort view.jpg'
            ],
            price: 'From $199/night'
        },
        'fantasy': {
            name: 'Fantasy World Resort - 2BR Townhouse',
            description: 'This cozy 2-bedroom townhouse in Fantasy World Resort offers comfortable accommodations with access to resort amenities including a lazy river, water slides, and mini-golf.',
            amenities: ['Resort Water Park', 'Free WiFi', 'Fully Equipped Kitchen', 'Mini-Golf', 'Close to Disney'],
            capacity: '6 guests · 2 bedrooms · 4 beds · 2 bathrooms',
            images: [
                'images/properties/Fantasy/Fantasy Property.jpg',
                'images/properties/Fantasy/Fantasy World Resort.jpeg',
                'images/properties/Fantasy/Fantasy World lazy river.jpeg',
                'images/resorts/Fantasy/Fantasy Resort .jpg'
            ],
            price: 'From $139/night'
        },
        'terra-verde-2': {
            name: 'Terra Verde Resort - 6BR Family Villa',
            description: 'This family-friendly 6-bedroom villa in Terra Verde Resort features a private pool, game room, and access to resort amenities including a clubhouse, playground, and community pool.',
            amenities: ['Private Pool', 'Game Room', 'Free WiFi', 'Resort Facilities', 'Gated Community'],
            capacity: '14 guests · 6 bedrooms · 10 beds · 5.5 bathrooms',
            images: [
                'images/properties/Terra Verde/Terra Verde house.jpeg',
                'images/properties/Terra Verde/Terra Verde pool.jpeg',
                'images/properties/Terra Verde/Terra Verde clubhouse.jpeg',
                'images/properties/Terra Verde/property-2.jpg'
            ],
            price: 'From $259/night'
        },
        'lake-berkley-2': {
            name: 'Lake Berkley Resort - 4BR Lakefront Home',
            description: 'This stunning 4-bedroom lakefront home in Lake Berkley Resort offers beautiful water views, a private pool, and access to resort amenities including tennis courts, playground, and fishing lake.',
            amenities: ['Lakefront Views', 'Private Pool', 'Free WiFi', 'Resort Facilities', 'Gated Community'],
            capacity: '10 guests · 4 bedrooms · 6 beds · 3 bathrooms',
            images: [
                'images/properties/Lake Berkley/Lake Berkley house.jpeg',
                'images/properties/Lake Berkley/Lake Berkley lake.jpeg',
                'images/properties/Lake Berkley/Lake Berkley resort.jpeg',
                'images/resorts/Lake Berkley/Lake Berkley Resort view 2.jpeg'
            ],
            price: 'From $189/night'
        },
        'solara-added': {
            name: 'Solara Resort - 4BR Luxury Pool Home (Added)',
            description: 'This luxury 4-bedroom home in Solara Resort features high-end finishes, a private pool, and access to resort amenities including a water park, restaurant, and sports facilities.',
            amenities: ['Private Pool', 'Free WiFi', 'Resort Water Park', 'High-End Finishes', 'Gated Community'],
            capacity: '9 guests · 4 bedrooms · 5 beds · 3 bathrooms',
            images: [
                'images/properties/Solara/Solara house.jpeg',
                'images/properties/Solara/Solara pool.jpeg',
                'images/properties/Solara/Solara Resort.jpeg',
                'images/resorts/Solara/Solara Resort view.jpg'
            ],
            price: 'From $209/night'
        },
        'fantasy-added': {
            name: 'Fantasy World Resort - 2BR Deluxe Townhouse (Added)',
            description: 'This deluxe 2-bedroom townhouse in Fantasy World Resort offers upgraded accommodations with access to resort amenities including water slides, pools, and mini-golf.',
            amenities: ['Resort Water Park', 'Free WiFi', 'Upgraded Interiors', 'Mini-Golf', 'Close to Attractions'],
            capacity: '6 guests · 2 bedrooms · 4 beds · 2 bathrooms',
            images: [
                'images/properties/Fantasy/Fantasy Property.jpg',
                'images/properties/Fantasy/Fantasy World Resort.jpeg',
                'images/properties/Fantasy/Fantasy World lazy river.jpeg',
                'images/resorts/Fantasy/Fantasy Resort .jpg'
            ],
            price: 'From $149/night'
        },
        'terra-verde-added': {
            name: 'Terra Verde Resort - 6BR Premium Villa (Added)',
            description: 'This premium 6-bedroom villa in Terra Verde Resort features luxury furnishings, a private pool with spa, and access to resort amenities including a clubhouse, fitness center, and community pool.',
            amenities: ['Private Pool with Spa', 'Game Room', 'Free WiFi', 'Resort Facilities', 'Luxury Furnishings'],
            capacity: '16 guests · 6 bedrooms · 9 beds · 5.5 bathrooms',
            images: [
                'images/properties/Terra Verde/Terra Verde house.jpeg',
                'images/properties/Terra Verde/property-2.jpg',
                'images/properties/Terra Verde/Terra Verde pool.jpeg',
                'images/resorts/Terra Verde/terra-verde-resort.jpg'
            ],
            price: 'From $279/night'
        }
    };
    
    // Get property data or show error
    const property = propertyData[propertyId];
    if (!property) {
        alert('Property information not available');
        return;
    }
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'property-modal-overlay';
    modalOverlay.style.position = 'fixed';
    modalOverlay.style.top = '0';
    modalOverlay.style.left = '0';
    modalOverlay.style.width = '100%';
    modalOverlay.style.height = '100%';
    modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modalOverlay.style.zIndex = '9999';
    modalOverlay.style.display = 'flex';
    modalOverlay.style.justifyContent = 'center';
    modalOverlay.style.alignItems = 'center';
    modalOverlay.style.opacity = '0';
    modalOverlay.style.transition = 'opacity 0.3s ease';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'property-modal-content';
    modalContent.style.backgroundColor = 'white';
    modalContent.style.borderRadius = '8px';
    modalContent.style.maxWidth = '900px';
    modalContent.style.width = '90%';
    modalContent.style.maxHeight = '90vh';
    modalContent.style.overflow = 'auto';
    modalContent.style.position = 'relative';
    modalContent.style.transform = 'translateY(20px)';
    modalContent.style.transition = 'transform 0.3s ease';
    modalContent.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    
    // Close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '15px';
    closeButton.style.right = '15px';
    closeButton.style.fontSize = '24px';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.style.zIndex = '10';
    closeButton.style.width = '30px';
    closeButton.style.height = '30px';
    closeButton.style.display = 'flex';
    closeButton.style.justifyContent = 'center';
    closeButton.style.alignItems = 'center';
    closeButton.style.color = '#333';
    closeButton.addEventListener('click', function() {
        closePropertyModal(modalOverlay);
    });
    modalContent.appendChild(closeButton);
    
    // Create property content HTML
    const imageSlider = createImageSlider(property.images);
    
    const propertyDetails = document.createElement('div');
    propertyDetails.className = 'property-details';
    propertyDetails.style.padding = '20px';
    
    propertyDetails.innerHTML = `
        <h2 style="color: var(--primary-blue); margin-bottom: 10px; font-size: 1.8rem;">${property.name}</h2>
        <div style="color: #777; margin-bottom: 15px;">${property.capacity}</div>
        <div style="display: flex; margin-bottom: 20px; flex-wrap: wrap;">
            ${property.amenities.map(amenity => 
                `<span style="background-color: #f1f5fa; padding: 5px 10px; margin: 0 5px 5px 0; border-radius: 4px; font-size: 0.9rem;">${amenity}</span>`
            ).join('')}
        </div>
        <p style="line-height: 1.6; margin-bottom: 20px;">${property.description}</p>
        <div style="font-weight: bold; color: var(--primary-blue); font-size: 1.2rem; margin-bottom: 20px;">${property.price}</div>
        <a href="#" class="book-now-btn" style="display: inline-block; background-color: var(--primary-blue); color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none; font-weight: bold;">Book Now</a>
    `;
    
    // Add image slider and details to modal
    modalContent.appendChild(imageSlider);
    modalContent.appendChild(propertyDetails);
    
    // Add modal content to overlay
    modalOverlay.appendChild(modalContent);
    
    // Add to document
    document.body.appendChild(modalOverlay);
    
    // Force reflow before animation
    void modalOverlay.offsetWidth;
    
    // Animate in
    modalOverlay.style.opacity = '1';
    modalContent.style.transform = 'translateY(0)';
    
    // Close modal when clicking outside
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closePropertyModal(modalOverlay);
        }
    });
    
    // Close modal when pressing ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePropertyModal(modalOverlay);
        }
    });
    
    // Book Now button action
    const bookNowBtn = modalContent.querySelector('.book-now-btn');
    bookNowBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert(`Redirecting to booking page for ${property.name}`);
        closePropertyModal(modalOverlay);
        // In a real implementation, redirect to a booking page
        // window.location.href = `booking.html?id=${propertyId}`;
    });
}

// Helper function to create an image slider for the property modal
function createImageSlider(images) {
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'property-image-slider';
    sliderContainer.style.position = 'relative';
    sliderContainer.style.height = '350px'; // Taller for better visibility
    sliderContainer.style.overflow = 'hidden';
    sliderContainer.style.borderTopLeftRadius = '8px';
    sliderContainer.style.borderTopRightRadius = '8px';
    sliderContainer.style.boxShadow = 'inset 0 -10px 10px -10px rgba(0,0,0,0.1)';
    
    // Add loading state
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'slider-loading';
    loadingIndicator.style.position = 'absolute';
    loadingIndicator.style.top = '0';
    loadingIndicator.style.left = '0';
    loadingIndicator.style.width = '100%';
    loadingIndicator.style.height = '100%';
    loadingIndicator.style.backgroundColor = '#f5f5f5';
    loadingIndicator.style.display = 'flex';
    loadingIndicator.style.justifyContent = 'center';
    loadingIndicator.style.alignItems = 'center';
    loadingIndicator.style.zIndex = '4';
    loadingIndicator.innerHTML = '<div style="width: 40px; height: 40px; border: 3px solid #eee; border-radius: 50%; border-top-color: var(--primary-blue); animation: spin 1s infinite linear;"></div>';
    loadingIndicator.innerHTML += '<style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>';
    sliderContainer.appendChild(loadingIndicator);
    
    // Main image display
    const imageDisplay = document.createElement('div');
    imageDisplay.className = 'image-display';
    imageDisplay.style.height = '100%';
    imageDisplay.style.display = 'flex';
    imageDisplay.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Track loaded images
    let loadedImages = 0;
    
    // Add all images to the slider
    images.forEach((imgSrc, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.style.minWidth = '100%';
        imgContainer.style.height = '100%';
        imgContainer.style.position = 'relative';
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `Property image ${index + 1}`;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // Handle image loading
        img.onload = function() {
            img.style.opacity = '1';
            loadedImages++;
            
            // Remove loading indicator when all images are loaded
            if (loadedImages === images.length) {
                loadingIndicator.style.display = 'none';
            }
        };
        
        img.onerror = function() {
            // Handle image loading error
            img.src = 'images/placeholder.jpg'; // Fallback image
            img.style.opacity = '1';
            loadedImages++;
            
            if (loadedImages === images.length) {
                loadingIndicator.style.display = 'none';
            }
        };
        
        imgContainer.appendChild(img);
        imageDisplay.appendChild(imgContainer);
    });
    
    sliderContainer.appendChild(imageDisplay);
    
    // Add image counter
    const imageCounter = document.createElement('div');
    imageCounter.className = 'image-counter';
    imageCounter.style.position = 'absolute';
    imageCounter.style.bottom = '15px';
    imageCounter.style.right = '15px';
    imageCounter.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    imageCounter.style.color = 'white';
    imageCounter.style.padding = '5px 10px';
    imageCounter.style.borderRadius = '20px';
    imageCounter.style.fontSize = '14px';
    imageCounter.style.zIndex = '5';
    imageCounter.textContent = `1 / ${images.length}`;
    sliderContainer.appendChild(imageCounter);
    
    // Create dots indicators
    if (images.length > 1) {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'dots-container';
        dotsContainer.style.position = 'absolute';
        dotsContainer.style.bottom = '15px';
        dotsContainer.style.left = '0';
        dotsContainer.style.right = '0';
        dotsContainer.style.display = 'flex';
        dotsContainer.style.justifyContent = 'center';
        dotsContainer.style.gap = '5px';
        dotsContainer.style.zIndex = '5';
        
        for (let i = 0; i < images.length; i++) {
            const dot = document.createElement('span');
            dot.className = i === 0 ? 'dot active' : 'dot';
            dot.style.width = '8px';
            dot.style.height = '8px';
            dot.style.borderRadius = '50%';
            dot.style.backgroundColor = i === 0 ? 'white' : 'rgba(255, 255, 255, 0.5)';
            dot.style.cursor = 'pointer';
            dot.style.transition = 'background-color 0.3s ease';
            
            dot.addEventListener('click', () => goToSlide(i));
            
            dotsContainer.appendChild(dot);
        }
        
        sliderContainer.appendChild(dotsContainer);
    }
    
    // Create navigation buttons
    if (images.length > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'slider-prev-btn';
        prevBtn.innerHTML = '&#10094;';
        prevBtn.style.position = 'absolute';
        prevBtn.style.top = '50%';
        prevBtn.style.left = '10px';
        prevBtn.style.transform = 'translateY(-50%)';
        prevBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        prevBtn.style.color = '#333';
        prevBtn.style.border = 'none';
        prevBtn.style.borderRadius = '50%';
        prevBtn.style.width = '40px';
        prevBtn.style.height = '40px';
        prevBtn.style.fontSize = '18px';
        prevBtn.style.cursor = 'pointer';
        prevBtn.style.zIndex = '5';
        prevBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        prevBtn.style.display = 'flex';
        prevBtn.style.justifyContent = 'center';
        prevBtn.style.alignItems = 'center';
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'slider-next-btn';
        nextBtn.innerHTML = '&#10095;';
        nextBtn.style.position = 'absolute';
        nextBtn.style.top = '50%';
        nextBtn.style.right = '10px';
        nextBtn.style.transform = 'translateY(-50%)';
        nextBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        nextBtn.style.color = '#333';
        nextBtn.style.border = 'none';
        nextBtn.style.borderRadius = '50%';
        nextBtn.style.width = '40px';
        nextBtn.style.height = '40px';
        nextBtn.style.fontSize = '18px';
        nextBtn.style.cursor = 'pointer';
        nextBtn.style.zIndex = '5';
        nextBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        nextBtn.style.display = 'flex';
        nextBtn.style.justifyContent = 'center';
        nextBtn.style.alignItems = 'center';
        
        // Slider navigation logic
        let currentSlide = 0;
        
        function goToSlide(index) {
            // Update current slide index
            currentSlide = index;
            
            // Handle wrapping
            if (currentSlide < 0) currentSlide = images.length - 1;
            if (currentSlide >= images.length) currentSlide = 0;
            
            // Move slider
            imageDisplay.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update counter
            imageCounter.textContent = `${currentSlide + 1} / ${images.length}`;
            
            // Update dots
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                dot.style.backgroundColor = i === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.5)';
                dot.className = i === currentSlide ? 'dot active' : 'dot';
            });
        }
        
        // Button event listeners
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });
        
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });
        
        // Add hover effects to buttons
        [prevBtn, nextBtn].forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                this.style.transform = 'translateY(-50%) scale(1.1)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                this.style.transform = 'translateY(-50%) scale(1)';
            });
        });
        
        // Add buttons to container
        sliderContainer.appendChild(prevBtn);
        sliderContainer.appendChild(nextBtn);
        
        // Add keyboard navigation
        sliderContainer.tabIndex = 0; // Make focusable
        sliderContainer.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                goToSlide(currentSlide - 1);
            } else if (e.key === 'ArrowRight') {
                goToSlide(currentSlide + 1);
            }
        });
        
        // Add swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
        });
        
        sliderContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const diff = touchEndX - touchStartX;
            if (diff > 50) {
                // Swipe right, go to previous slide
                goToSlide(currentSlide - 1);
                
                // Add haptic feedback if available
                if (window.navigator.vibrate) {
                    window.navigator.vibrate(50);
                }
            } else if (diff < -50) {
                // Swipe left, go to next slide
                goToSlide(currentSlide + 1);
                
                // Add haptic feedback if available
                if (window.navigator.vibrate) {
                    window.navigator.vibrate(50);
                }
            }
        }
        
        // Auto-advance slides
        let slideInterval;
        
        function startSlideShow() {
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
        }
        
        function stopSlideShow() {
            clearInterval(slideInterval);
        }
        
        // Start slideshow
        startSlideShow();
        
        // Pause slideshow on hover/touch
        sliderContainer.addEventListener('mouseenter', stopSlideShow);
        sliderContainer.addEventListener('touchstart', stopSlideShow);
        
        // Resume slideshow when mouse leaves
        sliderContainer.addEventListener('mouseleave', startSlideShow);
        sliderContainer.addEventListener('touchend', function() {
            // Wait a bit to restart slideshow after touch to avoid conflicts with swipe
            setTimeout(startSlideShow, 1000);
        });
    }
    
    return sliderContainer;
}

// Helper function to close property modal
function closePropertyModal(modalOverlay) {
    const modalContent = modalOverlay.querySelector('.property-modal-content');
    modalOverlay.style.opacity = '0';
    modalContent.style.transform = 'translateY(20px)';
    
    // Re-enable scrolling
    document.body.style.overflow = '';
    
    // Remove modal after animation completes
    setTimeout(() => {
        document.body.removeChild(modalOverlay);
    }, 300);
}

// Setup property detail buttons
function setupPropertyDetailButtons() {
    console.log('Setting up property detail buttons');
    
    // Find all View Details buttons in both Featured Properties and All Properties sections
    const viewDetailsButtons = document.querySelectorAll('.bg-blue-900.text-white.py-2.px-4.rounded-lg.w-full.block.text-center');
    
    viewDetailsButtons.forEach(button => {
        console.log('Found View Details button:', button);
        
        // Check if the button already has the onclick attribute (from HTML)
        const existingOnclick = button.getAttribute('onclick');
        
        if (existingOnclick && existingOnclick.includes('showPropertyDetails')) {
            // Button already has onclick handler, no need to add another
            console.log('Button already has onclick handler:', existingOnclick);
            
            // Extract the property ID from the onclick attribute
            const propertyIdMatch = existingOnclick.match(/showPropertyDetails\('([^']+)'\)/);
            if (propertyIdMatch && propertyIdMatch[1]) {
                const propertyId = propertyIdMatch[1];
                console.log('Property ID from onclick:', propertyId);
                
                // Add data attribute for easier access
                button.setAttribute('data-property-id', propertyId);
            }
        } else {
            // Add click event listener for buttons without onclick attribute
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const propertyId = this.getAttribute('data-property-id');
                if (propertyId) {
                    console.log('Showing property details for:', propertyId);
                    showPropertyDetails(propertyId);
                } else {
                    console.error('No property ID found for this button');
                }
            });
        }
    });
    
    // Handle dynamically added buttons from "Load More Properties"
    const loadMoreBtn = document.getElementById('load-more-properties');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Wait a short time for the new buttons to be added to the DOM
            setTimeout(() => {
                // Re-run setup for newly added buttons
                const newButtons = document.querySelectorAll('.bg-blue-900.text-white.py-2.px-4.rounded-lg.w-full.block.text-center:not([data-property-id])');
                
                newButtons.forEach(button => {
                    const existingOnclick = button.getAttribute('onclick');
                    
                    if (existingOnclick && existingOnclick.includes('showPropertyDetails')) {
                        const propertyIdMatch = existingOnclick.match(/showPropertyDetails\('([^']+)'\)/);
                        if (propertyIdMatch && propertyIdMatch[1]) {
                            const propertyId = propertyIdMatch[1];
                            button.setAttribute('data-property-id', propertyId);
                        }
                    }
                });
            }, 300);
        });
    }
}

// Ensure the Explore All Resorts button uses smooth scrolling
function setupExploreButtons() {
    // Handle the Explore All Resorts button
    const exploreResortsBtn = document.getElementById('explore-all-resorts-btn');
    if (exploreResortsBtn) {
        exploreResortsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Redirect to the dedicated resorts page
            window.location.href = 'resorts.html';
        });
    }
    
    // Make "View Homes" buttons in resort cards scroll to properties section
    const viewHomesButtons = document.querySelectorAll('.bg-gray-200 a[href="#all-properties"]');
    viewHomesButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const propertiesSection = document.getElementById('all-properties');
            if (propertiesSection) {
                propertiesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Responsive image loading - load smaller images on mobile
function responsiveImageLoader() {
    const images = document.querySelectorAll('[data-src-mobile]');
    const loadAppropriateImages = function() {
        const isMobile = window.innerWidth <= 768;
        
        images.forEach(img => {
            if (isMobile && img.getAttribute('data-src-mobile')) {
                if (img.src !== img.getAttribute('data-src-mobile')) {
                    img.src = img.getAttribute('data-src-mobile');
                }
            } else if (!isMobile && img.getAttribute('data-src')) {
                if (img.src !== img.getAttribute('data-src')) {
                    img.src = img.getAttribute('data-src');
                }
            }
        });
    };
    
    loadAppropriateImages();
    window.addEventListener('resize', loadAppropriateImages);
}

// Initialize responsive image loading
document.addEventListener('DOMContentLoaded', responsiveImageLoader);

// Optimize page loading performance for mobile
function optimizePageLoading() {
    const isMobile = window.innerWidth <= 768;
    
    // Function to lazy load images
    function lazyLoadImages() {
        const lazyImages = document.querySelectorAll('img[data-src], img[data-src-mobile]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Load appropriate image based on screen size
                        if (isMobile && img.getAttribute('data-src-mobile')) {
                            img.src = img.getAttribute('data-src-mobile');
                        } else if (img.getAttribute('data-src')) {
                            img.src = img.getAttribute('data-src');
                        }
                        
                        // Stop observing after loading
                        observer.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            lazyImages.forEach(img => {
                if (isMobile && img.getAttribute('data-src-mobile')) {
                    img.src = img.getAttribute('data-src-mobile');
                } else if (img.getAttribute('data-src')) {
                    img.src = img.getAttribute('data-src');
                }
            });
        }
    }
    
    // Defer non-critical CSS
    function deferNonCriticalCSS() {
        const nonCriticalCSS = document.querySelectorAll('link[data-defer]');
        
        nonCriticalCSS.forEach(link => {
            const href = link.getAttribute('href');
            
            // Create a new link element
            const newLink = document.createElement('link');
            newLink.rel = 'stylesheet';
            newLink.href = href;
            
            // Add to document head
            document.head.appendChild(newLink);
            
            // Remove the placeholder
            link.parentNode.removeChild(link);
        });
    }
    
    // Optimize videos on mobile
    function optimizeVideos() {
        if (isMobile) {
            const videos = document.querySelectorAll('video');
            
            videos.forEach(video => {
                // Lower resolution for mobile
                const source = video.querySelector('source');
                if (source && source.getAttribute('data-src-mobile')) {
                    source.src = source.getAttribute('data-src-mobile');
                    video.load();
                }
                
                // Set to low quality preload
                video.preload = 'metadata';
                
                // Only load when visible
                video.setAttribute('loading', 'lazy');
                
                // Pause all videos on mobile by default
                video.autoplay = false;
                video.pause();
                
                // Play video when it comes into view
                if ('IntersectionObserver' in window) {
                    const videoObserver = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                // Check if user has turned off autoplay
                                const autoplayAllowed = localStorage.getItem('toplist_video_autoplay') !== 'false';
                                if (autoplayAllowed) {
                                    entry.target.play().catch(e => console.log('Error playing video:', e));
                                }
                            } else {
                                entry.target.pause();
                            }
                        });
                    });
                    
                    videoObserver.observe(video);
                }
            });
        }
    }
    
    // Initialize performance optimizations
    lazyLoadImages();
    deferNonCriticalCSS();
    optimizeVideos();
    
    // Add video autoplay toggle button for mobile users
    if (isMobile) {
        const videos = document.querySelectorAll('video');
        if (videos.length > 0) {
            const autoplayAllowed = localStorage.getItem('toplist_video_autoplay') !== 'false';
            
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'video-autoplay-toggle';
            toggleBtn.innerHTML = autoplayAllowed ? 'Pause Videos' : 'Play Videos';
            toggleBtn.style.position = 'fixed';
            toggleBtn.style.bottom = '5rem';
            toggleBtn.style.right = '2rem';
            toggleBtn.style.zIndex = '1000';
            toggleBtn.style.backgroundColor = 'rgba(30, 58, 138, 0.8)';
            toggleBtn.style.color = 'white';
            toggleBtn.style.padding = '0.5rem 1rem';
            toggleBtn.style.borderRadius = '0.25rem';
            toggleBtn.style.border = 'none';
            toggleBtn.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
            
            toggleBtn.addEventListener('click', function() {
                const currentState = localStorage.getItem('toplist_video_autoplay') !== 'false';
                const newState = !currentState;
                
                localStorage.setItem('toplist_video_autoplay', newState ? 'true' : 'false');
                this.innerHTML = newState ? 'Pause Videos' : 'Play Videos';
                
                videos.forEach(video => {
                    if (newState) {
                        video.play().catch(e => console.log('Error playing video:', e));
                    } else {
                        video.pause();
                    }
                });
            });
            
            document.body.appendChild(toggleBtn);
        }
    }
}

// Call optimization function on load
document.addEventListener('DOMContentLoaded', optimizePageLoading);

// Add scroll-to-top functionality for mobile
function addScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.position = 'fixed';
    scrollBtn.style.bottom = '80px';
    scrollBtn.style.right = '20px';
    scrollBtn.style.width = '40px';
    scrollBtn.style.height = '40px';
    scrollBtn.style.borderRadius = '50%';
    scrollBtn.style.backgroundColor = 'var(--primary-blue)';
    scrollBtn.style.color = 'white';
    scrollBtn.style.border = 'none';
    scrollBtn.style.fontSize = '20px';
    scrollBtn.style.display = 'none';
    scrollBtn.style.justifyContent = 'center';
    scrollBtn.style.alignItems = 'center';
    scrollBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    scrollBtn.style.zIndex = '999';
    scrollBtn.style.cursor = 'pointer';
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    // Scroll to top with smooth behavior
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add better swipe gesture support for galleries
function enhanceSwipeSupport() {
    const galleries = document.querySelectorAll('.flex.justify-center.gap-8, .carousel-slide.flex');
    
    galleries.forEach(gallery => {
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;
        
        // Handle touch start
        gallery.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });
        
        // Handle touch end
        gallery.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe(gallery);
        });
        
        // Process swipe direction
        function handleSwipe(gallery) {
            // Calculate horizontal and vertical distance
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;
            
            // Only consider horizontal swipes (not diagonal)
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe right - go to previous
                    const prevBtn = gallery.closest('.relative')?.querySelector('button:first-of-type');
                    if (prevBtn && !prevBtn.disabled) {
                        prevBtn.click();
                        // Add haptic feedback on supported devices
                        if (window.navigator.vibrate) {
                            window.navigator.vibrate(50);
                        }
                    }
                } else {
                    // Swipe left - go to next
                    const nextBtn = gallery.closest('.relative')?.querySelector('button:last-of-type');
                    if (nextBtn && !nextBtn.disabled) {
                        nextBtn.click();
                        // Add haptic feedback on supported devices
                        if (window.navigator.vibrate) {
                            window.navigator.vibrate(50);
                        }
                    }
                }
            }
        }
    });
}

// Add "Add to Home Screen" prompt for mobile
function addHomeScreenPrompt() {
    // Only show on mobile devices
    if (window.innerWidth <= 768) {
        // Check if already installed or prompted
        const hasPrompted = localStorage.getItem('pwa_prompted');
        
        if (!hasPrompted) {
            // Wait until user has interacted with the page
            window.addEventListener('scroll', showPromptAfterInteraction, { once: true });
        }
    }
    
    function showPromptAfterInteraction() {
        // Wait 3 seconds after first scroll
        setTimeout(() => {
            // Create prompt element
            const promptContainer = document.createElement('div');
            promptContainer.style.position = 'fixed';
            promptContainer.style.bottom = '0';
            promptContainer.style.left = '0';
            promptContainer.style.right = '0';
            promptContainer.style.backgroundColor = 'white';
            promptContainer.style.padding = '1rem';
            promptContainer.style.boxShadow = '0 -2px 10px rgba(0,0,0,0.1)';
            promptContainer.style.zIndex = '1000';
            promptContainer.style.display = 'flex';
            promptContainer.style.flexDirection = 'column';
            promptContainer.style.alignItems = 'center';
            promptContainer.style.transition = 'transform 0.3s ease';
            promptContainer.style.transform = 'translateY(100%)';
            
            promptContainer.innerHTML = `
                <div style="font-weight: bold; margin-bottom: 0.5rem;">Add to Home Screen</div>
                <div style="margin-bottom: 1rem;">Add this website to your home screen for quick access!</div>
                <div style="display: flex; gap: 1rem; width: 100%; justify-content: center;">
                    <button id="pwa-close" style="padding: 0.5rem 1rem; border: 1px solid #ccc; background: white; border-radius: 0.25rem;">Not Now</button>
                    <button id="pwa-install" style="padding: 0.5rem 1rem; background: var(--primary-blue); color: white; border: none; border-radius: 0.25rem;">Add</button>
                </div>
            `;
            
            document.body.appendChild(promptContainer);
            
            // Animate in
            setTimeout(() => {
                promptContainer.style.transform = 'translateY(0)';
            }, 100);
            
            // Handle close button
            document.getElementById('pwa-close').addEventListener('click', function() {
                promptContainer.style.transform = 'translateY(100%)';
                setTimeout(() => {
                    promptContainer.remove();
                }, 300);
                localStorage.setItem('pwa_prompted', 'true');
            });
            
            // Handle install button - show instructions based on browser
            document.getElementById('pwa-install').addEventListener('click', function() {
                let instructions = '';
                
                if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
                    instructions = 'To add to Home Screen: tap <strong>Share</strong> icon and choose <strong>Add to Home Screen</strong>';
                } else if (/Android/.test(navigator.userAgent)) {
                    instructions = 'To add to Home Screen: tap the menu button and choose <strong>Add to Home Screen</strong>';
                } else {
                    instructions = 'To add to Home Screen: open your browser menu and select the install option';
                }
                
                promptContainer.innerHTML = `
                    <div style="margin-bottom: 1rem;">${instructions}</div>
                    <button id="pwa-got-it" style="padding: 0.5rem 1rem; background: var(--primary-blue); color: white; border: none; border-radius: 0.25rem;">Got it!</button>
                `;
                
                document.getElementById('pwa-got-it').addEventListener('click', function() {
                    promptContainer.style.transform = 'translateY(100%)';
                    setTimeout(() => {
                        promptContainer.remove();
                    }, 300);
                    localStorage.setItem('pwa_prompted', 'true');
                });
            });
        }, 3000);
    }
}
