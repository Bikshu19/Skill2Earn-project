import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages.jsx/Home';
import Login from './pages.jsx/Login';
import Register from './pages.jsx/register'; // Changed to capitalize for consistency
import AdminPage from './pages.jsx/AdminPage';
import ProfilePage from './pages.jsx/ProfilePage';
import ProtectedRoute from './pages.jsx/ProtectedRoute';
import PostSkill from './pages.jsx/PostSkill';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/postskill"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <PostSkill />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route to redirect unknown URLs to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
