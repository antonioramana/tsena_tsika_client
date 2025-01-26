import { FaSearch } from "react-icons/fa";
import { useAuth } from "../../contexts/useAuth";
import Avatar from "../Avatar";
import { useNavigate } from "react-router-dom";

export default function HeaderAd() {
    const { user, logout } = useAuth();
    const navigate= useNavigate();
    const handleLogout = () => {
      logout();
      navigate("/");
    };
  return (
    <div className="h-20 shadow-md flex bg-white justify-between px-5 items-center">
      <div className="relative group">
        <input
          type="text"
          placeholder="Recherche..."
          className="py-2 outline-none border text-myMarron text-xl border-myMarron rounded-full indent-4 w-[250px] group-hover:w-[300px] transition-all duration-500"
        />
        <FaSearch className="text-myMarron absolute top-1/2 right-4 -translate-y-1/2" />
      </div>
      <div className="inline-flex items-center gap-4 shadow-md rounded-full pr-4">
        <Avatar className="w-8 h-8 rounded-full" />
        <h2 className="text-myMarron text-lg font-bold">{user?.nomStaff}</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-full font-bold"
          >
          Déconnexion
        </button>
         </div>
    </div>
  );
}
