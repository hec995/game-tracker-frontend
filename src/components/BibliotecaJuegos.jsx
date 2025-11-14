import { useEffect, useState } from "react";
import api from "../services/api";
import TarjetaJuego from "./TarjetaJuego";
import FormularioJuego from "./FormularioJuego";
import "./BibliotecaJuegos.css";
import { useLocation } from "react-router-dom";


function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);
  const [juegoEditando, setJuegoEditando] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialView = params.get("view") || "lista";

const [vista, setVista] = useState(initialView);

  // lista | agregar | editar

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

  const comenzarEdicion = (juego) => {
    setJuegoEditando(juego);
    setVista("editar");
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  return (
    <div className="biblioteca-container">
      <h2>Mi Biblioteca de Juegos</h2>

      {/* 🔵 Botones de navegación */}
      <div className="botonera">
        <button onClick={() => setVista("lista")}>Ver Biblioteca</button>
        <button onClick={() => { setVista("agregar"); setJuegoEditando(null); }}>
          Agregar Juego
        </button>
      </div>

      {/* 🔵 VISTA: VER SOLO TARJETAS */}
      {vista === "lista" && (
        <div className="tarjetas-grid">
          {juegos.map((juego) => (
            <TarjetaJuego
              key={juego._id}
              juego={juego}
              onEdit={comenzarEdicion}
              onDelete={eliminarJuego}
            />
          ))}
        </div>
      )}

      {/* 🔵 VISTA: AGREGAR NUEVO JUEGO */}
      {vista === "agregar" && (
        <FormularioJuego
          onGameAdded={() => { cargarJuegos(); setVista("lista"); }}
          juegoEditando={null}
        />
      )}

      {/* 🔵 VISTA: EDITAR JUEGO */}
      {vista === "editar" && (
        <FormularioJuego
          onGameAdded={() => { cargarJuegos(); setVista("lista"); }}
          juegoEditando={juegoEditando}
        />
      )}
    </div>
  );
}

export default BibliotecaJuegos;
