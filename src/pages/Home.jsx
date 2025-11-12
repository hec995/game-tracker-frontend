import './Home.css';
import { useEffect, useState } from 'react';
import api from '../services/api';
import GameList from '../components/GameList';
import GameForm from '../components/GameForm';

function Home() {
  const [games, setGames] = useState([]);

  const cargarJuegos = async () => {
    try {
      const res = await api.get('/games');
      setGames(res.data);
    } catch (err) {
      console.error('Error cargando juegos:', err);
    }
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Mis videojuegos</h1>
      </div>

      <div className="home-content">
        {/* Columna izquierda */}
        <div>
          <GameForm onGameAdded={cargarJuegos} />
        </div>

        {/* Columna derecha */}
        <div>
          <GameList games={games} onUpdate={cargarJuegos} />
        </div>
      </div>
    </div>
  );
}

export default Home;
