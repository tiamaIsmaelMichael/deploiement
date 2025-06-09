import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      return setError('Tous les champs sont requis');
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const text = await res.text();
      console.log('Réponse brute du serveur :', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Erreur : le serveur n'a pas retourné un JSON valide");
      }

      if (!res.ok) {
        throw new Error(data.message || 'Erreur lors de la connexion');
      }

      login(data); // Appelle le contexte pour enregistrer l'utilisateur connecté
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Connexion</h2>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            value={formData.password}
            className="form-control"
          />
        </div>
        {error && <p className="text-danger mb-3">{error}</p>}
        <button type="submit" className="btn btn-danger w-100">
          Se connecter
        </button>
        <p className="text-center mt-3">
          Pas encore inscrit ?{' '}
          <Link to="/register" className="text-success">
            Créer un compte
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
