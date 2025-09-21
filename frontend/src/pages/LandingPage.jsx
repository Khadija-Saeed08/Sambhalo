// src/pages/LandingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./../assets/css/LandingPage.css";
import useFadeInOnScroll from "../components/hooks/useFadeInOnScroll";

const LandingPage = () => {
  const navigate = useNavigate();

  const [heroRef, heroVisible] = useFadeInOnScroll();
  const [featuresRef, featuresVisible] = useFadeInOnScroll();

  return (
    <div className="landing-wrapper">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`hero fade-section ${heroVisible ? "visible" : ""}`}
      >
        <h1 className="hero-title">Sambhalo</h1>
        <p className="hero-tagline">Your personal finance companion 🚀</p>
        <p className="hero-subtext">
          Track your <strong>incomes</strong>, monitor <strong>expenses</strong>, 
          grow your <strong>savings</strong>, and see it all in a beautiful 
          <strong> dashboard</strong>.
        </p>
        <div className="hero-buttons">
          <button onClick={() => navigate("/login")} className="primary-btn">
            Get Started
          </button>
          <button onClick={() => navigate("/register")} className="secondary-btn">
            Sign Up
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className={`features fade-section ${featuresVisible ? "visible" : ""}`}
      >
        <h2 className="features-title">What Sambhalo Offers</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>💰 Track Income</h3>
            <p>Easily add and categorize your income sources for better clarity.</p>
          </div>
          <div className="feature-card">
            <h3>🛒 Monitor Expenses</h3>
            <p>Understand your spending patterns and stay on top of your budget.</p>
          </div>
          <div className="feature-card">
            <h3>🏦 Add Savings</h3>
            <p>Set savings goals and watch your financial discipline grow.</p>
          </div>
          <div className="feature-card">
            <h3>📊 Dashboard View</h3>
            <p>Visualize your complete financial health with powerful insights.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
