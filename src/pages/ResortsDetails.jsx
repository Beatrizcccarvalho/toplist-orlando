import React from 'react';

function ResortsDetails() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Westgate Lakes Resort & Spa</h1>
        <p className="text-gray-600 mb-6">10000 Turkey Lake Rd, Orlando, FL 32819</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 bg-gray-200 h-96 flex items-center justify-center">
            <p className="text-gray-500">Resort Image</p>
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
            <h2 className="text-2xl font-semibold mb-4">About the Resort</h2>
            <p className="mb-4">
              Westgate Lakes Resort & Spa offers spacious villas and a range of amenities including seven outdoor pools, seven hot tubs, a fitness center, and a full-service spa. The resort is perfectly located near Orlando's major attractions, just minutes away from Universal Studios, SeaWorld, and Walt Disney World.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4 mt-8">Resort Amenities</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Multiple Swimming Pools</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Full-Service Spa</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Fitness Center</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>On-site Restaurants</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Water Sports</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Tennis Courts</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mb-4 mt-8">Available Units</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-bold">Studio Villa</h3>
                <p className="mb-2">Sleeps up to 4 guests with a queen bed and sofa bed</p>
                <p className="text-blue-600">From $150/night</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-bold">1-Bedroom Villa</h3>
                <p className="mb-2">Sleeps up to 4 guests with a king bed and sofa bed</p>
                <p className="text-blue-600">From $200/night</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-bold">2-Bedroom Villa</h3>
                <p className="mb-2">Sleeps up to 8 guests with multiple beds</p>
                <p className="text-blue-600">From $275/night</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">Check Availability</h2>
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
                <option>1-2 Guests</option>
                <option>3-4 Guests</option>
                <option>5-6 Guests</option>
                <option>7-8 Guests</option>
                <option>9+ Guests</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Unit Type</label>
              <select className="w-full p-2 border rounded">
                <option>All Unit Types</option>
                <option>Studio Villa</option>
                <option>1-Bedroom Villa</option>
                <option>2-Bedroom Villa</option>
              </select>
            </div>
            
            <button className="w-full bg-blue-600 text-white py-2 rounded font-semibold">Search Available Units</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResortsDetails; 