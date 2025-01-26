import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import { formatDateToFrench } from "../../utils/formatDateToFrench";
import generateInvoicePDF from "../../services/generateInvoicePDF";

const SuiviAchats = () => {
  const { user } = useAuth();
  const [achats, setAchats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAchats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/client/achat_client/${user.numMatricule}`
        );
        setAchats(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des achats :", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.numMatricule) {
      fetchAchats();
    }
  }, [user]);

  const handleCheckout = (refAchat) => {
    navigate(`/checkout/${refAchat}`);
  };
  
  

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl text-myMarron font-bold mb-4">Suivi des Achats</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achats.map((achat, index) => {
          const total = achat.total || 0; // Total de l'achat
          const totalPaye = achat.totalPaye || 0; // Montant payé
          const reste = achat.reste; // Montant restant

          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col gap-4"
            >
              <div>
                <h2 className="text-lg font-semibold text-myMarron mb-2">
                  Référence Commande: {achat.refCommande}
                </h2>
                <p className="text-sm text-gray-500">
                  Commandé le : {formatDateToFrench(achat.dateCommande)}
                </p>
                <p className="text-sm text-gray-500">
                  Lieu de Livraison : {achat.lieuLivraison}
                </p>
                <p className="text-sm text-gray-500">
                  Votre proposition de livraison: {formatDateToFrench(achat.dateLivraisonClient)}
                </p>
               {achat.dateLivraisonFournisseur &&
                <p className="text-sm text-gray-500">
                   Date de livraison possible : {formatDateToFrench(achat.dateLivraisonFournisseur)}
                </p>
               } 
                <p
                  className={`text-sm font-semibold ${
                    achat.etat === "Livré" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  État : {achat.etat}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {achat.contents.map((content, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 border-b border-gray-200 pb-2 mb-2"
                  >
                    <img
                      src={content.produit.imageUrl}
                      alt={content.produit.nomProduit}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold text-gray-700">
                        {content.produit.nomProduit}
                      </p>
                      <p className="text-sm text-gray-500">
                        Prix: {content.produit.prix} AR
                      </p>
                    </div>
                    <p className="text-sm text-gray-700">Quantité: {content.qte}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 mt-2">
                <p className="text-sm text-gray-700">
                  <strong>Total : </strong>{total.toLocaleString()} AR
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Total Payé : </strong>{totalPaye.toLocaleString()} AR
                </p>
                <p className={`text-sm font-semibold ${reste > 0 ? "text-red-500" : "text-green-500"}`}>
                  <strong>Reste : </strong>{reste.toLocaleString()} AR
                </p>
              </div>

              {/* Section Paiements */}
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Détails des Paiements :  {achat.paiments.length <=0 && <strong className="text-red-500">Aucun Paiment</strong>}</h3>
                   <div className="space-y-2"> 
                  {achat.paiments.map((paiement, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 border border-gray-200 rounded p-2 flex flex-col gap-1"
                    >
                      {
                        paiement.reference &&
                        <p className="text-xs text-gray-700">
                        <strong>Référence :</strong> {paiement.reference || "N/A"}
                      </p>
                      }
                      <p className="text-xs text-gray-700">
                        <strong>Date Paiement :</strong> {formatDateToFrench(paiement.datePaiment)}
                      </p>
                      <p className="text-xs text-gray-700">
                        <strong>Montant :</strong> {paiement.montant.toLocaleString()} AR
                      </p>
                      <p className="text-xs text-gray-700">
                        <strong>Type de Paiement :</strong> {paiement.typePaiment || "N/A"}
                      </p>
                      <p className="text-xs text-gray-700">
                        <strong>Mode de Paiement :</strong> {paiement.modePaiment || "N/A"}
                      </p>
                      {paiement.typePaiment === "Espèce" && (
                        <p className="text-xs text-gray-700">
                          <strong>Lieu de Paiement :</strong> {paiement.lieuPaiment || "N/A"}
                        </p>
                      )}
                      {paiement.typePaiment === "Virement bancaire" && (
                        <p className="text-xs text-gray-700">
                          <strong>ID Transaction:</strong> {paiement.transactionId || "N/A"}
                        </p>
                      )}
                      <p className={`text-xs font-semibold ${paiement.valide ? "text-green-500" : "text-red-500"}`}>
                        <strong>Statut :</strong> {paiement.valide ? "Validé" : "Non Validé"}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleCheckout(achat.refAchat)}
                  className="bg-myMarron text-white px-3 py-2 rounded hover:bg-myMarron-dark"
                >
                  Paiement
                </button>
                {achat?.reste <= 0 &&
                <button  
                  onClick={() => generateInvoicePDF(achat.refAchat)}
                  className="bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700"
                >
                  Générer Facture
                </button>
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuiviAchats;
