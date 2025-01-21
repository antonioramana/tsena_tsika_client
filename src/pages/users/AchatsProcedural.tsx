
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/useAuth";

export default function GestionFichiers() {
  const [dossiers, setDossiers] = useState([]);
  const [fichiers, setFichiers] = useState({});
  const [selectedDossierId, setSelectedDossierId] = useState(null);
  const [uploadStatus, setUploadStatus] = useState({}); // Statut des uploads
  const [newDossierFile, setNewDossierFile] = useState(null); // Fichier pour le nouveau dossier
  const [isCreating, setIsCreating] = useState(false); // Statut de la création d'un dossier
  const { user } = useAuth();

  const numMatricule = user?.numMatricule;


  // Traduction des champs en français
  const labels = {
    demandeDevisUrl: "Demande de devis",
    devisUrl: "Devis",
    bcfUrl: "BCF",
    bcfValideUrl: "BCF validé",
    bcfRetourneUrl: "BCF retourné",
    bonLivraisonUrl: "Bon de livraison",
    bonLivraisonValideUrl: "Bon de livraison validé",
    bonReceptionUrl: "Bon de réception",
    bonReceptionValideUrl: "Bon de réception validé",
    factureUrl: "Facture",
    demandePieceUrl: "Demande de pièce",
    retourDemandePieceUrl: "Retour demande de pièce",
  };

  // Charger la liste des dossiers depuis l'API
  useEffect(() => {
    const fetchDossiers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/dossier/showall");
        setDossiers(response.data);
        console.log("Dossier", dossiers) // Supposons que l'API renvoie un tableau de dossiers
      } catch (error) {
        console.error("Erreur lors de la récupération des dossiers:", error);
      }
    };

    fetchDossiers();
  }, []);

  // Charger les fichiers d'un dossier spécifique
  const handleSelectDossier = async (idDossier) => {
    setSelectedDossierId(idDossier);

    try {
      const response = await axios.get(
        `http://localhost:8080/dossier/select/${idDossier}`
      );
      setFichiers(response.data); // Supposons que l'API renvoie un objet contenant les fichiers
    } catch (error) {
      console.error("Erreur lors de la récupération des fichiers:", error);
    }
  };

  // Gérer l'upload de fichiers
  const handleFileUpload = async (idDossier, fileType, file) => {
    const formData = new FormData();
    formData.append("idDossier", idDossier);
    formData.append("matriculeClient", numMatricule);
    formData.append(fileType, file);
    try {
      const response = await axios.post("http://localhost:8080/dossier/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const uploadedFileUrl = response.data.url; // Assurez-vous que l'API retourne une URL
        setFichiers((prev) => ({
          ...prev,
          [fileType]: uploadedFileUrl,
        }));
        setUploadStatus((prev) => ({ ...prev, [fileType]: "success" }));
      } else {
        setUploadStatus((prev) => ({ ...prev, [fileType]: "failed" }));
      }
    } catch (error) {
      setUploadStatus((prev) => ({ ...prev, [fileType]: "error" }));
    }
  };

  // Créer un nouveau dossier avec un fichier pour la "Demande de devis"
  const handleCreateDossier = async () => {
    if (!newDossierFile) {
      alert("Veuillez sélectionner un fichier pour la demande de devis.");
      return;
    }

    const formData = new FormData();
    formData.append("demandeDevis", newDossierFile);
    formData.append("matriculeClient", numMatricule);
    
    setIsCreating(true); // Début de la création

    try {
      const response = await axios.post("http://localhost:8080/dossier/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        // Ajouter le nouveau dossier à la liste
        setDossiers((prev) => [...prev, response.data]);
        alert("Dossier créé avec succès !");
        setNewDossierFile(null);
      } else {
        alert("Échec de la création du dossier.");
      }
    } catch (error) {
      console.error("Erreur lors de la création du dossier:", error);
      alert("Erreur lors de la création du dossier.");
    } finally {
      setIsCreating(false); // Fin de la création
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Gestion des Fichiers</h1>

      {/* Création d'un nouveau dossier */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Démander un dévis</h2>
        <input
          type="file"
          onChange={(e) => setNewDossierFile(e.target.files[0])}
          className="block w-full text-sm text-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-myMarron hover:file:bg-blue-100"
        />
        <button
          onClick={handleCreateDossier}
          className={`mt-4 px-4 py-2 text-white rounded ${
            isCreating ? "bg-gray-400" : "bg-myMarron"
          }`}
          disabled={isCreating}
        >
          {isCreating ? "Demande en cours..." : "Demander un dévis"}
        </button>
      </div>

      {/* Liste des dossiers */}
      <div className="mb-6">
  <h2 className="text-xl font-bold text-gray-900 mb-4">Dossiers</h2>
  <ul className="space-y-4">
    {dossiers.map((dossier) => (
      <li
        key={dossier.idDossier}
        className="bg-white shadow-lg hover:shadow-xl hover:bg-blue-50 cursor-pointer rounded-lg transition-all duration-300 p-4 flex items-center justify-between group"
      >
        <div className="flex items-center space-x-3">
          {/* Icône ou image du dossier si nécessaire */}
          <svg
            className="w-6 h-6 text-myMarron group-hover:text-myMarron transition-colors duration-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"
            />
          </svg>
          <span
            onClick={() => handleSelectDossier(dossier.idDossier)}
            className="text-lg font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-300"
          >
            {dossier.nom || `Dossier ${dossier.idDossier}`}
          </span>
        </div>
        <span className="text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
          {/* Ajouter des détails supplémentaires comme la date de création ou un nombre d'éléments */}
          {dossier.createdAt || "Créé récemment"}
        </span>
      </li>
    ))}
  </ul>
</div>


      {/* Fichiers du dossier sélectionné */}
      {selectedDossierId && (
  <div>
    <h2 className="text-lg font-semibold mb-4">Fichiers du dossier {selectedDossierId}</h2>
    {Object.entries(fichiers).map(([field, value]) => (
      <div key={field} className="mb-6">
        <label className="block font-medium text-gray-700 mb-2">
          {labels[field]} :
        </label>

        {/* Affichage uniquement des fichiers pour certains champs, sans input file */}
        {["devisUrl", "bcfValideUrl", "bcfRetourneUrl", "bonLivraisonValideUrl", "bonReceptionValideUrl", "factureUrl", "retourDemandePieceUrl"].includes(field) ? (
          value !== "nofile" ? (
            <div className="flex items-center gap-4">
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Télécharger
              </a>
              <span className="text-green-600">✅ Fichier disponible</span>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="text-red-600">❌ Pas encore de fichier</span>
            </div>
          )
        ) : (
          // Affichage de l'input file pour les autres champs
          value === "nofile" ? (
            <div>
              <input
                type="file"
                onChange={(e) =>
                  handleFileUpload(selectedDossierId, field, e.target.files[0])
                }
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Télécharger
              </a>
              <span className="text-green-600">✅ Fichier disponible</span>
            </div>
          )
        )}

        {/* Affichage du statut d'upload */}
        {uploadStatus[field] && (
          <p
            className={`text-sm mt-2 ${
              uploadStatus[field] === "success"
                ? "text-green-500"
                : uploadStatus[field] === "failed"
                ? "text-red-500"
                : "text-yellow-500"
            }`}
          >
            {uploadStatus[field] === "success"
              ? "✅ Upload réussi"
              : uploadStatus[field] === "failed"
              ? "❌ Échec de l'upload"
              : "⚠️ Erreur d'upload"}
          </p>
        )}
      </div>
    ))}
  </div>
)}


    </div>
  );
}
