import { FiUser } from "react-icons/fi";

const Avatar = ({ Icon = FiUser, size = "w-16 h-16", className = "", isConnected = false }) => {
  return (
    <div className={`relative flex items-center justify-center rounded-full bg-gray-200 border-2 border-gray-300 ${size} ${className}`}>
      <Icon className="text-gray-500" style={{ width: '50%', height: '50%' }} />
       {isConnected && (
        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
      )}
    </div>
  );
};

export default Avatar;
