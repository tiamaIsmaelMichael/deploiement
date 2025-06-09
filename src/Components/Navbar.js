import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Nom du site stylisé */}
        <Link to="/" className="navbar-brand fw-bold text-uppercase">
          Jamcoco
        </Link>

        {/* Bouton pour le menu responsive */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Liens de navigation */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Accueil
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    Profil
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={logout}
                    className="btn btn-danger ms-3"
                  >
                    Déconnexion
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Connexion
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Inscription
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;