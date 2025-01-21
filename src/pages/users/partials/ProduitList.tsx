import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "../../../components";

type ProduitListProps = {
  selectedArticleId: string;
};

export default function ProduitList({ selectedArticleId }: ProduitListProps) {
  const [produits, setProduits] = useState([]);
  const [filteredProduits, setFilteredProduits] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/produit/showall")
      .then((response) => {
        setProduits(response.data);
        setFilteredProduits(response.data); // Par défaut, afficher tous les produits
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des produits :", error)
      );
  }, []);

  useEffect(() => {
    // Filtrer les produits en fonction de l'article sélectionné
    if (selectedArticleId === "all") {
      setFilteredProduits(produits); // Afficher tous les produits
    } else {
      const filtered = produits.filter(
        (produit) => produit.idArticle === selectedArticleId
      );
      setFilteredProduits(filtered);
    }
  }, [selectedArticleId, produits]);

  return (
    <div className="px-8 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProduits.length > 0 ? (
        filteredProduits.map((produit) => (
          <Card
            key={produit.idProduit}
            id={produit.idProduit}
            title={produit.nomProduit}
            image={produit.imageUrl}
            price={produit.prix}
          />
        ))
      ) : (
        <div className="text-center text-gray-600 text-lg">
          Aucun produit trouvé pour cet article.
        </div>
      )}
    </div>
  );
}
