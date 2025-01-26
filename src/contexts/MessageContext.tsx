import React, { createContext, useContext, useState } from "react";

type MessageType = "success" | "error" | "warning";

interface MessageContextType {
  message: string | null;
  type: MessageType | null;
  setMessage: (type: MessageType, text: string) => void;
  clearMessage: () => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessageState] = useState<string | null>(null);
  const [type, setType] = useState<MessageType | null>(null);

  const setMessage = (type: MessageType, text: string) => {
    setType(type);
    setMessageState(text);

    // Auto-clear message after 5 seconds
    setTimeout(() => {
      clearMessage();
    }, 5000);
  };

  const clearMessage = () => {
    setMessageState(null);
    setType(null);
  };

  return (
    <MessageContext.Provider value={{ message, type, setMessage, clearMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};
