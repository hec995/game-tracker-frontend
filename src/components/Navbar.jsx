import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-title">🎮 GameTracker</div>
      <div className="navbar-links">
        <Link to="/">Inicio</Link>
      </div>
    </nav>
  );
}

export default Navbar;
