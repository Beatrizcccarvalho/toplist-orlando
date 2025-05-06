import React from 'react';

function Guest() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Guest Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-bold mb-2">Luxury Villa - Orlando</h3>
                <p className="mb-1"><span className="font-semibold">Check-in:</span> May 15, 2023</p>
                <p className="mb-1"><span className="font-semibold">Check-out:</span> May 22, 2023</p>
                <p className="mb-2"><span className="font-semibold">Status:</span> <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Confirmed</span></p>
                <button className="text-blue-600 text-sm">View Details</button>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-bold mb-2">Resort Condo - Kissimmee</h3>
                <p className="mb-1"><span className="font-semibold">Check-in:</span> July 10, 2023</p>
                <p className="mb-1"><span className="font-semibold">Check-out:</span> July 17, 2023</p>
                <p className="mb-2"><span className="font-semibold">Status:</span> <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Pending</span></p>
                <button className="text-blue-600 text-sm">View Details</button>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Your Information</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Name:</p>
                <p>John Smith</p>
              </div>
              <div>
                <p className="font-semibold">Email:</p>
                <p>john.smith@example.com</p>
              </div>
              <div>
                <p className="font-semibold">Phone:</p>
                <p>(123) 456-7890</p>
              </div>
              <div>
                <p className="font-semibold">Address:</p>
                <p>123 Main St, Anytown, USA</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Guest; 