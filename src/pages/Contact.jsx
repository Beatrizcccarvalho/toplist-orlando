import React from 'react';

function Contact() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input type="text" id="name" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input type="email" id="email" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1">Message</label>
              <textarea id="message" rows="4" className="w-full p-2 border rounded"></textarea>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
          </form>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Our Information</h2>
          <p className="mb-2"><strong>Address:</strong> 123 Tourism Ave, Orlando, FL</p>
          <p className="mb-2"><strong>Phone:</strong> (123) 456-7890</p>
          <p className="mb-2"><strong>Email:</strong> info@toplistorlando.com</p>
        </div>
      </div>
    </div>
  );
}

export default Contact; 