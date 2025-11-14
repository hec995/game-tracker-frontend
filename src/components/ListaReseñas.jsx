import { useEffect, useState } from "react";
import api from "../services/api";
import "./ListaReseñas.css";

function ListaReseñas({ juegoId, actualizar }) {
  const [reseñas, setReseñas] = useState([]);

  const cargarReseñas = async () => {
    try {
      const res = await api.get(`/reviews/game/${juegoId}`);
      setReseñas(res.data);
    } catch (err) {
      console.error("Error cargando reseñas:", err);
    }
  };

  useEffect(() => {
    cargarReseñas();
  }, [juegoId, actualizar]);

  return (
    <div className="lista-reseñas">
      <h3>Reseñas</h3>

      {reseñas.length === 0 ? (
        <p>No hay reseñas todavía.</p>
      ) : (
        reseñas.map((r) => (
          <div key={r._id} className="review-card">
            <h4>{r.usuario?.nombre || "Usuario desconocido"}</h4>

            <p><strong>Puntuación:</strong> ⭐ {r.puntuacion}/5</p>

            {r.textoReseña && <p>{r.textoReseña}</p>}

            <small>Horas jugadas: {r.horasJugadas}</small><br />
            <small>Dificultad: {r.dificultad}</small><br />
            <small>
              {r.recomendaria ? "👍 Recomienda" : "👎 No recomienda"}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default ListaReseñas;
