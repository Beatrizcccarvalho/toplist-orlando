import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Guest Login</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input type="email" id="email" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">Password</label>
            <input type="password" id="password" className="w-full p-2 border rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="text-blue-600 text-sm">Forgot password?</a>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Sign In</button>
        </form>
        <div className="mt-4 text-center">
          <p>Are you an administrator? <Link to="/admin-login" className="text-blue-600">Admin Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login; 