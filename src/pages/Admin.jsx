import React from 'react';

function Admin() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Properties</h2>
          <p className="text-3xl font-bold">42</p>
          <p className="text-sm text-gray-500">Total properties</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Bookings</h2>
          <p className="text-3xl font-bold">156</p>
          <p className="text-sm text-gray-500">Active bookings</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Revenue</h2>
          <p className="text-3xl font-bold">$24,500</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Property</th>
              <th className="text-left py-2">Guest</th>
              <th className="text-left py-2">Check-in</th>
              <th className="text-left py-2">Check-out</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Luxury Villa</td>
              <td className="py-2">John Smith</td>
              <td className="py-2">May 15, 2023</td>
              <td className="py-2">May 22, 2023</td>
              <td className="py-2"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Confirmed</span></td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Resort Condo</td>
              <td className="py-2">Jane Doe</td>
              <td className="py-2">May 18, 2023</td>
              <td className="py-2">May 25, 2023</td>
              <td className="py-2"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Pending</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin; 