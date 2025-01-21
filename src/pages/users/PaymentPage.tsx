import { useState } from "react";
import { useParams } from "react-router-dom";

const PaymentPage = () => {
  const { paymentId } = useParams<{ paymentId: string }>();
  console.log("ID de paiement:", paymentId); // Vérification de l'ID de paiement

  // Données statiques du panier
  const cartItems = [
    { id: "1", title: "Produit A", quantity: 2, price: 100, image: "https://via.placeholder.com/150" },
    { id: "2", title: "Produit B", quantity: 1, price: 200, image: "https://via.placeholder.com/150" },
    { id: "3", title: "Produit C", quantity: 3, price: 50, image: "https://via.placeholder.com/150" },
  ];

  // Données utilisateur avec formulaire
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    deliveryLocation: "",
    paymentMethod: "cash", // Valeur par défaut
    mobileNumber: "",
    transferAccountNumber: "",
    checkNumber: "",
    rendezvousLocation: "",
  });

  // Calcul du total du panier
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  // Gérer la modification des champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Page de paiement</h1>

      {/* Formulaire utilisateur */}
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Informations utilisateur</h2>

        {/* Formulaire avec champs pour saisir les informations */}
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="fullName">Nom complet</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={userDetails.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Votre nom complet"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Votre email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="phone">Téléphone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Votre téléphone"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="deliveryLocation">Lieu de livraison</label>
            <input
              type="text"
              id="deliveryLocation"
              name="deliveryLocation"
              value={userDetails.deliveryLocation}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Adresse de livraison"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="paymentMethod">Mode de paiement</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={userDetails.paymentMethod}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="cash">Cash</option>
              <option value="transfer">Virement bancaire</option>
              <option value="check">Chèque</option>
            </select>
          </div>
        </form>
      </div>

      {/* Affichage des articles du panier et total dans la même colonne */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Détails de votre commande</h2>
        <div className="flex flex-col space-y-4 mb-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b">
              <div className="flex items-center">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                <span className="ml-4">{item.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Quantité: {item.quantity}</span>
                <span>{(item.quantity * item.price).toFixed(2)} AR</span>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center py-2 border-t">
          <h3 className="text-xl font-bold">Total: {calculateTotal().toFixed(2)} AR</h3>
        </div>
      </div>

      {/* Bouton de confirmation */}
      <div className="mt-6 text-center">
        <button
          onClick={() => console.log("Confirmer le paiement", userDetails)}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
        >
          Confirmer le paiement
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
