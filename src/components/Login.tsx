import "./Login.css";
import React, { FormEvent, useState } from "react";

const Login = ({
  handleLogin,
}: {
  handleLogin: (token: string, username: string) => void;
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError("");

    try {
      if (!username || !password) {
        throw new Error("Identifiant ou mot de passe non rempli");
      }

      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const reason = await response.text();

        throw new Error(reason);
      }

      const data: { token: string } = await response.json();
      const token = data.token;

      handleLogin(token, username);
    } catch (error) {
      const defaultMsg = "Une erreur est survenue!";
      const msg = error instanceof Error ? error.message : defaultMsg;
      setAuthError(msg);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleFormSubmit} className="login-form-container">
        <h1> Se connecter</h1>
        <input
          placeholder="Identifiant"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
        <a href="https://fakestoreapi.com/docs#a-login">
          › Mot de passe oublié
        </a>
        <a href="https://fakestoreapi.com/docs#a-login">
          › Nouveau ? Inscrivez-vous !
        </a>
        {authError && <div className="error">{authError}</div>}
      </form>
    </div>
  );
};

export default Login;
