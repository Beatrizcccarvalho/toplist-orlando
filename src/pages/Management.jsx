import React from 'react';

function Management() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Property Management</h1>
      <p className="mb-6">Learn about our property management services in Orlando.</p>
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Management Services</h2>
        <p className="mb-4">We offer comprehensive property management services for vacation homes and rental properties in the Orlando area.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>24/7 Guest Support</li>
          <li>Property Maintenance</li>
          <li>Marketing and Booking Management</li>
          <li>Cleaning and Housekeeping</li>
          <li>Revenue Optimization</li>
        </ul>
      </div>
    </div>
  );
}

export default Management; 