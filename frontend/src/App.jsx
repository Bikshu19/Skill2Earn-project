<<<<<<< HEAD
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages.jsx/Home';
import Login from './pages.jsx/Login';
import Register from './pages.jsx/register'; // Capital R to match filename
import AdminPage from './pages.jsx/AdminPage';
import ProfilePage from './pages.jsx/ProfilePage';
import ProtectedRoute from './pages.jsx/ProtectedRoute';
import PostSkill from './pages.jsx/PostSkill';
import ViewRequest from './pages.jsx/viewrequest'; // Renamed and Capitalized
import Contact from './pages.jsx/contact'
=======
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages.jsx/Home";
import Login from "./pages.jsx/Login";
import Register from "./pages.jsx/register"; // Changed to capitalize for consistency
import AdminPage from "./pages.jsx/AdminPage";
import ProfilePage from "./pages.jsx/ProfilePage";
import ProtectedRoute from "./pages.jsx/ProtectedRoute";
import PostSkill from "./pages.jsx/PostSkill";
import BabyCare from "./components/ServiceComponents/BabyCare"
import Beauty from "./components/ServiceComponents/Beauty"
import Fitness from "./components/ServiceComponents/fitness"
import HomeDecoration from "./components/ServiceComponents/HemoDecoration"
import HomeMadeProducts from "./components/ServiceComponents/HomeMadeProducts"
import Photography from "./components/ServiceComponents/Photography"
import Remoteworks from "./components/ServiceComponents/remoteworks"
import ExploreSkills from "./pages.jsx/ExploreSkills"
import AboutPage from "./pages.jsx/AboutPage"
import ContactPage from "./pages.jsx/ContactPage";
>>>>>>> 3d5bea2f7ed05d11a053344186afc2bd23b6de7c

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
<<<<<<< HEAD
        <Route path="/contact" element={<Contact />} />

=======
        <Route path="/explore" element={<ExploreSkills />} />
        <Route path="/babycare" element={<BabyCare />} />
        <Route path="/beauty" element={<Beauty />} />
        <Route path="/fitness" element={<Fitness />} />
        <Route path="/homedecoration" element={<HomeDecoration />} />
        <Route path="/homeproducts" element={<HomeMadeProducts />} />
        <Route path="/photo" element={<Photography />} />
        <Route path="/remoteworks" element={< Remoteworks/>} />
        <Route path="/about" element={< AboutPage/>} />
        <Route path="/contact" element={< ContactPage/>} />
>>>>>>> 3d5bea2f7ed05d11a053344186afc2bd23b6de7c

        {/* Protected routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
         <Route
          path="/viewrequest"
          element={
            <ProtectedRoute allowedRoles={['user']}>
             <ViewRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/postskill"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <PostSkill />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
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
