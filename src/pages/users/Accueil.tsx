// import { Card, SideMenu, Comment, Temoignage } from "../../components";
// import {
//   stylo,
//   blocNotes,
//   chaise,
//   clavier,
//   sac,
//   consult,
//   pdp,
// } from "../../assets";
// import { IoMail } from "react-icons/io5";

// export default function Accueil() {
//   const produits = [
//     {
//       title: "Stylo",
//       image: stylo,
//       price: 2000,
//     },
//     {
//       title: "Sac à dos",
//       image: sac,
//       price: 2000,
//     },
//     {
//       title: "Clavier",
//       image: clavier,
//       price: 2000,
//     },
//     {
//       title: "Chaise",
//       image: chaise,
//       price: 2000,
//     },
//     {
//       title: "Bloc notes",
//       image: blocNotes,
//       price: 2000,
//     },
//   ];
//   return (
//     <div>
//       <SideMenu />
//       <div className="ml-72 py-20">
//         <h1 className="font-bold text-6xl text-center">
//           Merci de votre visite, voici les <br />
//           <span className="text-myYellow"> échantillons de nos produits</span>
//         </h1>
//       </div>
//       <div className="px-24 py-10 flex gap-7">
//         {produits.map((produit, index) => (
//           <Card
//             key={index}
//             title={produit.title}
//             image={produit.image}
//             price={produit.price}
//           />
//         ))}
//       </div>
    //   <div className="flex flex-col items-center justify-center">
    //     <h2 className="font-bold text-6xl text-myYellow">Commentaires</h2>
    //     <Comment />
    //     <Comment />
    //   </div>
      // <div className="flex justify-between items-center px-64 mb-10">
      //   <img src={consult} />
      //   <div>
      //     <h2 className="text-6xl text-myYellow font-bold">Nos Produits</h2>
      //     <p className="my-4 text-xl">
      //       Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam
      //       debitis ullam adipisci! Ex consectetur similique nulla incidunt
      //       consequuntur eum quibusdam excepturi laborum, voluptate adipisci
      //       doloribus nam iste laboriosam odio officiis.
      //     </p>
      //     <button
      //       className="bg-myYellow text-myWhite py-4 px-8 text-xl rounded-xl 
      //      transition-all duration-300 hover:bg-myYellowLin"
      //     >
      //       Consultez-nous
      //     </button>
      //   </div>
      // </div>
      // <div className="flex flex-col items-center justify-center mb-10">
      //   <h2 className="font-bold text-6xl text-myYellow">
      //     Ils parlent de nous
      //   </h2>
      //   <p className="text-2xl">
      //     Ne contente pas de nos paroles, lis ce qu'ils disent de nous
      //   </p>
      //   <div className="flex gap-7 my-4">
      //     <Temoignage pdp={pdp} nom="Eloi Jospin" />
      //     <Temoignage pdp={pdp} nom="Eloi Jospin" />
      //     <Temoignage pdp={pdp} nom="Eloi Jospin" />
      //   </div>
      // </div>
      // <div className="flex flex-col items-center text-center mx-72 mb-10">
      //   <h2 className="font-bold text-6xl text-myYellow">Ne manque rien</h2>
      //   <p className="text-xl">
      //     Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
      //     officia eius quas obcaecati dicta iusto commodi. Soluta, sequi
      //     deleniti inventore.
      //   </p>
      //   <div className="flex gap-8 justify-center items-center">
      //     <div className="relative">
      //       <IoMail className="text-myYellow text-4xl absolute left-2 top-1/2 -translate-y-1/2" />
      //       <input
      //         type="text"
      //         placeholder="Votre adresse email"
      //         className="bg-myGray indent-10 text-xl p-2 rounded-lg w-[400px] outline-none border border-myYellow"
      //       />
      //     </div>
      //     <button className="bg-myYellow text-myWhite px-8 py-2 text-xl rounded-lg ">
      //       Envoyer
      //     </button>
      //   </div>
      // </div>
      // <div className="bg-myYellowLin h-48 mb-10 py-10 px-32">
      //   <h2 className="text-myWhite text-center text-6xl">
      //     Aidez nous à rendre Tsena Tsika encore meilleur en laissant ton avis
      //   </h2>
      // </div>
      // <div className="h-48 mb-10 py-10 px-32">
      //   <h2 className="text-center text-6xl font-semibold">
      //     Plus de 20 000 clients sont achetez nos produits
      //   </h2>
      // </div>
    // </div>
//   );
// }
import { useState, useEffect } from "react";
import axios from "axios";
import { SideMenu, Card, Temoignage } from "../../components";
import { Link } from "react-router-dom";
import { consult, pdp } from "../../assets";
import { IoMail } from "react-icons/io5";

export default function Accueil() {
  const [produits, setProduits] = useState([]);
  const [filteredProduits, setFilteredProduits] = useState([]);

  useEffect(() => {
    // Fetch all products on load
    axios
      .get("http://localhost:8080/produit/showall")
      .then((response) => {
        setProduits(response.data);
        setFilteredProduits(response.data.slice(0, 8)); // Limiter à 5 produits
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleArticleSelect = (articleId) => {
    if (articleId) {
      if (articleId === "all") {
        // Show all products when "all" is selected
        setFilteredProduits(produits);
      } else {
        const filtered = produits.filter(
          (produit) => produit.idArticle === articleId
        );
        setFilteredProduits(filtered);
      }
    } else {
      setFilteredProduits(produits.slice(0, 5)); // Afficher 5 produits si aucun article n'est sélectionné
    }
  };


  return (
    <div className="flex">
      <SideMenu onArticleSelect={handleArticleSelect} />
      <div className="flex-1 ml-72 py-20">
        <h1 className="font-bold text-4xl text-center mb-10">
          Merci de votre visite, voici nos{" "}
          <span className="text-yellow-500">produits</span>
        </h1>
        {filteredProduits.length > 0 ? (
          <div className="px-8 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProduits.map((produit) => (
              <Card
                key={produit.idProduit}
                id={produit.idProduit}
                title={produit.nomProduit}
                image={produit.imageUrl}
                price={produit.prix}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 text-lg">
            Aucun produit trouvé pour cet article.
          </div>
        )}
        {/* Voir plus button */}
        <div className="text-center mt-6">
          <Link
            to={"/achats"}
           className="text-myWhite bg-myYellowLin px-12 py-2 rounded-full"
          >
            Voir Plus
          </Link>
        </div>
        <div className="flex justify-between items-center px-64 mb-10">
        <img src={consult} />
        <div>
          <h2 className="text-6xl text-myYellow font-bold">Nos Produits</h2>
          <p className="my-4 text-xl">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam
            debitis ullam adipisci! Ex consectetur similique nulla incidunt
            consequuntur eum quibusdam excepturi laborum, voluptate adipisci
            doloribus nam iste laboriosam odio officiis.
          </p>
          <button
            className="bg-myYellow text-myWhite py-4 px-8 text-xl rounded-xl 
           transition-all duration-300 hover:bg-myYellowLin"
          >
            Consultez-nous
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mb-10">
        <h2 className="font-bold text-6xl text-myYellow">
          Ils parlent de nous
        </h2>
        <p className="text-2xl">
          Ne contente pas de nos paroles, lis ce qu'ils disent de nous
        </p>
        <div className="flex gap-7 my-4">
          <Temoignage pdp={pdp} nom="Eloi Jospin" />
          <Temoignage pdp={pdp} nom="Eloi Jospin" />
          <Temoignage pdp={pdp} nom="Eloi Jospin" />
        </div>
      </div>
      <div className="flex flex-col items-center text-center mx-72 mb-10">
        <h2 className="font-bold text-6xl text-myYellow">Ne manque rien</h2>
        <p className="text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          officia eius quas obcaecati dicta iusto commodi. Soluta, sequi
          deleniti inventore.
        </p>
        <div className="flex gap-8 justify-center items-center">
          <div className="relative">
            <IoMail className="text-myYellow text-4xl absolute left-2 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Votre adresse email"
              className="bg-myGray indent-10 text-xl p-2 rounded-lg w-[400px] outline-none border border-myYellow"
            />
          </div>
          <button className="bg-myYellow text-myWhite px-8 py-2 text-xl rounded-lg ">
            Envoyer
          </button>
        </div>
      </div>
      <div className="bg-myYellowLin h-48 mb-10 py-10 px-32">
        <h2 className="text-myWhite text-center text-6xl">
          Aidez nous à rendre Tsena Tsika encore meilleur en laissant ton avis
        </h2>
      </div>
      <div className="h-48 mb-10 py-10 px-32">
        <h2 className="text-center text-6xl font-semibold">
          Plus de 20 000 clients sont achetez nos produits
        </h2>
      </div>        
      </div>
    </div>
  );
}
