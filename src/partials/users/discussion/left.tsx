import { useState, useEffect } from "react";
import { FiMoreVertical, FiSearch } from "react-icons/fi";
import Avatar from "../../../components/avatar";
import UserChatList from "../../../components/UserChatList";

export default function Left({
  userName = "Nom de l'utilisateur",
  avatarUrl,
  userChatSelected,
  setUserChatSelected
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // Exemple de données d'utilisateurs pour la liste
  const users = [
    { avatarUrl: "", userName: "Utilisateur 1", description: "Description de l'utilisateur 1", time: "10:00 AM" },
    { avatarUrl: "", userName: "Utilisateur 2", description: "Description de l'utilisateur 2", time: "11:30 AM" },
    { avatarUrl: "", userName: "Utilisateur 3", description: "Description de l'utilisateur 3", time: "12:15 PM" },
    { avatarUrl: "", userName: "Utilisateur 4", description: "Description de l'utilisateur 4", time: "1:45 PM" },
    { avatarUrl: "", userName: "Utilisateur 5", description: "Description de l'utilisateur 5", time: "2:30 PM" }
  ];

  // Effet pour sélectionner le premier utilisateur si c'est "Utilisateur 1"
  useEffect(() => {
    if (users[0].userName === "Utilisateur 1") {
      setUserChatSelected(users[0]);
      console.log("Premier utilisateur sélectionné :", users[0]);
    }
  }, [setUserChatSelected]);

  // Fonction pour filtrer les utilisateurs par nom
  const filteredUsers = users.filter(user =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonction pour gérer la sélection d'un utilisateur
  const handleUserSelect = (user) => {
    setUserChatSelected(user);
    console.log("Utilisateur sélectionné :", user);
  };

  return (
    <>
      {/* En-tête */}
      <div className="bg-white border-b-4 border-gray-300 rounded-t-md p-4 h-15 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Discussion</h1>
        <FiMoreVertical className="text-gray-700 cursor-pointer" />
      </div>

      <div className="h-auto p-4 flex flex-col items-center justify-center">
        {/* Avatar avec URL ou placeholder */}
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

        {/* Champ de recherche */}
        <div className="relative mt-2 w-full">
          <input
            type="text"
            className="w-full px-3 py-2 rounded-full bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none"
            placeholder="Rechercher"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Section message */}
        <div className="flex justify-between items-center w-full mt-4 mb-3">
          <span className="text-gray-400">Message</span>
          <div className="flex items-center space-x-2">
            <button className="text-myMarron bg-myYellow text-2xl font-bold px-3 py-1 rounded-full">
              +
            </button>
          </div>
        </div>

        {/* Liste des utilisateurs avec overflow-y */}
        <div className="w-full mt-4 h-80 overflow-y-auto">
          {filteredUsers.map((user, index) => (
            <div
              key={index}
              onClick={() => handleUserSelect(user)}
              className={`cursor-pointer p-2 hover:bg-gray-100 ${
                userChatSelected?.userName === user.userName ? "bg-gray-200" : ""
              }`}
            >
              <UserChatList
                avatarUrl={user.avatarUrl}
                userName={user.userName}
                description={user.description}
                time={user.time}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
