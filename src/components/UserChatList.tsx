import { FiMoreVertical } from "react-icons/fi";

const UserChatList = ({
  avatarUrl = "",
  userName = "Nom d'utilisateur",
  description = "Ceci est une description exemple.",
  time = "10:45 AM",
}) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
  
      <div className="flex items-center space-x-4">
       
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={userName}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-400 text-sm">A</span> 
          </div>
        )}


        <div className="leading-tight">
          <span className="block font-semibold text-gray-900 text-sm">{userName}</span>
          <p className="text-gray-500 text-xs">
            {truncateText(description, 50)}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-gray-400 text-xs">{time}</span>
        <FiMoreVertical className="text-gray-500 cursor-pointer" size={18} />
      </div>
    </div>
  );
};

export default UserChatList;
