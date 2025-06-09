import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Post from '../Components/Post';
import CreatePost from '../Components/CreatePost';

const Home = () => {
  const { user } = useAuth();

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'alice',
      content: 'Salut tout le monde ! Voici mon premier post !',
      date: '01/05/2025',
    },
    {
      id: 2,
      author: 'bob',
      content: 'Quelqu’un veut faire une collab ? 😎',
      date: '30/04/2025',
    },
  ]);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Section principale */}
        <div className="col-md-8">
          <h1 className="text-center mb-4 text-success">Bienvenue sur votre réseau Jamcoco</h1>

          {user ? (
            <>
              <div className="alert alert-info text-center">
                Connecté en tant que <strong>{user.username}</strong>
              </div>

              <h2 className="text-center mb-3">Créer un nouveau post</h2>
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <CreatePost onPostCreated={handleNewPost} author={user.username} />
                </div>
              </div>

              <h2 className="text-center mb-3">📝 Derniers posts</h2>
              <div className="list-group">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <div key={post.id} className="list-group-item">
                      <Post post={post} />
                    </div>
                  ))
                ) : (
                  <p className="text-muted text-center">Aucun post pour le moment.</p>
                )}
              </div>
            </>
          ) : (
            <p className="text-center text-muted">
              Veuillez vous connecter ou vous inscrire pour voir les posts.
            </p>
          )}
        </div>

        {/* Section Connexion et Inscription */}
        {!user && (
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-center">Connexion</h3>
                <Link to="/login" className="btn btn-danger w-100">
                  Se connecter
                </Link>
              </div>
            </div>

            <div className="card shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-center">Inscription</h3>
                <Link to="/register" className="btn btn-success w-100">
                  Créer un compte
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;