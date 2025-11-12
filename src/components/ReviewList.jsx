import './ReviewList.css';
import { useEffect, useState } from 'react';
import api from '../services/api';

function ReviewList({ juegoId }) {
  const [reviews, setReviews] = useState([]);

  const cargarReseñas = async () => {
    try {
      const res = await api.get(`/reviews?juegoId=${juegoId}`);
      setReviews(res.data);
    } catch (err) {
      console.error('Error cargando reseñas', err);
    }
  };

  useEffect(() => {
    cargarReseñas();
  }, [juegoId]);

  return (
    <div className="review-list">
      {reviews.length === 0 ? (
        <p>No hay reseñas aún.</p>
      ) : (
        reviews.map((r) => (
          <div key={r._id} className="review-card">
            <p className="review-score">{r.puntuacion} ⭐ - {r.dificultad}</p>
            <p className="review-text">{r.textoReseña}</p>
            <small>{r.horasJugadas} horas jugadas</small><br />
            <small>{r.recomendaria ? '✅ Recomendado' : '❌ No recomendado'}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default ReviewList;
