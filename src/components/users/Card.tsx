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
    <div className="bg-myWhite w-64 h-[400px] rounded-b-lg overflow-hidden shadow-lg">
      <h2 className="font-bold text-2xl m-2">{title}</h2>
      <div className="relative">
        <img src={image} className="h-64 w-full object-contain" />
        <FaShoppingCart
          className="absolute right-4 top-4 text-xl text-myYellow cursor-pointer"
          onClick={handleAddToCart}
        />
      </div>
      <div className="border p-2 border-myGray">
        <div className="flex gap-4 text-lg">
          <Link
            to={`/commande/produit/${id}`}
            className="text-myWhite bg-myYellowLin px-2 py-1 rounded-full"
          >
            Acheter
          </Link>
          <Link to={`/commande/produit/${id}`}>Plus de détails</Link>
        </div>
        <h2 className="font-bold text-2xl m-2">
          <span className="text-myMarron">Ar</span> {price}
        </h2>
      </div>
    </div>
  );
}
