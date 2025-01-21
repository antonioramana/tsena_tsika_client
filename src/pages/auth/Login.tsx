import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import Input from "../../components/Input";
import MyMarronButton from "../../components/MyMarronButton";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"client" | "staff">("client");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as { from: string })?.from || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("loginn", { email, password })
    setError(null);
    setLoading(true);

    // Définir l'URL de l'authentification en fonction du rôle sélectionné
    const authUrl =
      role === "client"
        ? "http://localhost:8080/client/authenticate"
        : "http://localhost:8080/staff/authenticate";

    try {
      const response = await fetch(authUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: email, 
          password,
        }),
      });

      const data = await response.json();

      if (response.status === 200 && data.success && data.token && data.userDetails) {
        login(data.userDetails, data.token);

        // Vérification du rôle pour la redirection
        if (role === "staff") {
          navigate("/admin"); // Rediriger les staff vers /admin
        } else {
          navigate(redirectTo); // Rediriger les clients vers leur destination
        }
      } else {
        setError(data.message || "Email ou mot de passe incorrect !");
      }
    } catch (error) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[400px] mt-5 min-h-[600px] mx-auto bg-gradient-to-r from-neutral-50 to-gray-100 shadow-lg rounded-lg p-8 hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
      <h1 className="text-4xl font-title text-center text-myMarron mb-6 tracking-wide">
        Connexion
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              value="client"
              checked={role === "client"}
              onChange={() => setRole("client")}
              className="mr-2"
            />
            Client
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              value="staff"
              checked={role === "staff"}
              onChange={() => setRole("staff")}
              className="mr-2"
            />
            Staff
          </label>
        </div>
        <Input
          id="email"
          type={role === "client"?"text":"email"}
          label={role === "client"?"Téléphone":"Adresse email"}
          placeholder={role === "client"?"Votre numéro de téléphnoe":"Votre adresse email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="password"
          type="password"
          label="Mot de passe"
          placeholder="Votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-orange-600 text-center">{error}</div>}
        <MyMarronButton type="submit" disabled={loading}>
          {loading ? "Connexion en cours..." : "Se connecter"}
        </MyMarronButton>
      </form>
      <div className="mt-6 text-center space-y-4">
        <a href="#" className="block text-sm text-myYellow hover:underline">
          Mot de passe oublié ?
        </a>
        <p className="text-sm mt-4">
          Pas encore de compte ?{" "}
          <Link to="/inscription" className="text-myYellow hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
