import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please log in to view matches.');
      return;
    }

    axios.get('http://localhost:5000/api/matches', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (res.data) {
          setMatches(res.data);
          setMessage('');
        } else {
          setMessage('No matches found.');
        }
      })
      .catch(err => {
        console.error('Error fetching matches:', err);
        const errorMessage = err.response?.data?.error || 'Failed to fetch matches.';
        setMessage(errorMessage);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Matches</h2>
      {message && <p className="text-red-500">{message}</p>}
      {matches.length === 0 && !message && <p>No matches found.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matches.map(match => (
          <div key={match._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{match.name}</h3>
            <p className="text-sm text-gray-600">{match.email}</p>
            <p className="mt-2">{match.bio || 'No bio'}</p>
            <p className="mt-2">
              <strong>Teaches:</strong> {match.teachSkills.join(', ')}
            </p>
            <p>
              <strong>Learns:</strong> {match.learnSkills.join(', ')}
            </p>
            <Link
              to={`/profile/${match._id}`}
              className="mt-2 inline-block text-blue-500 hover:underline"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;