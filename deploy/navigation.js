// Enhanced navigation functionality for TopList Vacations website

// Function to implement smooth scrolling for all anchor links
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
}

// Function to update active navigation links based on scroll position
function setupActiveNavLinks() {
    // Get all sections
    const sections = document.querySelectorAll('section[id]');
    
    // Function to update active nav links
    function updateActiveNavLinks() {
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

// Function to fix the "View Details" buttons navigation
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

// Function to make the logo clickable to return to home page
function setupLogoNavigation() {
    const logoLinks = document.querySelectorAll('.logo-link');
    
    logoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If on index.html and clicking logo, scroll to top
            if (href === '#home' || href === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                history.pushState(null, null, '#home');
            }
            // Otherwise, let the browser handle navigation to index.html
        });
    });
}

// Initialize all navigation features
document.addEventListener('DOMContentLoaded', function() {
    setupSmoothScrolling();
    setupActiveNavLinks();
    setupViewDetailsButtons();
    setupHeaderScroll();
    setupLogoNavigation();
    
    console.log('Enhanced navigation initialized');
}); 