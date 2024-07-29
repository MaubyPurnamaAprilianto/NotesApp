import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const EditNote = () => {
  const router = useRouter();
  const { id } = router.query;

  const [note, setNote] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    console.log(`Fetching note with ID: ${id}`);

    const fetchNote = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No token found.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/notes/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setNote({
          title: response.data.title,
          content: response.data.content,
        });
      } catch (error) {
        console.error('Error fetching note:', error);
        setError('Error fetching note.');
      }
    };

    fetchNote();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('No token found.');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/notes/${id}`, note, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      alert('Note updated successfully!');
      router.push('/notes');
    } catch (error) {
      console.error('Error updating note:', error);
      setError('Error updating note.');
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-black p-8">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Edit Note</h2>
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
            Update Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
