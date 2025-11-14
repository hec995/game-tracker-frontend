import { useEffect, useState } from "react";
import api from "../services/api";
import TarjetaJuego from "./TarjetaJuego";
import FormularioJuego from "./FormularioJuego";
import "./BibliotecaJuegos.css";

function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);
  const [juegoEditando, setJuegoEditando] = useState(null);

  const cargarJuegos = async () => {
    try {
      const res = await api.get("/games");
      setJuegos(res.data);
    } catch (err) {
      console.error("Error al cargar juegos", err);
    }
  };

  const eliminarJuego = async (id) => {
    if (confirm("¿Seguro que deseas eliminar este juego?")) {
      await api.delete(`/games/${id}`);
      cargarJuegos();
    }
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  return (
    <div className="biblioteca-container">
      <h2>Mi Biblioteca de Juegos</h2>

      <div className="biblioteca-layout">
        {/* Columna izquierda */}
        <FormularioJuego
          onGameAdded={cargarJuegos}
          juegoEditando={juegoEditando}
          setJuegoEditando={setJuegoEditando}
        />

        {/* Columna derecha */}
        <div className="tarjetas-grid">
          {juegos.map((juego) => (
            <TarjetaJuego
              key={juego._id}
              juego={juego}
              onEdit={setJuegoEditando}
              onDelete={eliminarJuego}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BibliotecaJuegos;
