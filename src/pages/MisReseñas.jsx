import { useEffect, useState } from "react";
import api from "../services/api";
import Modal from "../components/Modal";
import FormularioEdicionReseña from "../components/FormularioEdicionReseña";
import "./MisReseñas.css";
function MisReseñas() {
  const [reviews, setReviews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [reseñaSeleccionada, setReseñaSeleccionada] = useState(null);

  const cargarReseñas = async () => {
    const res = await api.get("/reviews/my-reviews");
    setReviews(res.data);
  };

  const eliminarReseña = async (id) => {
    if (!confirm("¿Eliminar reseña?")) return;
    await api.delete(`/reviews/${id}`);
    cargarReseñas();
  };

  const abrirModal = (reseña) => {
    setReseñaSeleccionada(reseña);
    setModalOpen(true);
  };

  useEffect(() => {
    cargarReseñas();
  }, []);

  return (
    <div className="mis-reseñas-container">
      <h2>Mis reseñas</h2>

      {reviews.map((r) => (
        <div key={r._id} className="review-card">
          <div className="review-info">
            <img src={r.juegoId?.imagenPortada} alt="" />
            <h3>{r.juegoId?.titulo}</h3>
          </div>

          <p>⭐ {r.puntuacion}/5</p>
          <p>{r.textoReseña}</p>

          <div className="buttons">
            <button className="btn-edit" onClick={() => abrirModal(r)}>
              Editar
            </button>
            <button className="btn-delete" onClick={() => eliminarReseña(r._id)}>
              Eliminar
            </button>
          </div>
        </div>
      ))}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {reseñaSeleccionada && (
          <FormularioEdicionReseña
            reseña={reseñaSeleccionada}
            onUpdated={() => {
              setModalOpen(false);
              cargarReseñas();
            }}
          />
        )}
      </Modal>
    </div>
  );
}

export default MisReseñas;
