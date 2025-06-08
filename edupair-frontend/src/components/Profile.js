import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    teachSkills: [],
    learnSkills: []
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setProfile(res.data))
      .catch(err => setMessage(err.response.data.error));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSkillsChange = (e, type) => {
    const skills = e.target.value.split(',').map(skill => skill.trim()).slice(0, 3);
    setProfile({ ...profile, [type]: skills });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.put('http://localhost:5000/api/profile', profile, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setProfile(res.data);
      setMessage('Profile updated');
    })
    .catch(err => setMessage(err.response.data.error));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">Bio</label>
          <textarea
            name="bio"
            value={profile.bio || ''}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">Teach Skills (comma-separated, max 3)</label>
          <input
            type="text"
            value={profile.teachSkills.join(', ')}
            onChange={(e) => handleSkillsChange(e, 'teachSkills')}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">Learn Skills (comma-separated, max 3)</label>
          <input
            type="text"
            value={profile.learnSkills.join(', ')}
            onChange={(e) => handleSkillsChange(e, 'learnSkills')}
            className="w-full border p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default Profile;
