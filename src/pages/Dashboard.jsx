import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard-container">
      <h1>👋 Bienvenid@, {user?.nombre || "Jugador"}</h1>
      <p className="subtitle">Este es tu panel principal de GameTracker</p>

      <div className="dashboard-grid">

        <div className="dashboard-card" onClick={() => navigate("/explorar")}>
          🌍 <h3>Explorar juegos</h3>
          <p>Ver juegos agregados por otros jugadores.</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/games?view=lista")}>
          🎮 <h3>Ver Biblioteca de Juegos</h3>
          <p>Explora todos tus videojuegos registrados.</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/games?view=agregar")}>
          ➕ <h3>Agregar Juego</h3>
          <p>Registra un nuevo videojuego en tu lista.</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/mis-reseñas")}>
          ⭐ <h3>Ver Reseñas</h3>
          <p>Lee opiniones y valoraciones creadas por ti.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
