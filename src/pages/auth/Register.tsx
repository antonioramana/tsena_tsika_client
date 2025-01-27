import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyMarronButton from "../../components/MyMarronButton";
import MySecondaryButton from "../../components/MySecondaryButton";

export default function Register() {
  const [formData, setFormData] = useState({
    nomClient: "",
    contactClient:"",
    mailClient: "",
    adresseClient: "",
    domaineActiviteClient: "",
    mdpClient: "",
    confirmMdpClient: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
   const navigate= useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (formData.mdpClient !== formData.confirmMdpClient) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/client/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomClient: formData.nomClient,
          contactClient: formData.contactClient,
          mailClient: formData.mailClient,
          adresseClient: formData.adresseClient,
          domaineActiviteClient: formData.domaineActiviteClient,
          mdpClient: formData.mdpClient,
          confirmMdpClient: formData.confirmMdpClient,
        }),
      });

      const data = await response.json();

      if (response.status === 200 && data.success) {
        setSuccess("Inscription réussie. Vous pouvez maintenant vous connecter.");
        setFormData({
          nomClient: "",
          contactClient: "",
          mailClient: "",
          adresseClient: "",
          domaineActiviteClient: "",
          mdpClient: "",
          confirmMdpClient: "",
        });
        setTimeout(() => {
          navigate("/connexion"); 
        }, 2000);
      } else {
        setError(data.message || "Une erreur est survenue lors de l'inscription.");
      }
    } catch (err) {
      setError("Impossible de se connecter au serveur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[400px] mt-5 min-h-[600px] mx-auto bg-gradient-to-r from-neutral-50 to-gray-100 shadow-lg rounded-lg p-8 hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
      <h1 className="text-4xl font-title text-center text-myMarron mb-6 tracking-wide">
        Inscription
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nomClient"
          placeholder="Nom complet"
          value={formData.nomClient}
          onChange={handleChange}
          required
          className="w-full px-10 py-3 border border-myYellow rounded-md focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-myYellow/50 transition-all duration-300 ease-in-out transform focus:scale-105"
        />
        <input
          type="email"
          name="mailClient"
          placeholder="Adresse email"
          value={formData.mailClient}
          onChange={handleChange}
          required
          className="w-full px-10 py-3 border border-myYellow rounded-md focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-myYellow/50 transition-all duration-300 ease-in-out transform focus:scale-105"
        />
        <input
          type="text"
          name="contactClient"
          placeholder="Tel"
          value={formData.contactClient}
          onChange={handleChange}
          required
          className="w-full px-10 py-3 border border-myYellow rounded-md focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-myYellow/50 transition-all duration-300 ease-in-out transform focus:scale-105"
        />
        <input
          type="text"
          name="adresseClient"
          placeholder="Adresse"
          value={formData.adresseClient}
          onChange={handleChange}
          required
          className="w-full px-10 py-3 border border-myYellow rounded-md focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-myYellow/50 transition-all duration-300 ease-in-out transform focus:scale-105"
        />
        <input
          type="text"
          name="domaineActiviteClient"
          placeholder="Domaine d'activité"
          value={formData.domaineActiviteClient}
          onChange={handleChange}
          required
          className="w-full px-10 py-3 border border-myYellow rounded-md focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-myYellow/50 transition-all duration-300 ease-in-out transform focus:scale-105"
        />
        <input
          type="password"
          name="mdpClient"
          placeholder="Mot de passe"
          value={formData.mdpClient}
          onChange={handleChange}
          required
          className="w-full px-10 py-3 border border-myYellow rounded-md focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-myYellow/50 transition-all duration-300 ease-in-out transform focus:scale-105"
        />
        <input
          type="password"
          name="confirmMdpClient"
          placeholder="Confirmer mot de passe"
          value={formData.confirmMdpClient}
          onChange={handleChange}
          required
          className="w-full px-10 py-3 border border-myYellow rounded-md focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-myYellow/50 transition-all duration-300 ease-in-out transform focus:scale-105"
        />
        {error && <div className="text-orange-600 text-center">{error}</div>}
        {success && <div className="text-green-600 text-center">{success}</div>}
        <div className="mt-6 space-y-4">
          <MyMarronButton type="submit" disabled={loading}>
          {loading ? "Inscription en cours..." : "S'inscrire"}
            </MyMarronButton>
            <Link to="/" className="block">
              <MySecondaryButton>Annuler</MySecondaryButton>
            </Link>
          </div>
      </form>
      <div className="mt-6 text-center space-y-4">
          <p className="text-sm mt-4">
           Déjat un compte ?{" "}
           <Link to="/connexion" className="text-myYellow hover:underline">
             Se connecter 
           </Link>
         </p> 
      </div>
    </div>
  );
}
