import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Feattures from "./components/Feattures";
import CallAction from "./components/CallAction";
import Footer from "./components/Footer";
import Login from "./pages/LogIn";

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
      </Routes>
    </Router>
  );
}