import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();  // Clear token and role
    navigate('/');         // Redirect to home/login page
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
      {/* You can add admin-specific content or features here */}

      <button 
        onClick={handleLogout}
        style={{ padding: '0.5rem 1rem', marginTop: '1rem', cursor: 'pointer' }}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminPage;
