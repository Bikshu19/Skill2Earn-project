import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';

function ProfilePage() {
  const [username, setUsername] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:5000/api/me', {  // Correct endpoint
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username || '');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };
    fetchUserData();
  }, []);

  const firstLetter = username ? username.charAt(0).toUpperCase() : '';

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <div
        onClick={toggleMenu}
        style={{
          margin: '0 auto',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#3498db',
          color: 'white',
          fontSize: '36px',
          lineHeight: '80px',
          cursor: 'pointer',
          userSelect: 'none',
          position: 'relative',
          display: 'inline-block',
        }}
        title="Profile options"
      >
        {firstLetter}
      </div>

      {showMenu && (
        <div
          style={{
            marginTop: '0.5rem',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '6px',
            width: '150px',
            marginLeft: 'auto',
            marginRight: 'auto',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          <button
            onClick={() => {
              setShowMenu(false);
              navigate('/postskill');
            }}
            style={{
              width: '100%',
              padding: '10px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            Post Skill
          </button>
          <button
            onClick={() => {
              setShowMenu(false);
              navigate('/viewrequests');
            }}
            style={{
              width: '100%',
              padding: '10px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            View Requests
          </button>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '10px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: 'red',
              textAlign: 'left',
            }}
          >
            Logout
          </button>
        </div>
      )}

      <h1>{username ? `Welcome, ${username}` : 'Loading...'}</h1>
    </div>
  );
}

export default ProfilePage;
