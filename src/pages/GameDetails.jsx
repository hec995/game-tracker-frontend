import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ListaReseñas from "../components/ListaReseñas";
import FormularioReseña from "../components/FormularioReseña";
import "./GameDetails.css";

function GameDetails() {
  const { id } = useParams();
  const [juego, setJuego] = useState(null);
  const [actualizar, setActualizar] = useState(false); // 👈 para recargar reseñas

  const cargarJuego = async () => {
    try {
      const res = await api.get(`/games/${id}`);
      setJuego(res.data);
    } catch (err) {
      console.error("Error al cargar juego:", err);
    }
  };

  useEffect(() => {
    cargarJuego();
  }, [id]);

  if (!juego) return <p className="loading">Cargando...</p>;

  return (
    <div className="game-details-container">
      <div className="game-header">
        {juego.imagenPortada && (
          <img src={juego.imagenPortada} alt={juego.titulo} />
        )}
        <div>
          <h2>{juego.titulo}</h2>
          <p><strong>Género:</strong> {juego.genero}</p>
          <p><strong>Plataforma:</strong> {juego.plataforma}</p>
          <p><strong>Año:</strong> {juego.añoLanzamiento}</p>
          <p><strong>Desarrollador:</strong> {juego.desarrollador}</p>
          <p>{juego.descripcion}</p>
        </div>
      </div>

      <hr />

      {/* 🔹 al guardar una reseña, cambiamos el estado para forzar actualización */}
      <FormularioReseña
        juegoId={juego._id}
        onReviewAdded={() => setActualizar(!actualizar)}
      />

      {/* 🔹 pasamos ese estado a ListaReseñas */}
      <ListaReseñas juegoId={juego._id} actualizar={actualizar} />
    </div>
  );
}

export default GameDetails;
