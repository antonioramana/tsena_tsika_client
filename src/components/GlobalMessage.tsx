import React from "react";
import { useMessage } from "../contexts/MessageContext";

const GlobalMessage: React.FC = () => {
  const { message, type, clearMessage } = useMessage();

  if (!message) return null; // Pas de message à afficher

  const getStyle = () => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-black";
      default:
        return "";
    }
  };

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-10 py-4 rounded shadow-lg z-50 ${getStyle()}`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={clearMessage} className="ml-4 text-white font-bold">
          ×
        </button>
      </div>
    </div>
  );
};

export default GlobalMessage;
