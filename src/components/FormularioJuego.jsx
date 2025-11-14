import { useState, useEffect } from "react";
import api from "../services/api";
import "./FormularioJuego.css";

function FormularioJuego({ onGameAdded, juegoEditando, setJuegoEditando }) {
  const [form, setForm] = useState({
    titulo: "",
    genero: "",
    plataforma: "",
    añoLanzamiento: "",
    desarrollador: "",
    imagenPortada: "",
    descripcion: "",
    completado: false
  });

  useEffect(() => {
    if (juegoEditando) setForm(juegoEditando);
  }, [juegoEditando]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (juegoEditando) {
        await api.put(`/games/${juegoEditando._id}`, form);
        setJuegoEditando(null);
      } else {
        await api.post("/games", form);
      }
      setForm({
        titulo: "",
        genero: "",
        plataforma: "",
        añoLanzamiento: "",
        desarrollador: "",
        imagenPortada: "",
        descripcion: "",
        completado: false
      });
      onGameAdded();
    } catch (err) {
      console.error("Error al guardar juego:", err);
    }
  };

  return (
    <form className="formulario-juego" onSubmit={handleSubmit}>
      <h3>{juegoEditando ? "Editar Juego" : "Agregar Juego"}</h3>
      <input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required />
      <input name="genero" placeholder="Género" value={form.genero} onChange={handleChange} />
      <input name="plataforma" placeholder="Plataforma" value={form.plataforma} onChange={handleChange} />
      <input name="añoLanzamiento" placeholder="Año de lanzamiento" type="number" value={form.añoLanzamiento} onChange={handleChange} />
      <input name="desarrollador" placeholder="Desarrollador" value={form.desarrollador} onChange={handleChange} />
      <input name="imagenPortada" placeholder="URL de la portada" value={form.imagenPortada} onChange={handleChange} />
      <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange}></textarea>
      <label>
        <input type="checkbox" name="completado" checked={form.completado} onChange={handleChange} />
        Completado
      </label>
      <button type="submit">{juegoEditando ? "Guardar cambios" : "Agregar"}</button>
    </form>
  );
}

export default FormularioJuego;
