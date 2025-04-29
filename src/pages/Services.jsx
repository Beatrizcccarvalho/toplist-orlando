import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Services() {
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for contact form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
  });

  // Categories for filtering
  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'equipment', label: 'Equipment Rental' },
    { id: 'celebration', label: 'Celebration' },
  ];

  const services = [
    {
      title: "Have a BBQ with your family and friends during your stay.",
      video: "/images/services/BBQ.mp4",
      category: "amenities"
    },
    {
      title: "Keep your private pool at a comfortable temperature throughout your stay.",
      video: "/images/services/BBQ.mp4",
      category: "amenities"
    },
    {
      title: "Travel lighter with our baby equipment rental: cribs, high chairs, strollers, and more.",
      video: "/images/services/BBQ.mp4",
      category: "equipment"
    },
    {
      title: "Make your special occasion memorable with our celebration packages including decorations, cakes, and more.",
      video: "/images/services/BBQ.mp4",
      category: "celebration"
    }
  ];

  const managementServices = [
    {
      title: "OCCUPANCY",
      description: "Strive for top-tier performance by maintaining occupancy rates above 80%",
      icon: (
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5zm2 4h10v2H7v-2zm0 4h7v2H7v-2z" />
      )
    },
    {
      title: "PERFORMANCE",
      description: "Maximize your property's earning potential with our data-driven performance optimization strategies.",
      icon: (
        <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99l1.5 1.5z" />
      )
    },
    {
      title: "HOME CARE",
      description: "Professional property maintenance and enhanced cleaning protocols to keep your property in pristine condition.",
      icon: (
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      )
    }
  ];

  // Filter services based on category and search query
  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      serviceType: '',
      message: '',
    });
  };

  return (
    <div className="pt-16">
      {/* Filter Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === category.id
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          <div className="w-full md:w-auto">
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Services Cards with Tooltips */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredServices.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden relative h-64">
              <div className="p-4 absolute top-0 left-0 right-0 z-20 bg-white bg-opacity-90">
                <h3 className="font-bold text-lg mb-0">{service.title}</h3>
              </div>
              <div className="absolute inset-0 z-10">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                  <source src={service.video} type="video/mp4" />
                </video>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Request Form */}
      <div className="container mx-auto px-4 py-12 bg-white rounded-lg shadow-md my-12">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Request a Service</h2>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="serviceType" className="block text-gray-700 mb-2">Service Type</label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a service</option>
                <option value="bbq">BBQ</option>
                <option value="pool">Pool Heating</option>
                <option value="equipment">Equipment Rental</option>
                <option value="celebration">Celebration Package</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-blue-700 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>

      {/* Service Description Section */}
      <div className="container mx-auto px-4 py-12 bg-white rounded-lg shadow-md my-12">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Enhance Your Stay</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
          At Toplist Vacations, we understand that the little details make a big difference in your vacation experience. 
          Our array of additional services is designed to make your stay as comfortable and enjoyable as possible. 
          From heating your private pool to providing essential baby equipment, we've got everything covered.
        </p>
        <div className="text-center">
          <Link to="/contact" className="inline-block bg-blue-700 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-800 transition">
            Contact Us for More Information
          </Link>
        </div>
      </div>

      {/* Property Management Services Section */}
      <div className="container mx-auto px-4 py-12 bg-white rounded-lg shadow-md my-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Property Management Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {managementServices.map((service, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg h-full">
              <div className="bg-blue-100 p-8 flex flex-col items-center justify-center">
                <svg className="w-12 h-12 text-blue-700 mb-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  {service.icon}
                </svg>
                <h3 className="text-blue-900 text-lg font-bold uppercase">{service.title}</h3>
              </div>
              <div className="bg-blue-700 p-6">
                <h3 className="text-white text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-white">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Complimentary Extras Section */}
      <div className="container mx-auto px-4 py-16 bg-white">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Complimentary Extras</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
          Enjoy a host of free & convenient perks during every stay. (Note: Select add-ons
          - including patio grill use, stroller or crib rentals, and pool heat for your villa's
          private pool - incur a small fee)
        </p>
        
        <div className="relative flex justify-center my-12">
          {/* Carousel Navigation */}
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-teal-300 text-white h-10 w-10 rounded-full flex items-center justify-center z-10 hover:bg-teal-400">
            <i className="fas fa-chevron-left"></i>
          </button>
          
          {/* Carousel Items */}
          <div className="flex justify-center gap-8 w-full max-w-5xl overflow-hidden">
            {/* Add carousel items here */}
          </div>
          
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-teal-300 text-white h-10 w-10 rounded-full flex items-center justify-center z-10 hover:bg-teal-400">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Services; 