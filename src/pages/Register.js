import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = formData;
    if (!username || !email || !password) {
      return setError('Tous les champs sont requis.');
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erreur lors de l’inscription.');
      }

      setSuccess('Inscription réussie ! Redirection en cours...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Créer un compte</h2>
        <div className="mb-3">
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {error && <p className="text-danger mb-3">{error}</p>}
        {success && <p className="text-success mb-3">{success}</p>}
        <button type="submit" className="btn btn-success w-100">
          S'inscrire
        </button>
        <p className="text-center mt-3">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-danger">
            Se connecter
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;