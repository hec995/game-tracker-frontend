import { useEffect, useState } from "react";
import api from "../services/api";
import "./Stats.css";

function Stats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Error cargando estadísticas:", err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p>Cargando estadísticas...</p>;

  return (
    <div className="stats-container">
      <h1>📊 Estadísticas generales</h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total de juegos</h3>
          <p>{stats.totalJuegos}</p>
        </div>

        <div className="stat-card">
          <h3>Juegos completados</h3>
          <p>{stats.juegosCompletados}</p>
        </div>

        <div className="stat-card">
          <h3>Total de reseñas</h3>
          <p>{stats.totalReseñas}</p>
        </div>

        <div className="stat-card">
          <h3>Horas jugadas acumuladas</h3>
          <p>{stats.horasTotales}</p>
        </div>

        <div className="stat-card">
          <h3>Promedio de puntuación</h3>
          <p>{stats.promedioPuntuacion.toFixed(2)}</p>
        </div>

        <div className="stat-card">
          <h3>Juego mejor puntuado</h3>
          <p>{stats.mejorJuego ? stats.mejorJuego : "Sin reseñas"}</p>
        </div>

      </div>
    </div>
  );
}

export default Stats;
