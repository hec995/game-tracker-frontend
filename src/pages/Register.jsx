import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Auth.css";

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/register", { nombre, email, password });
      alert("✅ Registro exitoso. Ahora inicia sesión.");
      navigate("/login");
    } catch (err) {
      alert("❌ Error al registrar usuario");
    }
  };

  return (
    <div className="auth-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
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
        <button type="submit">Registrarme</button>
      </form>
      <p>
        ¿Ya tienes cuenta?{" "}
        <a onClick={() => navigate("/login")}>Inicia sesión aquí</a>
      </p>
    </div>
  );
}

export default Register;
