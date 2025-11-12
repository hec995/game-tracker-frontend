import './GameList.css';
import api from '../services/api';

function GameList({ games, onUpdate }) {
  const eliminarJuego = async (id) => {
    if (confirm('¿Seguro que deseas eliminar este juego?')) {
      try {
        await api.delete(`/games/${id}`);
        onUpdate();
      } catch (err) {
        console.error('Error eliminando juego:', err);
      }
    }
  };

  return (
    <div className="game-list">
      {games.length === 0 ? (
        <p className="no-games">No hay juegos aún.</p>
      ) : (
        games.map((g) => (
          <div key={g._id} className="game-card">
            <div className="game-info">
              <h3>{g.titulo}</h3>
              <p>{g.genero} · {g.plataforma}</p>
              <small>{g.añoLanzamiento} - {g.desarrollador}</small>
            </div>
            <div className="game-actions">
              <button className="edit-btn">✏️ Editar</button>
              <button className="delete-btn" onClick={() => eliminarJuego(g._id)}>🗑 Eliminar</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default GameList;
