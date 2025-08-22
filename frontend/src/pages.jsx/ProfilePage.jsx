import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const [username, setUsername] = useState('');
  const [loggedInUserId, setLoggedInUserId] = useState('');
  const [loggedInUserGender, setLoggedInUserGender] = useState('');
  const [publicUsers, setPublicUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  // Fetch logged-in user info, including id and gender
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:5000/api/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username || '');
          setLoggedInUserId(data._id);
          setLoggedInUserGender(data.gender || '');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };
    fetchUserData();
  }, []);

  // Fetch users with public works
  useEffect(() => {
    const fetchPublicUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/public-users');
        if (!res.ok) throw new Error('Failed to fetch public users');
        const data = await res.json();
        setPublicUsers(data);
      } catch (err) {
        setErrorUsers(err.message);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchPublicUsers();
  }, []);

  const firstLetter = username ? username.charAt(0).toUpperCase() : '';

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      {/* Profile initial circle */}
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

      {/* Dropdown menu */}
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
            style={{ width: '100%', padding: '10px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }}
          >
            Post Skill
          </button>
          <button
            onClick={() => {
              setShowMenu(false);
              navigate('/viewrequest');
            }}
            style={{ width: '100%', padding: '10px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }}
          >
            View Requests
          </button>
          <button
            onClick={handleLogout}
            style={{ width: '100%', padding: '10px', border: 'none', background: 'none', cursor: 'pointer', color: 'red', textAlign: 'left' }}
          >
            Logout
          </button>
        </div>
      )}

      <h1>{username ? `Welcome, ${username}` : 'Loading...'}</h1>

      <div style={{ marginTop: '3rem' }}>
        <h2>Users with Public Works</h2>
        {loadingUsers ? (
          <p>Loading public users...</p>
        ) : errorUsers ? (
          <p style={{ color: 'red' }}>{errorUsers}</p>
        ) : publicUsers.length === 0 ? (
          <p>No users with public works found.</p>
        ) : (
          <table style={{ margin: '0 auto', borderCollapse: 'collapse', minWidth: '80%' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Username</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Gender</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Email</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Category</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Subcategory</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Image</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Contact Info</th>
              </tr>
            </thead>
            <tbody>
              {publicUsers.map((user) =>
                user.works.map((work) => (
                  <tr key={`${user._id}-${work._id}`}>
                    <td style={{ borderBottom: '1px solid #eee', padding: '6px' }}>{user.username}</td>
                    <td style={{ borderBottom: '1px solid #eee', padding: '6px' }}>{user.gender}</td>
                    <td style={{ borderBottom: '1px solid #eee', padding: '6px' }}>{user.email}</td>
                    <td style={{ borderBottom: '1px solid #eee', padding: '6px' }}>{work.category}</td>
                    <td style={{ borderBottom: '1px solid #eee', padding: '6px' }}>{work.subcategory}</td>
                    <td style={{ borderBottom: '1px solid #eee', padding: '6px' }}>
                      {work.image && work.image.length > 0 ? (
                        <img src={work.image[0]} alt="Work" style={{ maxWidth: 80, maxHeight: 50 }} />
                      ) : (
                        'No Image'
                      )}
                    </td>
                    <td style={{ borderBottom: '1px solid #eee', padding: '6px' }}>
                      {user.gender === 'female' && loggedInUserGender === 'female' ? (
                        <>
                          <div>Mobile: {user.mobileNumber || 'N/A'}</div>
                          <div>Email: {user.email}</div>
                        </>
                      ) : (
                        <div>Email: {user.email}</div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
