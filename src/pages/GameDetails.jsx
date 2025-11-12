import './GameDetails.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  const cargarJuego = async () => {
    try {
      const res = await api.get(`/games/${id}`);
      setGame(res.data);
    } catch (err) {
      console.error('Error cargando juego:', err);
    }
  };

  useEffect(() => {
    cargarJuego();
  }, [id]);

  if (!game) return <p className="loading">Cargando juego...</p>;

  return (
    <div className="game-details-container">
      <div className="game-header">
        <h2>{game.titulo}</h2>
        <p>{game.descripcion}</p>
        <p><strong>Plataforma:</strong> {game.plataforma}</p>
        <p><strong>Desarrollador:</strong> {game.desarrollador}</p>
      </div>

      <hr />

      <div className="reviews-section">
        <h3>📝 Reseñas</h3>
        <ReviewForm juegoId={game._id} onReviewAdded={cargarJuego} />
        <ReviewList juegoId={game._id} />
      </div>
    </div>
  );
}

export default GameDetails;
