import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import { formatDateToFrench } from "../../utils/formatDateToFrench";
import generateInvoicePDF from "../../services/generateInvoicePDF";

const etatOptions = [
  "Tous",
  "En attente de traitement",
  "En cours de traitement",
  "En attente de livraison",
  "En cours de livraison",
  "Livré",
  "Annulé",
];

export default function AchatAd() {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [achats, setAchats] = useState([]);
  const [selectedAchat, setSelectedAchat] = useState(null);
  const [achatDetails, setAchatDetails] = useState(null);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [paymentStatusMessage, setPaymentStatusMessage] = useState('');

  const [etatFiltre, setEtatFiltre] = useState("Tous");

  const achatsFiltres = etatFiltre === "Tous"
  ? achats
  : achats.filter((achat) => achat.etat === etatFiltre);

  const headers = [
    { label: "Référence Achat", key: "refAchat", className: "w-32" },
    { label: "Date Commande", key: "dateCommande", className: "w-40" },
    { label: "Date de livraison client", key: "dateLivraisonClient" },
    { label: "Lieu Livraison", key: "lieuLivraison" },
    { label: "Paiement", key: "paiement" },
    { label: "État", key: "etat" },
  ];
  const fetchAchats =()=>{
    axios
    .get("http://localhost:8080/achat/showall")
    .then((response) => setAchats(response.data || []))
    .catch((error) => console.error("Erreur lors du chargement des achats:", error));
  }
  useEffect(() => {
    fetchAchats()
  }, []);

  const handleOpenDetailModal = (refAchat) => {
    axios
      .get(`http://localhost:8080/achat/select/${refAchat}`)
      .then((response) => {
        setAchatDetails(response.data);
        setIsDetailModalOpen(true);
      })
      .catch((error) => console.error("Erreur lors du chargement des détails:", error));
  };

  const handleOpenEditModal = (achat) => {
    setSelectedAchat(achat);
    setIsEditModalOpen(true);
  };

  const handleUpdatePaymentValidation = (idPaiment, newValide) => {
   
    axios
      .put(`http://localhost:8080/paiment/edit/${idPaiment}`, { valide: newValide })
      .then(() => {
        setAchatDetails((prev) => ({
          ...prev,
          paiments: prev.paiments.map((paiment) =>
            paiment.idPaiment === idPaiment ? { ...paiment, valide: newValide } : paiment
          ),
        }));
        if (newValide) {
          setPaymentStatusMessage('Le paiement a été validé avec succès.');
        } else {
          setPaymentStatusMessage('Le paiement a été annulé.');
        }
                setTimeout(() => setPaymentStatusMessage(''), 5000);
      })
      .catch((error) => console.error("Erreur lors de la mise à jour du paiement:", error));
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteConfirmModalOpen(false);
    setSelectedAchat(null);
  };

  const handleUpdateAchat = (updatedData) => {
    const {dateLivraisonFournisseur, etat}= updatedData

    axios
      .put(`http://localhost:8080/achat/edit/${selectedAchat.refAchat}`, {dateLivraisonFournisseur,etat})
      .then(() => {
        setAchats((prevAchats) =>
          prevAchats.map((achat) =>
            achat.id === selectedAchat.id ? { ...achat, ...updatedData } : achat
          )
        );
        fetchAchats();
        handleCloseModal();
      })
      .catch((error) => console.error("Erreur lors de la mise à jour:", error));
  };

  const handleEtatChange = (refAchat, newEtat) => {
    axios
      .put(`http://localhost:8080/achat/edit/${refAchat}`, { etat: newEtat })
      .then(() => {
        setAchats((prevAchats) =>
          prevAchats.map((achat) =>
            achat.refAchat === refAchat ? { ...achat, etat: newEtat } : achat
          )
        );
      })
      .catch((error) => console.error("Erreur lors de la mise à jour de l'état:", error));
  };

  const renderEtatStyle = (etat) => {
    const styles = {
      "En attente de traitement": "bg-gray-200 text-gray-800",
      "En cours de traitement": "bg-blue-200 text-blue-800",
      "En attente de livraison": "bg-yellow-200 text-yellow-800",
      "En cours de livraison": "bg-orange-200 text-orange-800",
      Livré: "bg-green-200 text-green-800",
      Annulé: "bg-red-200 text-red-800",
    };
    return styles[etat] || "bg-gray-100 text-gray-600";
  };

  const handleOpenDeleteConfirmModal = (achat) => {
    setIsDeleteConfirmModalOpen(true);
    setSelectedAchat(achat)
  };

  const handleDeleteAchat = () => {
    if (selectedAchat) {
      axios
        .delete(`http://localhost:8080/achat/delete/${selectedAchat.refAchat}`) 
        .then(() => {
          fetchAchats();
           handleCloseModal();
        })
        .catch((error) => console.error("Erreur lors de la suppression de l'achat:", error));
    }
  };
  return (
    <div className="p-6 space-y-6">
 <div className="mb-6 flex items-center space-x-6">
  <label
    htmlFor="etatFilter"
    className="text-lg font-semibold text-gray-800"
  >
    Filtrer par état :
  </label>
  <select
    id="etatFilter"
    value={etatFiltre}
    onChange={(e) => setEtatFiltre(e.target.value)}
    className="px-5 py-3 border-2 border-myMarron rounded-xl shadow-lg focus:ring-4 focus:ring-myMarron focus:outline-none transition ease-in-out duration-300"
  >
    {etatOptions.map((option) => (
      <option key={option} value={option} className="text-gray-700 text-lg">
        {option}
      </option>
    ))}
  </select>
</div>


      <Table
        headers={headers}
        data={achatsFiltres.map((achat) => ({
          ...achat,
          dateCommande: formatDateToFrench(achat.dateCommande),
          dateLivraisonClient: formatDateToFrench(achat.dateLivraisonClient),
          paiement: (
            <div className="space-y-1">
              <p>
                <strong>Total:</strong>
                <span className="ml-2 font-semibold text-blue-600">{achat.total} Ar</span>
              </p>
              <p>
                <strong>Payé:</strong>
                <span className="ml-2 font-semibold text-green-600">{achat.totalPaye} Ar</span>
              </p>
              <p>
                <strong>Reste:</strong>
                <span className="ml-2 font-semibold text-red-600">{achat.reste} Ar</span>
              </p>
            </div>
          ),
          etat: (
            <select
              value={achat.etat}
              onChange={(e) => handleEtatChange(achat.refAchat, e.target.value)}
              className={`px-2 py-1 rounded ${renderEtatStyle(achat.etat)}`}
            >
              <option value="En attente de traitement">En attente de traitement</option>
              <option value="En cours de traitement">En cours de traitement</option>
              <option value="En attente de livraison">En attente de livraison</option>
              <option value="En cours de livraison">En cours de livraison</option>
              <option value="Livré">Livré</option>
              <option value="Annulé">Annulé</option>
            </select>
          ),
        }))}
        onView={(achat) => handleOpenDetailModal(achat.refAchat)}
        onEdit={handleOpenEditModal}
        onDelete={(achat) => handleOpenDeleteConfirmModal(achat)}
      />
{/* Modal de détails d'achat */}
{isDetailModalOpen && achatDetails && (
  <Modal isOpen={isDetailModalOpen} onAction={() => generateInvoicePDF(achatDetails.refAchat)} onClose={handleCloseModal} labelAction="Générer facture">
    <div className="p-3 space-y-3">
      {/* Titre */}
      <h2 className="text-lg font-semibold text-center">Détails de l'Achat</h2>
      {paymentStatusMessage && (
          <div className="p-3 mt-4 text-center bg-green-200 text-green-800 rounded-md">
            {paymentStatusMessage}
          </div>
        )}
      {/* Section Achat avec layout parallèle */}
      <div className="flex space-x-8 overflow-y-auto">
        {/* Informations d'achat à gauche */}
        <div className="w-1/2 text-sm text-gray-700">
          <p><strong>Réf. Achat:</strong> <span className="text-blue-600">{achatDetails.refAchat}</span></p>
          <p><strong>Date:</strong> {formatDateToFrench(achatDetails.dateCommande)}</p>
          <p>
          <strong>Livraison :</strong>
          {achatDetails.dateLivraisonFournisseur ? (
            <>
              {formatDateToFrench(achatDetails.dateLivraisonFournisseur)} (Fournisseur) à {achatDetails.lieuLivraison}
            </>
          ) : (
            <>
              {formatDateToFrench(achatDetails.dateLivraisonClient)} à {achatDetails.lieuLivraison}
            </>
          )}
        </p>
          <p><strong>État:</strong> <span className={`font-semibold ${renderEtatStyle(achatDetails.etat)}`}>{achatDetails.etat}</span></p>
        </div>

        {/* Section Produits à droite */}
        <div className="w-1/2 text-sm overflow-y-auto max-h-96">
          <h3 className="font-semibold mb-2">Produits</h3>
          <div className="flex flex-col gap-2">
            {achatDetails?.contents?.map((item, index) => (
              <div key={index} className="flex items-center justify-between space-x-4 text-xs">
                <img
                  src={item.produit.imageUrl}
                  alt={item.produit.nomProduit}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.produit.nomProduit}</p>
                  <p>Quantité: {item.qte}</p>
                  <p>Prix: {item.produit.prix} AR</p>
                  <p>Total: {item.montant} AR</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Paiements */}
      <h3 className="text-sm font-semibold mt-3">Paiements</h3>
      <table className="table-auto w-full text-xs">
        <thead>
          <tr>
            <th className="border px-2 py-1 text-left">Réf.</th>
            <th className="border px-2 py-1 text-left">Date</th>
            <th className="border px-2 py-1 text-left">Paiement</th>
            <th className="border px-2 py-1 text-left">Montant</th>
            <th className="border px-2 py-1 text-left">Valide</th>
          </tr>
        </thead>
        <tbody>
          {achatDetails.paiments.map((paiment) => (
            <tr key={paiment.idPaiment}>
              <td className="border px-2 py-1">{paiment.reference}, {paiment.transactionId}</td>
              <td className="border px-2 py-1">{formatDateToFrench(paiment.datePaiment)}</td>
              <td className="border px-2 py-1">{paiment.modePaiment}, {paiment.typePaiment} ,{paiment.lieuPaiment}</td>
              <td className="border px-2 py-1">{paiment.montant} AR</td>
              <td className="border px-2 py-1">
                <input
                  type="checkbox"
                  checked={paiment.valide}
                  onChange={(e) =>
                    handleUpdatePaymentValidation(paiment.idPaiment, e.target.checked)
                  }
                  className="form-checkbox text-blue-600"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Modal>
)}


            {/* Modal de modification */}
       {selectedAchat && isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          labelAction="Mettre à jour"
          onAction={() => handleUpdateAchat(selectedAchat)}
        >
          <div>
            <h2 className="text-lg font-bold">Modifier l'état ou reprogrammer la livraison</h2>
            <label className="block my-2">
              <span className="text-gray-700 my-2">Reprogrammée la Livraison pour (facultatif):</span>
              <input
                type="datetime-local"
                value={selectedAchat.dateLivraisonFournisseur || ""}
                onChange={(e) =>
                  setSelectedAchat((prev) => ({ ...prev, dateLivraisonFournisseur: e.target.value }))
                }
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition ease-in-out"
                />
            </label>
            <label className="block my-2">
              <span className="text-gray-700 my-2">État:</span>
              <select
              value={selectedAchat.etat || ""}
              onChange={(e) =>
                setSelectedAchat((prev) => ({ ...prev, etat: e.target.value }))
              }
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition ease-in-out"
            >
              <option value="En attente de traitement">En attente de traitement</option>
              <option value="En cours de traitement">En cours de traitement</option>
              <option value="En attente de livraison">En attente de livraison</option>
              <option value="En cours de livraison">En cours de livraison</option>
              <option value="Livré">Livré</option>
            </select>

            </label>
          </div>
        </Modal>
      )}
       <Modal
        isOpen={isDeleteConfirmModalOpen}
        onClose={handleCloseModal}
        onAction={handleDeleteAchat}
        labelAction="Supprimer"
      >
        <p>Êtes-vous sûr de vouloir supprimer cet achat ?</p>
      </Modal>
    </div>
  );
}
