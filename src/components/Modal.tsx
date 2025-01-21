import React, { ReactNode } from "react";
import { FiX } from "react-icons/fi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction?: () => void;
  labelAction?: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onAction, labelAction, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-11/12 md:w-1/3 rounded-lg shadow-lg relative p-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <FiX size={24} />
        </button>
        <div className="mt-4 mb-8">{children}</div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Fermer
          </button>
         {onAction && 
          <button
            onClick={onAction}
            className="bg-myMarron text-white px-4 py-2 rounded-md hover:bg-myMarron-dark transition"
          >
            {labelAction}
          </button>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
