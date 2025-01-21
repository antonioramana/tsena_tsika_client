import { useEffect, useState } from "react";
import ConfirmationModal from "../../../components/ConfirmationModal";
import Avatar from "../../../components/avatar";
import { FiSearch } from "react-icons/fi";

export default function Right({ productSend, setProductSend, userName = "Nom de l'utilisateur", avatarUrl }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [showModal, setShowModal] = useState(false);

  const products = [
    { id: 1, name: "Produit 1", imageUrl: "https://via.placeholder.com/150" },
    { id: 2, name: "Produit 2", imageUrl: "https://via.placeholder.com/150" },
    { id: 3, name: "Produit 3", imageUrl: "https://via.placeholder.com/150" },
    { id: 4, name: "Produit 4", imageUrl: "https://via.placeholder.com/150" },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true); 
  };

  const confirmProductSelection = () => {
    setProductSend(selectedProduct);
    setShowModal(false); 
  };

  useEffect(() => {
    console.log("Produit à envoyer:", productSend);
  }, [productSend]);

  return (
    <div className="flex flex-col h-full">
      {/* Titre Accueil */}
      <div className="bg-white border-b-4 border-gray-300 rounded-t-md p-4 h-15 flex items-center">
        <h1 className="text-2xl font-bold">Accueil</h1>
      </div>

      {/* Avatar et Nom de l'utilisateur */}
      <div className="p-4 flex flex-col items-center">
        {/* Avatar ou Image de l'utilisateur */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={userName}
            className="w-24 h-24 rounded-full object-cover mb-2"
          />
        ) : (
          <Avatar size="w-24 h-24" isConnected={true} />
        )}

        {/* Nom de l'utilisateur */}
        <span className="text-lg text-myMarron font-semibold mb-2">{userName}</span>
      </div>

      {/* Champ de recherche */}
      <div className="relative mt-2 w-full">
          <input
              type="text"
              className="w-full px-3 py-2 rounded-full bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none"
              placeholder="Rechercher un produit"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
      {/* Paragraphe d'instructions */}
      <div className="px-4 py-2 text-gray-500">
        <p>Cliquez sur une photo si vous voulez insérer un produit dans la discussion.</p>
      </div>

      {/* Liste des produits */}
      <div
  className="grid grid-cols-2 gap-4 p-4 overflow-y-auto h-80"
    >
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto rounded-md object-cover"
            />
            <span className="block text-center mt-2 font-semibold text-sm">
              {product.name}
            </span>
          </div>
        ))}
      </div>

      {/* Texte de recherche sous le champ */}
      {/* <div className="p-4 text-gray-500">
        <p>Recherche de produits: {searchTerm}</p>
      </div> */}

      {/* Affichage de l'image du produit sélectionné */}
      {/* {productSend && (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Produit sélectionné :</h3>
          <img
            src={productSend.imageUrl}
            alt={productSend.name}
            className="w-full h-auto rounded-md object-cover"
          />
        </div>
      )} */}

      {/* Modal de confirmation */}
      {showModal && (
        <ConfirmationModal
          title="Confirmer la sélection"
          description={`Voulez-vous vraiment sélectionner le produit "${selectedProduct.name}" ?`}
          onConfirm={confirmProductSelection}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
