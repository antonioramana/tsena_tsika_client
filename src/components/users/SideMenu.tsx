import axios from "axios";
import { useState, useEffect } from "react";
import { FaListAlt } from "react-icons/fa";

export default function SideMenu({ onArticleSelect }) {
  const [articles, setArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState("all");

  useEffect(() => {
    // Fetch articles
    axios
      .get("http://localhost:8080/article/showall")
      .then((response) => setArticles(response.data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  const handleArticleClick = (articleId) => {
    setActiveArticle(articleId); // Set the active article
    onArticleSelect(articleId); // Notify parent component
  };

  return (
    <div className="bg-white fixed z-20 top-24 left-6 w-72 border rounded-lg shadow-lg max-h-[800px] overflow-y-auto">
      <div className="sticky top-0 bg-myMarron py-4 rounded-t-lg">
        <h2 className="text-white text-2xl font-bold text-center">Articles</h2>
      </div>
      <ul className="flex flex-col gap-4 p-6">
        {/* "Tous" option */}
        <li
          className={`flex items-center gap-4 px-4 py-3 cursor-pointer rounded-lg transition-all duration-200 ease-in-out ${
            activeArticle === "all" ? "bg-gray-300 text-gray-900" : "hover:bg-gray-200"
          }`}
          onClick={() => handleArticleClick("all")}
        >
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-200">
            <FaListAlt className="text-2xl text-gray-600" />
          </div>
          <span className="font-medium text-lg">Tous</span>
        </li>

        {/* Articles */}
        {articles.map((article) => (
          <li
            key={article.idArticle}
            className={`flex items-center gap-4 px-4 py-3 cursor-pointer rounded-lg transition-all duration-200 ease-in-out ${
              activeArticle === article.idArticle ? "bg-gray-300 text-gray-900" : "hover:bg-gray-200"
            }`}
            onClick={() => handleArticleClick(article.idArticle)}
          >
            <img
              src={article.imageUrl}
              alt={article.libelle}
              className="h-12 w-12 object-cover rounded-full border-2 border-gray-300"
            />
            <span className="font-medium text-lg">{article.libelle}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
