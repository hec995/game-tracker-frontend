import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Explorar.css";

function Explorar() {
  const [juegos, setJuegos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get("/games/explore/all");
        setJuegos(res.data);
      } catch (err) {
        console.error("Error cargando juegos globales:", err);
      }
    };
    cargar();
  }, []);

  return (
    <div className="explorar-container">
      <h1>🌍 Explorar juegos de otros jugadores</h1>
      <p className="explorar-sub">Descubre juegos agregados por la comunidad</p>

      <div className="explorar-grid">
        {juegos.map((juego) => (
          <div
            key={juego._id}
            className="explorar-card"
            onClick={() => navigate(`/game/${juego._id}`)}
          >
            <img src={juego.portadaUrl} alt={juego.titulo} />
            <h3>{juego.titulo}</h3>

            <p className="autor">Agregado por: {juego.usuario?.name}</p>

            <button
              className="btn-reseñar"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/game/${juego._id}`);
              }}
            >
              ✍ Escribir reseña
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explorar;
