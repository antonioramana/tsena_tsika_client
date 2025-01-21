export default function ConfirmationModal({ title, description, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="mb-4">{description}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 hover:bg-myMarron text-white rounded-md bg-myYellow"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
