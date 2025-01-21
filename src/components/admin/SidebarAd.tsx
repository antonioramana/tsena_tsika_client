import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaUsers, FaComments, FaBox, FaShoppingCart, FaStore, FaTruck } from "react-icons/fa";

export default function SidebarAd() {
  const location = useLocation(); 

  const navigations = [
    { name: "Accueil", href: "/admin/accueil", icon: <FaHome /> },
    { name: "Client", href: "/admin/client", icon: <FaUser /> },
    { name: "Staff", href: "/admin/staff", icon: <FaUsers /> },
    { name: "Discussion", href: "/admin/discussion", icon: <FaComments /> },
    { name: "Marchandise", href: "/admin/marchandise", icon: <FaBox /> },
    { name: "Achat", href: "/admin/achat", icon: <FaShoppingCart /> },
    // { name: "Marché", href: "/admin/marche", icon: <FaStore /> },
    { name: "Fournisseur", href: "/admin/fournisseur", icon: <FaTruck /> },
  ];

  return (
    <div className="h-screen w-[250px] text-myWhite bg-myMarron rounded-r-[50px]">
      <ul className="flex flex-col">
        <Link to="/" className="">
          <li className="px-5 py-4 text-3xl font-bold mb-10">TSENA-TSIKA</li>
        </Link>
        {navigations.map((navigation, index) => (
          <li
            key={index}
            className={`px-8 py-4 flex items-center space-x-4 rounded-l-full text-xl transition-colors duration-500 ${
              location.pathname === navigation.href
                ? "bg-white text-myMarron font-semibold"
                : "hover:bg-myWhite hover:text-myMarron"
            }`}
          >
            <span className="bg-white text-myMarron p-2 rounded-full">{navigation.icon}</span> {/* Icon with white background */}
            <Link to={navigation.href} className="w-full">
              {navigation.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
