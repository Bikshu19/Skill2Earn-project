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
import Beauty1 from "./pages.jsx/TypesOfSkills/Beauty1";
import Fitness1 from "./pages.jsx/TypesOfSkills/Fitness1";
import Home1 from "./pages.jsx/TypesOfSkills/HomeDecoration1";
import Home2 from "./pages.jsx/TypesOfSkills/HomeMadeProducts1";
import Photo from "./pages.jsx/TypesOfSkills/Photos";
import Work1 from "./pages.jsx/TypesOfSkills/RemoteWok";
import ExploreSkills from "./pages.jsx/ExploreSkills";
import AboutPage from "./pages.jsx/AboutPage";
import ContactPage from "./pages.jsx/ContactPage";
import Tailors1 from "./pages.jsx/TypesOfSkills/Tailors1";
import BabyCare1 from "./pages.jsx/TypesOfSkills/BabyCare1";
import Tutions1 from "./pages.jsx/TypesOfSkills/Tutions1";
import Cookings from "./pages.jsx/TypesOfSkills/Cookings";
import Skills from "./pages.jsx/skills";
import Explore1 from "./pages.jsx/Explore1";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/explore" element={<ExploreSkills />} />
        <Route path="/beauty" element={<Beauty1 />} />
        <Route path="/fitness" element={<Fitness1 />} />
        <Route path="/homedecoration" element={<Home1 />} />
        <Route path="/homeproducts" element={<Home2 />} />
        <Route path="/photo" element={<Photo />} />
        <Route path="/remoteworks" element={<Work1 />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/tailoring" element={<Tailors1 />} />
        <Route path="/tutoring" element={<Tutions1 />} />
        <Route path="/cooking" element={<Cookings />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/babycare" element={<BabyCare1 />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/explore1" element={<Explore1 />} />

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
