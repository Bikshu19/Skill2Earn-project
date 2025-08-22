import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/login', {  // Ensure backend login route is '/api/auth/login'
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Check if response is JSON before parsing to avoid errors from HTML error pages
      const contentType = res.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        throw new Error('Server did not return JSON');
      }

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);

        // Debug log to verify role and navigation
        console.log('Login successful with role:', data.role);

        if (data.role === 'admin') {
          navigate('/admin');
        } else if (data.role === 'user') {
            console.log('Navigate to profile');
          navigate('/profile');
        } else {
          navigate('/'); // fallback
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert('Login error: ' + err.message);
      console.error('Login error details:', err);
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: 400, margin: '2rem auto', textAlign: 'center' }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Login</button>
    </form>
  );
}

export default Login;
