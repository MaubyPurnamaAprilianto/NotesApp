import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const CreateNote = () => {
  const router = useRouter();

  const [note, setNote] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('No token found.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/notes', note, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      alert('Note created successfully!');
      router.push('/notes');
    } catch (error) {
      console.error('Error creating note:', error);
      setError('Error creating note.');
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-black p-8">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Create Note</h2>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">Title</label>
            <input 
              type="text" 
              id="title" 
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
              placeholder="Enter note title" 
              required 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700">Content</label>
            <textarea 
              id="content" 
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
              placeholder="Enter note content" 
              rows="4"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Create Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
