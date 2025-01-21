import { useState, useEffect, useRef } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { FaSmile, FaMicrophone, FaPaperPlane } from "react-icons/fa";

const exampleMessages = [
  {
    text: "Salut! Comment ça va?",
    date: "12:01 PM",
    isOwner: false,
    avatar: "https://via.placeholder.com/40",
  },
  {
    text: "Salut! Comment ça va?",
    date: "12:01 PM",
    isOwner: true,
    avatar: "https://via.placeholder.com/40",
  },
  {
    text: "Regarde ce produit incroyable!",
    date: "12:02 PM",
    isOwner: true,
    avatar: "https://via.placeholder.com/40",
    isImage: true,
    product: {
      imageUrl: "https://via.placeholder.com/150",
      title: "Produit Exemplar",
      price: "$99.99",
    },
  },
  {
    text: "Ça va bien, merci! Et toi?",
    date: "12:03 PM",
    isOwner: false,
    avatar: "https://via.placeholder.com/40",
  },
  {
    text: "As-tu vu le dernier projet?",
    date: "12:04 PM",
    isOwner: false,
    avatar: "https://via.placeholder.com/40",
  },
];

export default function Center({ userName = "Tsena - Tsika", productSend }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(exampleMessages);
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (productSend && Object.keys(productSend).length > 0) {
      sendMessage(true); 
    }
  }, [productSend]);

  const sendMessage = (isProductMessage = false) => {
    const newMsg = {
      text: isProductMessage ? "Produit envoyé!" : newMessage.trim(),
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwner: true,
      avatar: "https://via.placeholder.com/40",
      ...(isProductMessage && {
        isImage: true,
        product: productSend,
      }),
    };

    if (newMsg.text.trim() || isProductMessage) {
      setMessages((prevMessages) => [...prevMessages, newMsg]);
      setNewMessage(""); 
      // Reset the productSend
      if (isProductMessage) {
            // setProductSend(null);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen my-2">
      <div className="bg-gray-500 text-white rounded-t-3xl p-3 flex items-center justify-between">
       {/* Avatar et nom d'utilisateur */}
        <div className="flex items-center space-x-2">
          <img src="https://via.placeholder.com/40" alt="Avatar" className="w-10 h-10 rounded-full" />
          <span className="text-sm font-bold">{userName}</span>
        </div>

        {/* Date d'aujourd'hui */}
        <div className="px-2 py-1 rounded-full bg-white text-gray-400 border border-white text-xs">
          {new Date().toLocaleDateString()}
        </div>

        {/* Champ de recherche */}
        <div className="flex-grow mr-2 text-right">
          <input
            type="text"
            className="w-55 px-2 py-1 rounded-full bg-white text-gray-700 placeholder-gray-400 text-sm"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Menu à trois points */}
        <FiMoreVertical className="text-white cursor-pointer" size={20} />
      </div>

      {/* Zone des messages */}
      <div className="bg-gray-500 my-2 flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex flex-col ${message.isOwner ? "items-end" : "items-start"}`}>
            {/* Affichage de la date du message */}
            <span className="text-xs text-gray-500 mb-1">{message.date}</span>

            {/* Affichage du message ou du produit */}
            <div className={`flex items-center ${message.isOwner ? "justify-end" : "justify-start"} max-w-xs`}>
              {/* Avatar pour le message */}
              <img src={message.avatar} alt="Avatar" className={`w-10 h-10 rounded-full ${message.isOwner ? "ml-2" : "mr-2"}`} />
              <div className={`p-3 rounded-lg ${message.isOwner ? "bg-gray-300 text-black" : "bg-white text-black"} shadow`}>
                {message.isImage ? (
                  <div className="flex flex-col">
                    <img src={message.product.imageUrl} alt={message.product.title} className="w-40 h-40 object-cover rounded-md mb-2" />
                    <span className="font-bold">{message.product.title}</span>
                    <span className="text-sm text-gray-600">{message.product.price}</span>
                  </div>
                ) : (
                  message.text
                )}
              </div>
            </div>
          </div>
        ))}
        {/* Référence pour scroller automatiquement aux derniers messages */}
        <div ref={messageEndRef} />
      </div>

      {/* Champ de saisie des messages */}
      <div className="bg-white p-3 rounded-t-2xl shadow-lg flex items-center space-x-2">
        {/* Icône Emoji */}
        <FaSmile className="text-myMarron cursor-pointer" size={24} />

        {/* Champ d'entrée du message */}
        <input
          type="text"
          className="flex-grow px-4 py-2 rounded-full bg-gray-100 text-gray-700"
          placeholder="Écrire un message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        {/* Icône Microphone */}
        <FaMicrophone className="text-myMarron cursor-pointer" size={24} />

        {/* Icône Envoi */}
        <button 
          className="bg-myMarron text-white rounded-full p-2 flex items-center justify-center"
          onClick={() => sendMessage(false)} // Envoie un message texte
        >
          <FaPaperPlane size={20} />
        </button>
      </div>
    </div>
  );
}
