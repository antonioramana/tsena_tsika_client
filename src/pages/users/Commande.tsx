import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../components/Modal";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { formatDateToISO8601 } from "../../utils/formatDateToISO8601";
import { useMessage } from "../../contexts/MessageContext";

const calculateDeliveryDate = () => {
  const now = new Date();
  now.setHours(now.getHours() + 48);  // Ajoute 48 heures à la date actuelle
  return now.toISOString().slice(0, 16);  // Formate la date pour l'input "datetime-local"
};

export default function Commande() {
  const { user }= useAuth();
  const { id: productId } = useParams<{ productId: string }>(); 
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [lieuLivraison, setLieuLivraison] = useState<string>("");
  const [dateLivraisonClient, setDateLivraisonClient] = useState(new Date());

  const dateCommande =  new Date().toISOString();
   const navigate= useNavigate();
   const [isDateValid, setIsDateValid] = useState(true);
  const { setMessage } = useMessage();

  useEffect(() => {
      setDateLivraisonClient(calculateDeliveryDate()); 
    }, []);
   
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  useEffect(() => {
    axios
      .get(`http://localhost:8080/produit/select/${productId}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Erreur de récupération:", error));
  }, [productId]);
  const handleDateChange = (e) => {
    const selectedDate =e.target.value;
    if (selectedDate <= calculateDeliveryDate()) {
      setIsDateValid(false);
      setDateLivraisonClient(e.target.value)
    } else {
      setIsDateValid(true);
    }
    //setDateLivraisonClient(selectedDate);
  };
  const handlePurchaseClick = () => {
    setIsModalOpen(true);
  };

  const finalPrice = product ? product.prix * quantity : 0;

  const handlePaymentConfirm =  async () => {
    const payload = {
      numMatricule: user.numMatricule, 
      lieuLivraison,
      dateLivraisonClient: formatDateToISO8601(dateLivraisonClient),
      dateCommande,
      details: [{idProduit: productId ,qte: quantity, negociation: 0}],
      direct: false, 
      etat: "En cours", 
    };
    if (!isDateValid) {
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/achat/add", payload);
       const refAchat= response.data?.ref;
       setMessage("success","Achat effectué avec succès!");
       if(refAchat){
         navigate("/checkout/"+refAchat);
       }
    } catch (error) {
      console.error("Erreur lors de la validation de l'achat :", error);
      setMessage("error","Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsModalOpen(false);
    } 
  };

  if (!product) return <div>Chargement...</div>;

  return (
    <div className="container mx-auto py-10 px-5">
      <Link to={"/"} className="text-myWhite bg-myYellowLin px-12 py-2 rounded-full">
        Retour
      </Link>
      <div className="mt-4 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image du produit */}
          <img
            src={product.imageUrl}
            alt={product.nomProduit}
            className="w-full h-80 object-contain"
          />

          {/* Informations du produit */}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800">{product.nomProduit}</h1>
            <p className="text-gray-600 mt-3">{product.detailTechnique}</p>
            <p className="text-gray-600 mt-3">{product.marque}</p>
            <p className="text-gray-600 mt-3">{product.libelleArticle}</p>
            <p className="text-2xl font-semibold text-myMarron mt-5">
              {product.prix} AR
            </p>

            {/* Sélecteur de quantité */}
            <div className="mt-5">
              <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
                Quantité
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                className="border rounded-md p-2 w-20 text-center"
              />
            </div>
            <div className="mt-4">
              <span className="text-lg font-semibold text-gray-800">
                Total:{" "}
                <span className="text-xl font-bold text-myMarron">
                  {isNaN(quantity) ? 0 : product.prix * quantity} AR
                </span>
              </span>
            </div>
            {/* Bouton d'achat */}
            <button
              onClick={handlePurchaseClick}
              className="mt-6 bg-myMarron text-white px-6 py-2 rounded-md hover:bg-myMarron-dark transition"
            >
              Acheter
            </button>
          </div>
        </div>
      </div>

      {/* Modal pour le paiement */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={handlePaymentConfirm}
        labelAction="Confirmer l'achat"
      >
        <h2 className="text-lg font-bold text-myMarron mb-4">Détails de l'achat</h2>

        {/* Détails du produit */}
        <div className="mb-4">
          <p>
            <span className="font-medium">Produit:</span> {product.nomProduit}
          </p>
          <p>
            <span className="font-medium">Prix:</span> {product.prix} AR
          </p>
          <p>
            <span className="font-medium">Quantité:</span> {quantity}
          </p>
          <p>
            <span className="font-medium">Prix total:</span> {finalPrice} AR
          </p>
        </div>
        {/* Formulaire utilisateur */}
        <div className="space-y-4">
          <input
            type="text"
            name="lieuLivraison"
            placeholder="Lieu de Livraison"
            value={lieuLivraison}
            onChange={(e)=>setLieuLivraison(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
           <input
             type="datetime-local"
            name="dateLivraisonClient"
            placeholder="Date de Livraison"
            value={dateLivraisonClient}
            onChange={handleDateChange} 
            className="w-full border rounded-md p-2"
            required
          />
           {!isDateValid && (
                  <p className="text-red-500 text-sm">
                    La date de livraison doit être au moins 48h après votre commande. Nous vous contacterons pour confirmer un jour disponible avant cette date.
                  </p>
               )}
        </div>
      </Modal>
    </div>
  );
}
