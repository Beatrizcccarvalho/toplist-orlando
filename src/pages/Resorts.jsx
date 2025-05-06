import React from 'react';

function Resorts() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Our Resorts</h1>
        <p className="text-lg mb-8">Discover our selection of premium Orlando resorts.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Resort cards will go here */}
        </div>
      </div>
    </div>
  );
}

export default Resorts; 