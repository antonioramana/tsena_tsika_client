import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFileInvoice } from "react-icons/fa";

export default function PurchaseProcess() {
  const [step, setStep] = useState(1);
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    // Fetch purchase requests or orders
    axios
      .get("http://localhost:8080/purchase-requests")
      .then((response) => setRequests(response.data))
      .catch((error) => console.error("Error fetching requests:", error));
  }, []);

  const handleNextStep = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-bold">Étape 1 : Demande de devis</h2>
            <p>Liste des demandes de devis des clients :</p>
            <ul className="mt-4 space-y-2">
              {requests.map((request) => (
                <li
                  key={request.id}
                  className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200"
                  onClick={() => setSelectedRequest(request)}
                >
                  <span>{request.clientName}</span>
                  <FaFileInvoice className="text-lg text-blue-600" />
                </li>
              ))}
            </ul>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-xl font-bold">Étape 2 : Validation de commande</h2>
            <p>Détails de la commande en attente de validation :</p>
            {selectedRequest ? (
              <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <h3 className="font-bold">{selectedRequest.clientName}</h3>
                <p>Articles demandés : {selectedRequest.items}</p>
                <div className="flex gap-4 mt-4">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
                    onClick={handleNextStep}
                  >
                    Valider
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                    onClick={handlePrevStep}
                  >
                    Rejeter
                  </button>
                </div>
              </div>
            ) : (
              <p>Sélectionnez une demande pour continuer.</p>
            )}
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-xl font-bold">Étape 3 : Bon de livraison</h2>
            <p>Génération du bon de livraison pour la commande :</p>
            {selectedRequest ? (
              <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <h3 className="font-bold">{selectedRequest.clientName}</h3>
                <p>Articles : {selectedRequest.items}</p>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 mt-4"
                  onClick={handleNextStep}
                >
                  Générer le bon de livraison
                </button>
              </div>
            ) : (
              <p>Sélectionnez une commande pour continuer.</p>
            )}
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="text-xl font-bold">Étape 4 : Bon de réception</h2>
            <p>Confirmation de réception par le client :</p>
            {selectedRequest ? (
              <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <h3 className="font-bold">{selectedRequest.clientName}</h3>
                <p>Articles : {selectedRequest.items}</p>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 mt-4"
                >
                  Confirmer réception
                </button>
              </div>
            ) : (
              <p>Sélectionnez une commande pour continuer.</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Processus d'Achat</h1>
      <div className="flex justify-between mb-6">
        <button
          className={`px-4 py-2 rounded-lg shadow-md ${
            step > 1 ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-100 cursor-not-allowed"
          }`}
          onClick={handlePrevStep}
          disabled={step <= 1}
        >
          Précédent
        </button>
        <button
          className={`px-4 py-2 rounded-lg shadow-md ${
            step < 4 ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-100 cursor-not-allowed"
          }`}
          onClick={handleNextStep}
          disabled={step >= 4}
        >
          Suivant
        </button>
      </div>
      {renderContent()}
    </div>
  );
}
