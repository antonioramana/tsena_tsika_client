import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

type CardProps = {
  title: string;
  id: string;
  image: string;
  price: number;
};

export default function Card({ id, title, price, image }: CardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, title, price, image, quantity: 1 });
  };

  return (
    <div className="bg-myWhite w-72 h-[500px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Titre */}
      <h2 className="font-bold text-2xl text-center p-4 h-[80px] flex items-center justify-center">
        {title}
      </h2>

      {/* Image */}
      <div className="relative flex-1 flex items-center justify-center bg-gray-100">
        <img
          src={image}
          className="h-60 w-full object-contain"
          alt={title}
        />
        <FaShoppingCart
          className="absolute right-8 top-8 text-3xl text-myYellow cursor-pointer hover:scale-110 transition-transform duration-200"
          onClick={handleAddToCart}
        />
      </div>

      {/* Détails */}
      <div className="border-t p-4 border-myGray h-[140px] flex flex-col justify-between">
        {/* Actions */}
        <div className="flex gap-4 text-base justify-between items-center">
          <Link
            to={`/commande/produit/${id}`}
            className="text-myWhite bg-myYellowLin px-4 py-2 rounded-full text-center hover:bg-myYellow transition-colors duration-200"
          >
            Acheter
          </Link>
          <Link
            to={`/commande/produit/${id}`}
            className="hover:underline"
          >
            Plus de détails
          </Link>
        </div>
        {/* Prix */}
        <h2 className="font-bold text-2xl text-center mt-4 ">
          <span className="text-myMarron">Ar</span> {price.toLocaleString()}
        </h2>
      </div>
    </div>
  );
}
