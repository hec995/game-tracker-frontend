import { useState } from "react";
import api from "../services/api";
import "./FormularioReseña.css";

function FormularioReseña({ juegoId, onReviewAdded }) {
  const [form, setForm] = useState({
    puntuacion: 5,
    textoReseña: "",
    horasJugadas: "",
    dificultad: "Normal",
    recomendaria: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       console.log("Datos enviados a la API:", { ...form, juegoId });
 
      await api.post("/reviews", { ...form, juegoId });
      setForm({
        puntuacion: 5,
        textoReseña: "",
        horasJugadas: "",
        dificultad: "Normal",
        recomendaria: true,
      });
      onReviewAdded();
    } catch (err) {
      console.error("Error al agregar reseña:", err);
    }
  };

  return (
    <form className="form-reseña" onSubmit={handleSubmit}>
      <h3>Escribir una reseña</h3>

      <label>Puntuación ⭐</label>
      <input
        type="number"
        name="puntuacion"
        min="1"
        max="5"
        value={form.puntuacion}
        onChange={handleChange}
      />

      <label>Horas jugadas ⏱️</label>
      <input
        type="number"
        name="horasJugadas"
        value={form.horasJugadas}
        onChange={handleChange}
      />

      <label>Dificultad 🎯</label>
      <select name="dificultad" value={form.dificultad} onChange={handleChange}>
        <option value="Fácil">Fácil</option>
        <option value="Normal">Normal</option>
        <option value="Difícil">Difícil</option>
      </select>

      <label>
        <input
          type="checkbox"
          name="recomendaria"
          checked={form.recomendaria}
          onChange={handleChange}
        />
        ¿Lo recomendarías?
      </label>

      <textarea
        name="textoReseña"
        placeholder="Escribe tu reseña..."
        value={form.textoReseña}
        onChange={handleChange}
      />

      <button type="submit">💾 Guardar reseña</button>
    </form>
  );
}

export default FormularioReseña;
