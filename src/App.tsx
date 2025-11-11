import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Feattures from "./components/Feattures";
import CallAction from "./components/CallAction";
import Footer from "./components/Footer";
import Login from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          // Landing Page
          <>
            <Navbar />
            <main>
              <Hero />
              <Feattures />
              <CallAction />
            </main>
            <Footer />
          </>
        }
        />
        <Route path="/login" element={
          // Login Page
          <>
            <Login />
            <Footer />
          </>
        }
        />
        <Route path="/signup" element={
          // Sign Up Page
          <>
            <SignUp />
            <Footer />
          </>
        }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Dashboard />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}