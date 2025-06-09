import React, { useState } from 'react';

const CreatePost = ({ onPostCreated, author }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!content.trim()) {
      return setError('Le contenu du post ne peut pas être vide.');
    }

    const newPost = {
      id: Date.now(),
      author,
      content,
      date: new Date().toLocaleDateString(),
    };

    onPostCreated(newPost); // Remonter le post au parent
    setContent(''); // Réinitialiser le champ
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <textarea
          placeholder="Exprime-toi !"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="form-control"
        />
      </div>
      {error && <p className="text-danger">{error}</p>}
      <button type="submit" className="btn btn-danger w-100">
        Publier
      </button>
    </form>
  );
};

export default CreatePost;