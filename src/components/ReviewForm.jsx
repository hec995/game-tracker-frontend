import './ReviewForm.css';
import { useState } from 'react';
import api from '../services/api';

function ReviewForm({ juegoId, onReviewAdded }) {
  const [form, setForm] = useState({
    puntuacion: 5,
    textoReseña: '',
    horasJugadas: '',
    dificultad: 'Normal',
    recomendaria: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reviews', { ...form, juegoId });
      setForm({ puntuacion: 5, textoReseña: '', horasJugadas: '', dificultad: 'Normal', recomendaria: true });
      onReviewAdded();
    } catch (err) {
      console.error('Error creando reseña', err);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <textarea name="textoReseña" placeholder="Escribe tu reseña..." value={form.textoReseña} onChange={handleChange} required></textarea>
      <input type="number" name="puntuacion" min="1" max="5" value={form.puntuacion} onChange={handleChange} />
      <input name="horasJugadas" placeholder="Horas jugadas" type="number" value={form.horasJugadas} onChange={handleChange} />
      <select name="dificultad" value={form.dificultad} onChange={handleChange}>
        <option>Fácil</option>
        <option>Normal</option>
        <option>Difícil</option>
      </select>
      <label>
        <input type="checkbox" name="recomendaria" checked={form.recomendaria} onChange={handleChange} />
        ¿Recomendarías este juego?
      </label>
      <button type="submit">Agregar reseña</button>
    </form>
  );
}

export default ReviewForm;
