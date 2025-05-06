import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';

function Home() {
  const [selectedResort, setSelectedResort] = useState('All Resorts');
  const [showResortDropdown, setShowResortDropdown] = useState(false);
  const [dates, setDates] = useState([]);
  const [guests, setGuests] = useState('');
  const [houseName, setHouseName] = useState('');
  const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);
  
  // Options state
  const [options, setOptions] = useState({
    bedrooms: '',
    bathrooms: '',
    pool: false,
    gameRoom: false,
    nearDisney: false
  });

  const resorts = [
    { value: 'all', label: 'All Resorts' },
    { value: 'fantasy-world', label: 'Fantasy World Resort' },
    { value: 'terra-verde', label: 'Terra Verde Resort' },
    { value: 'solara', label: 'Solara Resort' },
    { value: 'lake-berkley', label: 'Lake Berkley Resort' }
  ];

  const handleDateChange = (selectedDates) => {
    setDates(selectedDates);
  };

  const handleOptionChange = (option, value) => {
    setOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const handleSearch = () => {
    // Here you would implement the search functionality
    // This could involve navigating to a search results page with query parameters
    console.log({
      resort: selectedResort,
      dates,
      options,
      guests,
      houseName
    });
    // For now, we'll just log the search parameters
    alert('Search functionality would be implemented here');
  };

  return (
    <div className="bg-gray-100 font-sans">
      {/* Home Section with Full Video Background */}
      <section id="home" className="relative min-h-screen pt-28 hero-section">
        {/* Video Background */}
        <div className="video-background">
          <video autoPlay muted loop playsInline className="fullscreen-video">
            <source src="/images/carousel/background-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-dark-overlay"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center text-white mb-12">
            {/* Removed h1 and p tags */}
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row">
            {/* Resort Selector with dropdown */}
            <div className="search-bar-section resort-selector bg-blue-700 text-white py-3 px-6 font-semibold flex-1 relative">
              <div 
                className="dropdown-toggle flex items-center justify-between cursor-pointer w-full"
                onClick={() => setShowResortDropdown(!showResortDropdown)}
              >
                <span>{selectedResort}</span>
                <i className="fas fa-chevron-down ml-2"></i>
              </div>
              {showResortDropdown && (
                <div className="resort-dropdown absolute top-full left-0 mt-1 bg-white text-gray-800 rounded-md shadow-lg z-50 w-full border border-gray-200">
                  {resorts.map(resort => (
                    <div 
                      key={resort.value}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedResort(resort.label);
                        setShowResortDropdown(false);
                      }}
                    >
                      {resort.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Travel Dates with calendar */}
            <div className="search-bar-section travel-dates bg-blue-600 text-white py-3 px-6 font-semibold flex-1">
              <Flatpickr
                options={{
                  mode: 'range',
                  dateFormat: 'M d, Y',
                  minDate: 'today',
                  placeholder: 'Travel Dates'
                }}
                value={dates}
                onChange={handleDateChange}
                className="w-full bg-transparent outline-none cursor-pointer"
                placeholder="Travel Dates"
              />
            </div>

            {/* Options Dropdown */}
            <div className="search-bar-section options relative bg-blue-600 py-3 px-6 font-semibold flex-1 flex items-center justify-between cursor-pointer"
                 onClick={() => setShowOptionsDropdown(!showOptionsDropdown)}>
              <span>Options</span> 
              <i className="fas fa-chevron-down text-white"></i>
              
              {showOptionsDropdown && (
                <div className="options-dropdown absolute top-full left-0 mt-1 bg-white text-gray-800 rounded-md shadow-lg z-50 w-full p-4 border border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
                      <select 
                        className="w-full p-2 border border-gray-300 rounded" 
                        value={options.bedrooms}
                        onChange={(e) => handleOptionChange('bedrooms', e.target.value)}
                      >
                        <option value="">Any</option>
                        <option value="1-2">1-2</option>
                        <option value="3-4">3-4</option>
                        <option value="5-6">5-6</option>
                        <option value="7+">7+</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
                      <select 
                        className="w-full p-2 border border-gray-300 rounded" 
                        value={options.bathrooms}
                        onChange={(e) => handleOptionChange('bathrooms', e.target.value)}
                      >
                        <option value="">Any</option>
                        <option value="1-2">1-2</option>
                        <option value="3-4">3-4</option>
                        <option value="5+">5+</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="pool-option" 
                        className="h-4 w-4 text-blue-600" 
                        checked={options.pool}
                        onChange={(e) => handleOptionChange('pool', e.target.checked)}
                      />
                      <label htmlFor="pool-option" className="ml-2 text-sm text-gray-700">Private Pool</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="game-room-option" 
                        className="h-4 w-4 text-blue-600" 
                        checked={options.gameRoom}
                        onChange={(e) => handleOptionChange('gameRoom', e.target.checked)}
                      />
                      <label htmlFor="game-room-option" className="ml-2 text-sm text-gray-700">Game Room</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="disney-option" 
                        className="h-4 w-4 text-blue-600" 
                        checked={options.nearDisney}
                        onChange={(e) => handleOptionChange('nearDisney', e.target.checked)}
                      />
                      <label htmlFor="disney-option" className="ml-2 text-sm text-gray-700">Near Disney (Less than 5 miles)</label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Guests input field */}
            <div className="search-bar-section guests bg-white flex items-center px-6 font-semibold flex-1">
              <input 
                type="number" 
                min="1" 
                placeholder="Guests" 
                className="w-full outline-none text-black bg-transparent"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>

            {/* House name input field */}
            <div className="search-bar-section house bg-white flex items-center px-6 font-semibold flex-1">
              <input 
                type="text" 
                placeholder="House name" 
                className="w-full outline-none text-black bg-transparent"
                value={houseName}
                onChange={(e) => setHouseName(e.target.value)}
              />
            </div>

            <button 
              className="search-bar-section search-btn bg-red-400 text-white py-3 px-6 font-semibold flex-1 hover:bg-red-500 transition-colors"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-10 text-center">Our Add-ons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Add-on Card 1 - BBQ */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                  <source src="/AddsOn/BBQ.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">BBQ</h3>
                <p className="text-gray-600">
                  Have a BBQ with your family and friends during your stay.
                </p>
              </div>
            </div>
            
            {/* Add-on Card 2 - Pool Heat */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                  <source src="/AddsOn/Pool heat.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Pool Heat</h3>
                <p className="text-gray-600">
                  Keep your private pool at a comfortable temperature throughout your stay.
                </p>
              </div>
            </div>
            
            {/* Add-on Card 3 - Baby Items */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                  <source src="/AddsOn/Baby Items.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Baby Items</h3>
                <p className="text-gray-600">
                  Travel lighter with our baby equipment rental: cribs, high chairs, strollers, and more.
                </p>
              </div>
            </div>

            {/* Add-on Card 4 - Celebration */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                  <source src="/AddsOn/Celebration.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Celebration</h3>
                <p className="text-gray-600 text-sm">
                  Make your special occasion memorable with our celebration packages including decorations, cakes, and more.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/services" className="bg-blue-600 text-white py-2 px-6 rounded-lg inline-block hover:bg-blue-700 transition-colors">
              View All Add-ons
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section id="properties" className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-10 text-center">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Property Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-full min-h-[450px]">
              <div className="relative h-64">
                <img src="/images/properties/lake-berkley-house-1.jpg" alt="Lake Berkley Property" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-gray-700 mb-2">4 Bedrooms / 3 Baths / Lake Berkley</div>
                <div className="text-gray-700 mb-2">Lake Berkley Resort • Pool home</div>
                <div className="text-gray-700 mb-2">8 guests • 5 beds • 3 baths</div>
                <div className="text-gray-500 mb-4">
                  <i className="fas fa-wifi"></i> <i className="fas fa-swimming-pool ml-2"></i>
                </div>
                <div className="mt-auto">
                  <Link to="/property-details" className="bg-blue-900 text-white py-2 px-4 rounded-lg w-full block text-center">
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Property Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-full min-h-[450px]">
              <div className="relative h-64">
                <img src="/images/properties/terra-verde-exterior-3.jpg" alt="Terra Verde Property" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-gray-700 mb-2">6 Bedrooms / 5.5 Baths / Terra Verde</div>
                <div className="text-gray-700 mb-2">Terra Verde Resort • Entire home</div>
                <div className="text-gray-700 mb-2">16 guests • 9 beds • 2 baths</div>
                <div className="text-gray-500 mb-4">
                  <i className="fas fa-wifi"></i> <i className="fas fa-hot-tub ml-2"></i>
                </div>
                <div className="mt-auto">
                  <Link to="/property-details" className="bg-blue-900 text-white py-2 px-4 rounded-lg w-full block text-center">
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Property Card 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-full min-h-[450px]">
              <div className="relative h-64">
                <img src="/images/properties/solara-property.jpg" alt="Solara Resort Property" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-gray-700 mb-2">4 Bedrooms / 3.5 Baths / Solara</div>
                <div className="text-gray-700 mb-2">Solara Resort • Contemporary home</div>
                <div className="text-gray-700 mb-2">9 guests • 5 beds • 3.5 baths</div>
                <div className="text-gray-500 mb-4">
                  <i className="fas fa-wifi"></i> <i className="fas fa-gamepad ml-2"></i>
                </div>
                <div className="mt-auto">
                  <Link to="/property-details" className="bg-blue-900 text-white py-2 px-4 rounded-lg w-full block text-center">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/homes" className="bg-blue-900 text-white py-2 px-6 rounded-lg inline-block">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Resorts Section */}
      <section id="resorts" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-10 text-center">Our Resorts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Resort Card 1 */}
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md flex flex-col h-full min-h-[450px]">
              <div className="relative h-64">
                <img src="/images/resorts/fantasy-resort.jpg" alt="Fantasy World Resort" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-xl mb-2">Fantasy World Resort</h3>
                <div className="text-gray-700 mb-2">Premium resort with water park</div>
                <div className="text-gray-700 mb-2">3 miles to Disney World</div>
                <div className="text-gray-500 mb-4">
                  <i className="fas fa-swimming-pool mr-2"></i>
                  <i className="fas fa-wifi mr-2"></i>
                  <i className="fas fa-dumbbell"></i>
                </div>
                <div className="mt-auto">
                  <Link to="/resorts" className="bg-blue-900 text-white py-2 px-4 rounded-lg w-full block text-center">
                    View Homes
                  </Link>
                </div>
              </div>
            </div>

            {/* Resort Card 2 */}
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md flex flex-col h-full min-h-[450px]">
              <div className="relative h-64">
                <img src="/images/resorts/terra-verde-resort.jpg" alt="Terra Verde Resort" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-xl mb-2">Terra Verde Resort</h3>
                <div className="text-gray-700 mb-2">Gated resort with large pool</div>
                <div className="text-gray-700 mb-2">7 miles to Disney World</div>
                <div className="text-gray-500 mb-4">
                  <i className="fas fa-swimming-pool mr-2"></i>
                  <i className="fas fa-wifi mr-2"></i>
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div className="mt-auto">
                  <Link to="/resorts" className="bg-blue-900 text-white py-2 px-4 rounded-lg w-full block text-center">
                    View Homes
                  </Link>
                </div>
              </div>
            </div>

            {/* Resort Card 3 */}
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md flex flex-col h-full min-h-[450px]">
              <div className="relative h-64">
                <img src="/images/resorts/solara-resort.jpg" alt="Solara Resort" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-xl mb-2">Solara Resort</h3>
                <div className="text-gray-700 mb-2">Modern resort with water features</div>
                <div className="text-gray-700 mb-2">5 miles to Disney World</div>
                <div className="text-gray-500 mb-4">
                  <i className="fas fa-swimming-pool mr-2"></i>
                  <i className="fas fa-wifi mr-2"></i>
                  <i className="fas fa-futbol"></i>
                </div>
                <div className="mt-auto">
                  <Link to="/resorts" className="bg-blue-900 text-white py-2 px-4 rounded-lg w-full block text-center">
                    View Homes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-10 text-center">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                  <input type="text" id="name" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input type="email" id="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                  <input type="tel" id="phone" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                  <textarea id="message" rows="5" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-lg inline-block hover:bg-blue-700 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Our Location</h3>
                <p className="text-gray-600 mb-2">123 Vacation Way</p>
                <p className="text-gray-600 mb-2">Kissimmee, FL 34747</p>
                <p className="text-gray-600 mb-2">United States</p>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
                <p className="text-gray-600 mb-2">Phone: (407) 123-4567</p>
                <p className="text-gray-600 mb-2">Email: info@toplistorlando.com</p>
                <p className="text-gray-600 mb-2">Hours: Mon-Fri 9am-6pm ET</p>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-600 hover:text-blue-800 text-xl">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-800 text-xl">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-800 text-xl">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Management Section */}
      <section id="management" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-10 text-center">Property Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Maximize Your Vacation Home's Potential</h3>
              <p className="text-gray-600 mb-4">
                Our property management services are designed to maximize your vacation home's revenue potential while minimizing your involvement. With our local expertise and dedication to guest satisfaction, we'll handle everything from marketing to maintenance.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Professional photography and listing optimization</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Dynamic pricing strategy to maximize occupancy</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>24/7 guest support and communication</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Premium cleaning and maintenance services</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Regular property inspections and reporting</span>
                </li>
              </ul>
              <Link to="/management" className="bg-blue-600 text-white py-2 px-6 rounded-lg inline-block hover:bg-blue-700 transition-colors">
                Learn More
              </Link>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-center">Request Management Info</h3>
              <form>
                <div className="mb-4">
                  <label htmlFor="owner-name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                  <input type="text" id="owner-name" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="owner-email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input type="email" id="owner-email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="property-type" className="block text-gray-700 font-medium mb-2">Property Type</label>
                  <select id="property-type" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Property Type</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="villa">Villa</option>
                    <option value="house">Single Family Home</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="bedrooms" className="block text-gray-700 font-medium mb-2">Number of Bedrooms</label>
                  <select id="bedrooms" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Bedrooms</option>
                    <option value="1-2">1-2 Bedrooms</option>
                    <option value="3-4">3-4 Bedrooms</option>
                    <option value="5-6">5-6 Bedrooms</option>
                    <option value="7+">7+ Bedrooms</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                  Request Information
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; 