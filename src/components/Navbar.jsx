import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar">
        <NavLink className="brand" to="/">
          MovieBuzz
        </NavLink>
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
