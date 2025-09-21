import React from 'react';
import './../assets/css/Navbar.css'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navbar = ({setIsLoggedIn ,isLoggedIn}) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.clear();
    setIsLoggedIn(false);

    navigate('/login');
  };

  return (
    <nav className="navbar">
        <div className="navbar-container">
          <div className="site-title">
            Finance Tracker
          </div>

          <div>
            {isLoggedIn ? (
            <button onClick={handleLogoutClick} className="signin-button">
              Logout
            </button>
          ) : (
            <>
              {location.pathname === "/Sambhalo" ? null : 
                location.pathname === "/register" ? (
                  <button onClick={() => navigate('/login')} className="signin-button">
                    Login
                  </button>
                ) : location.pathname === "/login" ? (
                  <button onClick={() => navigate('/register')} className="signin-button">
                    Register
                  </button>
                ) : (
                  <button onClick={() => navigate('/register')} className="signin-button">
                    Register
                  </button>
                )
              }
            </>
          )}
          </div>
        </div>
      </nav>
  );
};

export default Navbar;