import { useState } from "react";
import api from "../services/api";
import "./FormularioEdicionReseña.css";
function FormularioEdicionReseña({ reseña, onUpdated }) {
  const [textoReseña, setTextoReseña] = useState(reseña.textoReseña);
  const [puntuacion, setPuntuacion] = useState(reseña.puntuacion);
  const [horasJugadas, setHorasJugadas] = useState(reseña.horasJugadas);
  const [dificultad, setDificultad] = useState(reseña.dificultad);
  const [recomendaria, setRecomendaria] = useState(reseña.recomendaria);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/reviews/${reseña._id}`, {
        textoReseña,
        puntuacion,
        horasJugadas,
        dificultad,
        recomendaria,
      });

      alert("Reseña actualizada correctamente");
      onUpdated(); // recargar la lista
    } catch (err) {
      console.error(err);
      alert("Error al actualizar reseña");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
  <h2>Editar reseña</h2>

  <label>Puntuación</label>
  <input
    type="number"
    min="1"
    max="5"
    value={puntuacion}
    onChange={(e) => setPuntuacion(e.target.value)}
  />

  <label>Horas jugadas</label>
  <input
    type="number"
    value={horasJugadas}
    onChange={(e) => setHorasJugadas(e.target.value)}
  />

  <label>Dificultad</label>
  <select value={dificultad} onChange={(e) => setDificultad(e.target.value)}>
    <option value="Fácil">Fácil</option>
    <option value="Normal">Normal</option>
    <option value="Difícil">Difícil</option>
  </select>

  <label>Texto de la reseña</label>
  <textarea
    value={textoReseña}
    onChange={(e) => setTextoReseña(e.target.value)}
  />

  <label className="check-row">
    <input
      type="checkbox"
      checked={recomendaria}
      onChange={(e) => setRecomendaria(e.target.checked)}
    />
    ¿Recomendarías este juego?
  </label>

  <button type="submit" className="btn-guardar">
    Guardar cambios
  </button>
</form>

  );
}

export default FormularioEdicionReseña;
