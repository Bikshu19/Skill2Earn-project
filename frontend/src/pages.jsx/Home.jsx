import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Welcome to the App</h1>
      <button
        style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}
        onClick={() => navigate('/login')}
      >
        Login
      </button>
      <button
        style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}
        onClick={() => navigate('/register')}
      >
        Register
      </button>
    </div>
  );
}

export default Home;
