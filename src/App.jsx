import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/games')
      .then(res => setGames(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>🎮 GameTracker</h1>
      <ul>
        {games.map(g => (
          <li key={g._id}>{g.titulo} - {g.plataforma}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
