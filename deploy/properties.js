// Properties.js - Handles property loading and details functionality

// Track if additional properties have been loaded
let propertiesLoaded = false;

// Direct implementation for the View Homes buttons
window.viewHomesForResort = function(resortName) {
    console.log('View homes function called for:', resortName);
    
    // Load more properties if not already loaded
    if (!propertiesLoaded) {
        loadMoreProperties();
    }
    
    // Scroll to the properties section
    const propertiesSection = document.getElementById('all-properties');
    if (propertiesSection) {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        window.scrollTo({
            top: propertiesSection.offsetTop - headerHeight,
            behavior: 'smooth'
        });
        
        // Filter properties
        filterPropertiesByResort(resortName);
    }
};

// Direct implementation for the Explore All Resorts button
window.exploreAllResorts = function() {
    console.log('Explore all resorts function called');
    
    // Create resort details overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
    overlay.id = 'resorts-overlay';
    
    // Get resort data from the DOM
    const resorts = [];
    const resortCards = document.querySelectorAll('#resorts .flex-col');
    
    resortCards.forEach(card => {
        const name = card.querySelector('h3')?.textContent.trim() || 'Resort';
        const image = card.querySelector('img')?.src || '';
        const description = card.querySelector('.text-gray-700:nth-child(2)')?.textContent || '';
        const location = card.querySelector('.text-gray-700:nth-child(3)')?.textContent || '';
        const amenities = card.querySelector('.text-gray-500')?.innerHTML || '';
        
        // Only add if we don't already have this resort
        if (!resorts.some(r => r.name === name)) {
            resorts.push({ name, image, description, location, amenities });
        }
    });
    
    // Create the HTML content
    let resortsHtml = '';
    resorts.forEach(resort => {
        resortsHtml += `
            <div class="bg-gray-100 rounded-lg p-6 flex flex-col md:flex-row gap-6 mb-6">
                <div class="w-full md:w-1/3">
                    <img src="${resort.image}" alt="${resort.name}" class="w-full h-64 object-cover rounded-lg">
                </div>
                <div class="w-full md:w-2/3">
                    <h3 class="text-2xl font-bold text-blue-900 mb-2">${resort.name}</h3>
                    <p class="text-gray-700 mb-2">${resort.description}</p>
                    <p class="text-gray-700 mb-4">${resort.location}</p>
                    <div class="text-gray-500 mb-6">
                        ${resort.amenities}
                    </div>
                    <button class="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800" 
                            onclick="window.viewHomesForResort('${resort.name}'); document.getElementById('resorts-overlay').remove(); document.body.style.overflow = '';">
                        View Available Homes
                    </button>
                </div>
            </div>
        `;
    });
    
    // Create overlay content
    overlay.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-blue-900">Our Resorts</h2>
                <button id="close-overlay" class="text-2xl text-gray-500 hover:text-gray-800"
                        onclick="document.getElementById('resorts-overlay').remove(); document.body.style.overflow = '';">
                    &times;
                </button>
            </div>
            <div id="resorts-detail-container" class="space-y-4">
                ${resortsHtml}
            </div>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(overlay);
    
    // Prevent scrolling on the main page
    document.body.style.overflow = 'hidden';
    
    // Add click to close on backdrop
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            document.body.style.overflow = '';
            overlay.remove();
        }
    });
};

// Function to load more properties - called directly from the button
function loadMoreProperties() {
    console.log('Load More Properties function called');
    if (propertiesLoaded) return;
    
    const propertiesContainer = document.querySelector('#all-properties .grid');
    if (!propertiesContainer) {
        console.error('Properties container not found!');
        return;
    }
    
    // Additional properties data
    const additionalProperties = [
        {
            image: 'images/properties/Solara/Solara house.jpeg',
            title: '4 Bedrooms / 3 Baths / Solara Resort',
            resort: 'Solara Resort • Entire home',
            guests: '10 guests • 6 beds • 3 baths',
            amenities: '<i class="fas fa-wifi"></i> <i class="fas fa-swimming-pool"></i>'
        },
        {
            image: 'images/properties/Terra Verde/property-2.jpg',
            title: '3 Bedrooms / 2 Baths / Terra Verde',
            resort: 'Terra Verde Resort • Townhouse',
            guests: '8 guests • 5 beds • 2 baths',
            amenities: '<i class="fas fa-wifi"></i> <i class="fas fa-dumbbell"></i>'
        },
        {
            image: 'images/properties/Fantasy/Fantasy Property.jpg',
            title: '5 Bedrooms / 4 Baths / Fantasy World',
            resort: 'Fantasy World Resort • Entire home',
            guests: '12 guests • 7 beds • 4 baths',
            amenities: '<i class="fas fa-wifi"></i> <i class="fas fa-gamepad"></i>'
        }
    ];
    
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
        console.log('Added property card:', property.title);
    });
    
    // Mark as loaded and update button text
    propertiesLoaded = true;
    const loadMoreBtn = document.getElementById('load-more-properties');
    if (loadMoreBtn) {
        loadMoreBtn.textContent = 'All Properties Loaded';
        loadMoreBtn.classList.add('opacity-70');
    }
    
    // Setup view details buttons for new cards
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const propertyCard = button.closest('.flex-col');
            if (!propertyCard) return;
            const propertyTitle = propertyCard.querySelector('.text-gray-700')?.textContent || 'Property Details';
            window.location.href = 'property-details.html?property=' + encodeURIComponent(propertyTitle);
        });
    });
    
    console.log('Load more properties completed!');
}

// Function to filter properties by resort name
function filterPropertiesByResort(resortName) {
    // Normalize resort name for comparison
    const normalizedResortName = resortName.toLowerCase().replace(' resort', '').trim();
    console.log('Filtering by resort:', normalizedResortName);
    
    // Get all property cards
    const propertyCards = document.querySelectorAll('#all-properties .flex-col');
    
    // Count how many properties match the filter
    let matchCount = 0;
    
    // Show all properties initially
    propertyCards.forEach(card => {
        card.style.display = 'flex';
        
        // If a specific resort is selected (not "All Resorts"), check if it matches
        if (normalizedResortName && normalizedResortName !== 'all') {
            const propertyResortText = card.querySelector('.text-gray-700:nth-child(2)')?.textContent.toLowerCase() || '';
            
            if (!propertyResortText.includes(normalizedResortName)) {
                card.style.display = 'none';
            } else {
                matchCount++;
            }
        }
    });
    
    // If a specific resort is selected
    if (normalizedResortName && normalizedResortName !== 'all') {
        // Update heading to show filtered resort
        const propertiesHeading = document.querySelector('#all-properties h2');
        if (propertiesHeading) {
            propertiesHeading.textContent = `${resortName} Properties`;
        }
    } else {
        // Reset heading if no filter
        const propertiesHeading = document.querySelector('#all-properties h2');
        if (propertiesHeading) {
            propertiesHeading.textContent = 'All Properties';
        }
    }
    
    // Update the properties container to show a message if no matches
    const propertiesContainer = document.querySelector('#all-properties .grid');
    const noResultsMessage = document.getElementById('no-results-message');
    
    if (matchCount === 0) {
        if (!noResultsMessage) {
            const message = document.createElement('div');
            message.id = 'no-results-message';
            message.className = 'col-span-3 text-center py-8';
            message.innerHTML = `
                <p class="text-lg text-gray-600">No properties found for ${resortName}. Please try another resort or contact us for more options.</p>
                <button class="mt-4 bg-blue-900 text-white py-2 px-6 rounded-lg" onclick="resetPropertyFilter()">View All Properties</button>
            `;
            propertiesContainer.appendChild(message);
        }
    } else if (noResultsMessage) {
        noResultsMessage.remove();
    }
}

// Function to reset property filters
function resetPropertyFilter() {
    const propertyCards = document.querySelectorAll('#all-properties .flex-col');
    propertyCards.forEach(card => {
        card.style.display = 'flex';
    });
    
    const propertiesHeading = document.querySelector('#all-properties h2');
    if (propertiesHeading) {
        propertiesHeading.textContent = 'All Properties';
    }
    
    const noResultsMessage = document.getElementById('no-results-message');
    if (noResultsMessage) {
        noResultsMessage.remove();
    }
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded - initializing properties.js');
    
    // Add functionality to View Homes buttons
    const viewHomesButtons = document.querySelectorAll('#resorts a[href="#all-properties"]');
    viewHomesButtons.forEach(button => {
        const resortCard = button.closest('.flex-col');
        if (resortCard) {
            const resortName = resortCard.querySelector('h3')?.textContent.trim() || '';
            // Update href and add onclick
            button.setAttribute('href', 'javascript:void(0);');
            button.setAttribute('onclick', `window.viewHomesForResort('${resortName}')`);
        }
    });
    
    // Set up Explore All Resorts button
    const exploreResortsBtn = document.querySelector('a[href="#resorts"].bg-blue-900');
    if (exploreResortsBtn) {
        exploreResortsBtn.setAttribute('href', 'javascript:void(0);');
        exploreResortsBtn.setAttribute('onclick', 'window.exploreAllResorts()');
    }
    
    // Attach click event to the Load More Properties button
    const loadMoreBtn = document.getElementById('load-more-properties');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProperties);
        console.log('Load more button ready with event listener');
    }
    
    console.log('Resort buttons initialized with direct implementation');
}); 