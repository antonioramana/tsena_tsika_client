import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProduitList from "./partials/ProduitList";
import { FaBox } from "react-icons/fa6";

export default function Achats() {
  const [articles, setArticles] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState("all");
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/article/showall")
      .then((response) => setArticles(response.data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des articles :", error)
      );
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      // Ajustez la largeur du défilement pour 5 articles à la fois
      sliderRef.current.scrollBy({ left: -300 * 5, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      // Ajustez la largeur du défilement pour 5 articles à la fois
      sliderRef.current.scrollBy({ left: 300 * 5, behavior: "smooth" });
    }
  };

  const handleArticleSelect = (articleId: string) => {
    setSelectedArticleId(articleId); // Met à jour l'article sélectionné
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-myMarron text-center mb-6">Articles</h2>
      <div className="relative max-w-5xl mx-auto">
        {/* Bouton précédent */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-myMarron text-white p-3 rounded-full shadow-lg hover:bg-gray-600 z-10"
        >
          <FaChevronLeft />
        </button>

        {/* Conteneur des articles */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto px-6 scrollbar-hide"
          style={{
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth", // Pour un défilement fluide
          }}
        >
          {/* Bouton pour afficher tous les articles */}
          <div
            className="cursor-pointer bg-gray-100 p-4 rounded-lg shadow-md"
            onClick={() => handleArticleSelect("all")}
          >
            <div className="flex justify-center items-center">
              <FaBox className="text-3xl  h-40 text-myMarron" />  {/* Icône */}
            </div>
            <h3 className="text-center mt-2 text-lg">Tous les Articles</h3>
          </div>


          {articles.slice(0, 5).map((article) => ( // Limitez à 5 articles
            <div
              key={article.idArticle}
              className="cursor-pointer"
              onClick={() => handleArticleSelect(article.idArticle)}
            >
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={article.imageUrl}
                  alt={article.libelle}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <h3 className="text-center mt-2 text-lg">{article.libelle}</h3>
              </div>
            </div>
          ))}

        </div>

        {/* Bouton suivant */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-myMarron text-white p-3 rounded-full shadow-lg hover:bg-gray-600 z-10"
        >
          <FaChevronRight />
        </button>
      </div>
      <h2 className="text-2xl font-bold text-myMarron text-center my-3">Produits</h2>
      {/* Liste des produits filtrés */}
      <ProduitList selectedArticleId={selectedArticleId} />
    </div>
  );
}
