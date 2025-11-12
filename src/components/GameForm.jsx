import './GameForm.css';
import { useState } from 'react';
import api from '../services/api';

function GameForm({ onGameAdded }) {
  const [form, setForm] = useState({
    titulo: '',
    genero: '',
    plataforma: '',
    añoLanzamiento: '',
    desarrollador: '',
    descripcion: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/games', form);
      setForm({ titulo: '', genero: '', plataforma: '', añoLanzamiento: '', desarrollador: '', descripcion: '' });
      onGameAdded();
    } catch (err) {
      console.error('Error creando juego', err);
    }
  };

  return (
    <form className="game-form" onSubmit={handleSubmit}>
      <input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required />
      <input name="genero" placeholder="Género" value={form.genero} onChange={handleChange} required />
      <input name="plataforma" placeholder="Plataforma" value={form.plataforma} onChange={handleChange} required />
      <input name="añoLanzamiento" type="number" placeholder="Año" value={form.añoLanzamiento} onChange={handleChange} required />
      <input name="desarrollador" placeholder="Desarrollador" value={form.desarrollador} onChange={handleChange} required />
      <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange}></textarea>
      <button type="submit">Agregar juego</button>
    </form>
  );
}

export default GameForm;
