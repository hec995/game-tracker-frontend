import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

import Home from "./pages/Home";            
import GameDetails from "./pages/GameDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Explorar from "./pages/Explorar";
import MisReseñas from "./pages/MisReseñas";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>

          {/*  DASHBOARD */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Otras rutas existentes */}
          <Route
            path="/games"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/game/:id"
            element={
              <ProtectedRoute>
                <GameDetails />
              </ProtectedRoute>
            }
          />

          {/* Formularios */}
          <Route
            path="/add-game"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/review"
            element={
              <ProtectedRoute>
                <GameDetails />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/explorar"
            element={
              <ProtectedRoute>
                <Explorar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mis-reseñas"
            element={
              <ProtectedRoute>
                <MisReseñas />
              </ProtectedRoute>
            }
          />


          {/* Login y Register */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;
