import { useEffect, useState } from "react";
import api from "../services/api";
import "./MisReseñas.css";

function MisReseñas() {
  const [reviews, setReviews] = useState([]);

  const cargarReseñas = async () => {
    try {
      const res = await api.get("/reviews/my-reviews");
      setReviews(res.data);
    } catch (err) {
      console.error("Error cargando reseñas:", err);
    }
  };

  const eliminarReseña = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar esta reseña?")) return;

    try {
      await api.delete(`/reviews/${id}`);
      cargarReseñas();
    } catch (err) {
      alert("Error eliminando reseña");
    }
  };

  useEffect(() => {
    cargarReseñas();
  }, []);

  return (
    <div className="mis-reseñas-container">
      <h2>Mis reseñas</h2>

      {reviews.length === 0 ? (
        <p>No has escrito reseñas aún.</p>
      ) : (
        reviews.map((r) => (
          <div key={r._id} className="review-card">
            <div className="review-info">
              <img src={r.juegoId?.imagenPortada} alt="" />
              <h3>{r.juegoId?.titulo}</h3>
            </div>

            <p>⭐⭐ {r.puntuacion}/5</p>
            <p>{r.textoReseña}</p>
            <p>Horas jugadas: {r.horasJugadas}</p>

            <div className="buttons">
              <button className="btn-edit">Editar</button>
              <button className="btn-delete" onClick={() => eliminarReseña(r._id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MisReseñas;
