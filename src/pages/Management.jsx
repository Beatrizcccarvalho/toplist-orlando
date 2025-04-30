import React from 'react';

function Management() {
  // Define management services data
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

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Property Management</h1>
        <p className="text-lg mb-8">Learn about our property management services in Orlando.</p>
        
        {/* Property Management Services Cards Section */}
        <div className="bg-blue-50 p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Property Management Services</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
            Our comprehensive property management services help maximize your rental property's potential while minimizing your involvement.
          </p>
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
        
        {/* Our Management Services Details Section */}
        <div className="bg-gray-100 p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-semibold mb-6">Our Management Services</h2>
          <p className="mb-6">We offer comprehensive property management services for vacation homes and rental properties in the Orlando area.</p>
          <ul className="list-disc pl-5 space-y-3">
            <li>24/7 Guest Support</li>
            <li>Property Maintenance</li>
            <li>Marketing and Booking Management</li>
            <li>Cleaning and Housekeeping</li>
            <li>Revenue Optimization</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Management; 