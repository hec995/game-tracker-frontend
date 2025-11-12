import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", { email, password });
      localStorage.setItem("token", res.data.token); // Guardar token
      localStorage.setItem("user", JSON.stringify(res.data)); // Guardar datos del usuario
      navigate("/"); // Redirigir al home
    } catch (err) {
      alert("❌ Credenciales incorrectas");
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
      <p>
        ¿No tienes cuenta?{" "}
        <a onClick={() => navigate("/register")}>Regístrate aquí</a>
      </p>
    </div>
  );
}

export default Login;
