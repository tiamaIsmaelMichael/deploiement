import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user._id, // à remplacer par JWT plus tard
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        throw new Error(data.message || 'Erreur lors de la mise à jour du profil.');
      }

      // ✅ On met à jour le contexte avec data.user
      if (data.user) {
        login(data.user);
        setMessage('✅ Profil mis à jour avec succès.');
      } else {
        throw new Error('Données utilisateur manquantes dans la réponse.');
      }

    } catch (err) {
      setLoading(false);
      setError(err.message || 'Une erreur est survenue.');
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-5 text-danger">
        Vous devez être connecté pour voir votre profil.
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Profil de {user.username}</h2>
          {message && <div className="alert alert-success text-center">{message}</div>}
          {error && <div className="alert alert-danger text-center">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Mise à jour...' : 'Mettre à jour'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
