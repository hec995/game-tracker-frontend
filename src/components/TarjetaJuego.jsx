import { useState } from "react";
import "./TarjetaJuego.css";
import { Link } from "react-router-dom";


function TarjetaJuego({ juego, onEdit, onDelete }) {
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <>
      {/* Tarjeta */}
      <div className="tarjeta-juego">
        <div
          className="imagen-contenedor"
          onClick={() => juego.imagenPortada && setMostrarModal(true)}
        >
          {juego.imagenPortada ? (
            <img
              src={juego.imagenPortada}
              alt={juego.titulo}
              onError={(e) => (e.target.src = "/fallback.jpg")}
            />
          ) : (
            <div className="sin-imagen">Sin imagen</div>
          )}
        </div>

        <h3>{juego.titulo}</h3>
        <p>
          {juego.genero} - {juego.plataforma}
        </p>
        <p>
          <small>
            {juego.añoLanzamiento} - {juego.desarrollador}
          </small>
        </p>
        <p className={juego.completado ? "completado" : "pendiente"}>
          {juego.completado ? "✅ Completado" : "⌛ Pendiente"}
        </p>

        <div className="acciones">
          <button onClick={() => onEdit(juego)}>✏️ Editar</button>
          <button onClick={() => onDelete(juego._id)}>🗑 Eliminar</button>
          <Link to={`/game/${juego._id}`} className="detalle-btn">
          🔍 Ver detalles</Link>
        </div>
      </div>

      {/* Modal de imagen */}
      {mostrarModal && (
        <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} /* evita cerrar al hacer clic dentro */
          >
            <img
              src={juego.imagenPortada}
              alt={juego.titulo}
              className="modal-imagen"
            />
            <button
              className="cerrar-modal"
              onClick={() => setMostrarModal(false)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TarjetaJuego;
