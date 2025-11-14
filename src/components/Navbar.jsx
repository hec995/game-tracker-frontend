import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔹 Eliminar token y datos del usuario
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // 🔹 Redirigir al login
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        🎮 JÓVENES CREATIVOS
      </div>

      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/game/estadisticas">Estadísticas</Link>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
