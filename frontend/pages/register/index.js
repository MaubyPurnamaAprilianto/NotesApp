import axios from 'axios';
import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/auth/register', { username, email, password });
      setSuccess('User registered successfully.');
      setError('');
      // Clear form fields
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      window.location.href = '/login';
    } catch (error) {
      setError('Error registering user. Please try again.');
      setSuccess('');
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100 px-[10%] py-8">
      <div className="w-full h-full bg-white rounded-lg shadow-lg flex justify-between items-center text-black">
        <div className="w-[50%] p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="mb-6">
                <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-200 p-2 bg-gray-100 rounded"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 p-2 bg-gray-100 rounded"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 p-2 bg-gray-100 rounded"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-200 p-2 bg-gray-100 rounded"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
            <span className="block text-gray-700 font-bold mb-2">Sudah punya akun? <a href="/login" className="text-blue-500">Login</a></span>
            <button
              type="submit"
              className="bg-blue-500 text-white w-full p-3 rounded hover:bg-blue-600"
            >
              Register
            </button>
          </form>
        </div>
        <div className="w-[50%] h-full p-8 flex justify-center items-center bg-blue-500 rounded-lg">
          <img
            src="https://via.placeholder.com/500x500.png?text=Register+Image"
            alt="Register Image"
            className="w-[60%] h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
