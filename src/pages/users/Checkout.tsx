import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useMessage } from "../../contexts/MessageContext";

const Checkout = () => {
  const { refAchat } = useParams();
  const [achatDetails, setAchatDetails] = useState(null);
  const [isDateValid, setIsDateValid] = useState(true);
  const { setMessage } = useMessage();

  const [paymentDetails, setPaymentDetails] = useState({
    typePaiment: "",
    modePaiment: "",
    montant: "",
    transactionId: "",
    reference: "",
    lieuPaiment: "",
    datePaiment: "",
  });

  const [reste, setReste] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAchatDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/achat/select/${refAchat}`
        );
        setAchatDetails(response.data);
        setReste(response.data.reste);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de l'achat :",
          error
        );
      }
    };

    fetchAchatDetails();
  }, [refAchat]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "datePaiement") {
      const today = new Date();
      const selectedDate = new Date(value);
      today.setHours(0, 0, 0, 0); 
      setIsDateValid(selectedDate >= today);
    }
  
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reste === 0) {
      setMessage("error","Paiement déjà complété !")
      return;
    }
    if (!isDateValid) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/paiment/add", {
        ...paymentDetails,
        refAchat,
      });
      setMessage("success","Paiement effectué avec succès !")
      console.log("", paymentDetails)
      setReste(response.data.reste);
      navigate("/suivi-achats")
    } catch (error) {
      console.error("Erreur lors du paiement :", error);
    }
  };

  const showTransactionId =
    paymentDetails.typePaiment === "Virement bancaire";
  const showReference =
    ["Chèque", "Mobile money"].includes(paymentDetails.typePaiment);
  const showLieuPaiement = paymentDetails.typePaiment === "Espèce";
  const isUnitranche = paymentDetails.modePaiment === "Uni-tranche";

  const getPaymentInfo = () => {
    switch (paymentDetails.typePaiment) {
      case "Mobile money":
        return (
          <div className="p-4 bg-blue-50 rounded border text-blue-800">
            <p>Numéro Mobile Money : <strong>034 12 345 67</strong></p>
          </div>
        );
      case "Virement bancaire":
        return (
          <div className="p-4 bg-green-50 rounded border text-green-800">
            <p>Numéro de compte bancaire : <strong>1234 5678 9012 3456</strong></p>
          </div>
        );
      case "Espèce":
        return (
          <div className="p-4 bg-yellow-50 rounded border text-yellow-800">
            <p>Adresse : <strong>Lot 1M113 Andranovato Manakara</strong></p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-myMarron">Paiement</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Colonne gauche : Détails de l'achat */}
        <div className="p-6 bg-white shadow rounded">
          {achatDetails ? (
            <>
    <h2 className="text-xl font-semibold mb-4">Produits</h2>
        <div className="bg-white shadow rounded p-4 space-y-4">
          {achatDetails?.contents?.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <img
                src={item.produit.imageUrl}
                alt={item.produit.nomProduit}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.produit.nomProduit}</h3>
                <p>Quantité : {item.qte}</p>
                <p>Prix : {item.produit.prix} AR</p>
                <p>Total : {item.montant} AR</p>
              </div>
            </div>
          ))}
          <div className="border-t pt-4">
            <p><strong>Total :</strong> {achatDetails?.total} AR</p>
            <p><strong>Reste :</strong> {achatDetails?.reste} AR</p>
          </div>
          </div>
            </>
          ) : (
            <p>Chargement des détails de l'achat...</p>
          )}
        </div>

        {/* Colonne droite : Formulaire de paiement */}
        <form
            onSubmit={handleSubmit}
            className="p-6 bg-white shadow rounded space-y-4"
          >
            <h2 className="text-xl font-semibold mb-4">Formulaire de Paiement</h2>

            <div>
              <label className="block mb-1">Type de Paiement</label>
              <select
                name="typePaiment"
                value={paymentDetails.typePaiment}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Sélectionnez</option>
                <option value="Chèque">Chèque</option>
                <option value="Virement bancaire">Virement bancaire</option>
                <option value="Mobile money">Mobile money</option>
                <option value="Espèce">Espèce</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Mode de Paiement</label>
              <select
                name="modePaiment"
                value={paymentDetails.modePaiment}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Sélectionnez</option>
                <option value="Uni-tranche">Uni-tranche</option>
                <option value="Multi-tranche">Multi-tranche</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Montant</label>
              <input
                type="number"
                name="montant"
                value={paymentDetails.montant}
                onChange={handleInputChange}
                placeholder={reste > 0 ? `Reste : ${reste}` : ""}
                className="w-full p-2 border rounded"
                required
                min={isUnitranche ? achatDetails?.reste : 1}
                max={reste > 0 ? achatDetails?.reste : achatDetails?.total}
              />
            </div>

            {showTransactionId && (
              <div>
                <label className="block mb-1">Transaction ID</label>
                <input
                  type="text"
                  name="transactionId"
                  placeholder="ID de la transaction"
                  value={paymentDetails.transactionId}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            )}

            {showReference && (
              <div>
                <label className="block mb-1">Référence</label>
                <input
                  type="text"
                  name="reference"
                  placeholder="Référence de la transaction"
                  value={paymentDetails.reference}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            )}

            {showLieuPaiement && (
              <div>
                <label className="block mb-1">Lieu de Paiement</label>
                <input
                  type="text"
                  name="lieuPaiment"
                  placeholder="Lieu de rendez-vous pour le paiment"
                  value={paymentDetails.lieuPaiment}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            )}

            <div>
              <label className="block mb-1">Date de Paiement</label>
              <input
                type="date"
                name="datePaiement"
                value={paymentDetails.datePaiement}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${!isDateValid ? "border-red-500" : ""}`}
                required
              />
              {!isDateValid && (
                <p className="text-red-500 text-sm">
                  La date de paiement ne peut pas être antérieure à aujourd'hui.
                </p>
              )}
            </div>

            {getPaymentInfo()}
            <button
              type="submit"
              className="px-4 py-2 bg-myMarron text-white rounded hover:bg-myMarron-dark disabled:opacity-50"
              disabled={achatDetails?.valide || reste === 0}
            >
              Envoyer le Paiement
            </button>
          </form>

      </div>
    </div>
  );
};

export default Checkout;
