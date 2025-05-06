import React from 'react';

function PropertyDetails() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Luxury Villa in Orlando</h1>
        <p className="text-gray-600 mb-6">123 Resort Dr, Kissimmee, FL 34747</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 bg-gray-200 h-96 flex items-center justify-center">
            <p className="text-gray-500">Property Image</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-200 h-44 flex items-center justify-center">
              <p className="text-gray-500">Image 1</p>
            </div>
            <div className="bg-gray-200 h-44 flex items-center justify-center">
              <p className="text-gray-500">Image 2</p>
            </div>
            <div className="bg-gray-200 h-44 flex items-center justify-center">
              <p className="text-gray-500">Image 3</p>
            </div>
            <div className="bg-gray-200 h-44 flex items-center justify-center">
              <p className="text-gray-500">Image 4</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="mb-4">
              This beautiful luxury villa features 5 bedrooms, 4 bathrooms, a private pool, and is just minutes away from Walt Disney World. The villa offers a fully equipped kitchen, spacious living areas, and a game room for your entertainment.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4 mt-8">Amenities</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Private Pool</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Free WiFi</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Game Room</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Full Kitchen</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Washer/Dryer</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Air Conditioning</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">Booking Information</h2>
            <p className="mb-2"><span className="font-semibold">Price:</span> $250/night</p>
            <p className="mb-4"><span className="font-semibold">Minimum Stay:</span> 3 nights</p>
            
            <div className="mb-4">
              <label className="block mb-1">Check-in</label>
              <input type="date" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Check-out</label>
              <input type="date" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Guests</label>
              <select className="w-full p-2 border rounded">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
                <option>5+ Guests</option>
              </select>
            </div>
            
            <button className="w-full bg-blue-600 text-white py-2 rounded font-semibold">Check Availability</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails; 