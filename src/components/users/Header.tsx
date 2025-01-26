import { CiSearch } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SubHeader } from "..";
import { useAuth } from "../../contexts/useAuth";
import Avatar from "../Avatar";
import { useCart } from "../../contexts/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import axios from "axios";
import { formatDateToISO8601 } from "../../utils/formatDateToISO8601";
import { useMessage } from "../../contexts/MessageContext";

// Fonction pour calculer la date de livraison (48 heures après la date actuelle)
const calculateDeliveryDate = () => {
  const now = new Date();
  now.setHours(now.getHours() + 48);  // Ajoute 48 heures à la date actuelle
  return now.toISOString().slice(0, 16);  // Formate la date pour l'input "datetime-local"
};

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart(); // Gestion du panier
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [lieuLivraison, setLieuLivraison] = useState("");
  const [dateLivraisonClient, setDateLivraisonClient] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [isDateValid, setIsDateValid] = useState(true);
  const { setMessage } = useMessage();

  useEffect(() => {
    setDateLivraisonClient(calculateDeliveryDate()); // Définit la date de livraison par défaut à 48h après la date actuelle
  }, []);

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

  const numMatricule = user?.numMatricule;
  // const numMatricule = "C000001";
  const openCartModal = () => setIsCartModalOpen(true);
  const closeCartModal = () => setIsCartModalOpen(false);

  // Mise à jour des quantités dans le panier
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return; // Empêche les quantités inférieures à 1
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Calcul du total du panier
  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const removeItemFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const handleCheckout = async () => {
    if (!lieuLivraison || !dateLivraisonClient || cartItems.length === 0) {
      setMessage("error", "Veuillez remplir tous les champs et ajouter des produits au panier.");
      return;
    }
    const details = cartItems.map((item) => ({
      idProduit: item.id,
      qte: item.quantity,
      negociation: 0,
    }));
    const dateCommande=  formatDateToISO8601(new Date());
    const direct= true;
    const etat= "En cours";
    // const mailStaff="staff@gmail.com"
      const payload = {
      numMatricule,
      lieuLivraison,
      dateLivraisonClient: formatDateToISO8601(dateLivraisonClient),
      details,
      dateCommande,
      direct,
      etat,
      // mailStaff
    };
    if (!isDateValid) {
      return;
    }   
     try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:8080/achat/add", payload);
      console.log("dataaaa", response)
       const refAchat= response.data?.ref;
      setMessage("success", "Achat validé avec succès !");

      setCartItems([]); 
      closeCartModal();
      navigate("/checkout/"+refAchat);
    } catch (error) {
      console.error("Erreur lors de la validation de l'achat :", error);
      setMessage("error", "Une erreur est survenue. Veuillez réessayer");

    } finally {
      setIsLoading(false);
    }
  };

  const navigations =
    isAuthenticated && ["STAFF_ADMIN", "ADMIN"].includes(user?.role)
      ? [{ name: "Partie client", href: "/" }]
      : [
          { name: "Accueil", href: "/" },
          { name: "Discussion", href: "/discussion" },
          { name: "Achats", href: "/achats"  },
          { name: "Suivi des achats", href: "/suivi-achats" },
        ];

  const location = useLocation();

  return (
    <header
      className="relative bg-[url('./src/assets/background.jpeg')] h-[350px] bg-no-repeat min-w-full bg-cover bg-center text-center bg-fixed"
    >
      <div className="absolute inset-0 bg-black h-full bg-opacity-50">
        
        <nav className="border border-myYellow inline-flex p-2 rounded-full mt-4 z-10 sticky top-4 backdrop-blur-lg">
          <ul className="flex gap-6">
            {navigations.map((navigation, index) => (
              <li
                key={index}
                className={`${
                  location.pathname === navigation.href ? "bg-myYellowLin" : ""
                } text-myWhite px-2 py-1 rounded-full font-bold text-xl`}
              >
                <Link to={navigation.href}>{navigation.name}</Link>
              </li>
            ))}
          </ul>
          {/* Icône Panier */}
          {!["STAFF_ADMIN", "ADMIN"].includes(user?.role) ?
             <div className="flex ms-10 items-center gap-4">
            <button onClick={openCartModal} className="relative">
              <FaShoppingCart className="ml-4 text-myWhite text-2xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-center text-sm">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
          : (
            <span
            className={`text-myWhite px-2 py-1 rounded-full font-bold text-xl`}
          >
            <Link to="/admin">Partie admin</Link>
          </span>
          )}
          {/* Boutons utilisateur */}
          <div className="ml-10 flex items-center gap-4">
            {!isAuthenticated ? (
              <Link to="/connexion">
                <button className="bg-myYellow text-white px-4 py-2 rounded-full font-bold">
                  Connexion
                </button>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8 rounded-full" />
                <span className="text-myWhite font-bold">{user?.nomClient}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-full font-bold"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>

        </nav>

        {/* Titre principal */}
        <h1 className="text-myWhite absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-bold">
          TSENA-TSIKA
        </h1>

        {/* Champ de recherche */}
        {/* <div
          className={`inline-flex absolute bottom-4 group ${
            location.pathname === "/achats" ? "hidden" : ""
          }`}
        >
          <input
            type="text"
            placeholder="Recherche..."
            className="w-[350px] group-hover:w-[400px] transition-all duration-500 px-2 py-1 rounded-full text-xl border border-myMarron outline-none indent-2 text-myMarron"
          />
          <CiSearch className="text-myMarron text-xl font-bold absolute right-4 top-1/2 -translate-y-1/2" />
        </div> */}
      </div>

      {(location.pathname === "/achats" || location.pathname === "/achat-procedural")&& <SubHeader />}

      {/* Modale Panier */}
      <Modal
          isOpen={isCartModalOpen}
          onClose={closeCartModal}
          onAction={handleCheckout}
          labelAction={cartItems.length > 0 ? "Valider l'achat" : undefined} // Bouton désactivé si panier vide
        >
          <h2 className="text-2xl font-bold mb-4">Votre panier</h2>
          {cartItems.length > 0 ? (
            <>
            <ul>
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center py-2 border-b"
                >
                  {/* Affichage de l'image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <span className="flex-1 ml-4">{item.title}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <span>{(item.quantity * item.price).toFixed(2)} AR</span>
                  {/* Icône de suppression */}
                  <button
                    onClick={() => removeItemFromCart(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>

              <div className="mt-4 flex justify-between items-center">
                <h3 className="text-xl font-bold">
                  Total : {calculateTotal().toFixed(2)} AR
                </h3>
              </div>
              <div className="mt-4">
              <input
                type="text"
                name="lieuLivraison"
                value={lieuLivraison}
                onChange={(e) => setLieuLivraison(e.target.value)}
                placeholder="Lieu Livraison"
                className="mb-2 border p-2 rounded w-full"
              />
              <input
                type="datetime-local"
                name="dateLivraisonClient"
                value={dateLivraisonClient}
                onChange={handleDateChange} 
                className="mb-2 border p-2 rounded w-full"
              />
                {!isDateValid && (
                  <p className="text-red-500 text-sm">
                    La date de livraison doit être au moins 48h après votre commande. Nous vous contacterons pour confirmer un jour disponible avant cette date.
                  </p>
                )}

            </div>
            <div className="mt-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">Total : {calculateTotal().toFixed(2)} AR</h3>
              {/* <button
                onClick={handleCheckout}
                className={`px-4 py-2 rounded bg-blue-500 text-white font-bold ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Chargement..." : "Valider l'achat"}
              </button> */}
            </div>
            </>
          ) : (
            <p>Votre panier est vide.</p>
          )}
        </Modal>

    </header>
  );
}
