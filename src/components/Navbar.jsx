import { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Navbar() {
  const { currentUser, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <header className="site-header">
      <nav className="navbar">
        <NavLink className="brand" to="/">
          MovieBuzz
        </NavLink>
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          
          {currentUser ? (
            <div className="user-profile-menu" ref={dropdownRef}>
              <button
                className="profile-trigger"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <div className="avatar">{getInitials(currentUser.name)}</div>
                <span className="user-name">{currentUser.name.split(' ')[0]}</span>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className={`chevron ${dropdownOpen ? 'rotated' : ''}`}
                >
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                </svg>
              </button>
              
              {dropdownOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <p className="user-full-name">{currentUser.name}</p>
                    <p className="user-email">{currentUser.email}</p>
                  </div>
                  <div className="dropdown-divider"></div>
                  
                  {/* We can show number of favorites in dropdown */}
                  <div className="dropdown-info">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="#e11d48">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span>{currentUser.favorites?.length || 0} Favorites</span>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  <button
                    onClick={() => {
                      signOut();
                      setDropdownOpen(false);
                    }}
                    className="dropdown-item sign-out-button"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/signin" className="nav-signin-link">
                Sign In
              </Link>
              <Link to="/signup" className="nav-signup-btn">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
