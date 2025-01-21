import React, { useState } from 'react';

const EditPurchase = ({ purchase, onSave }) => {
  const [formData, setFormData] = useState({
    dateLivraisonFournisseur: purchase?.dateLivraisonFournisseur || '',
    etat: purchase?.etat || 'En attente de traitement',
    devis: purchase?.devis || '',
    bcf: purchase?.bcf || '',
    statutPaiement: purchase?.statutPaiement || 'Non payé',
    validePaiement: purchase?.validePaiement || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Modifier l'achat</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date Livraison */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date de Livraison Fournisseur
          </label>
          <input
            type="date"
            name="dateLivraisonFournisseur"
            value={formData.dateLivraisonFournisseur}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* État */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            État
          </label>
          <select
            name="etat"
            value={formData.etat}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="En attente de traitement">En attente de traitement</option>
            <option value="En cours de traitement">En cours de traitement</option>
            <option value="En attente de livraison">En attente de livraison</option>
            <option value="En cours de livraison">En cours de livraison</option>
            <option value="Livré">Livré</option>
          </select>
        </div>

        {/* Devis */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Devis (peut être nul)
          </label>
          <input
            type="text"
            name="devis"
            value={formData.devis}
            onChange={handleChange}
            placeholder="Numéro du devis"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* BCF */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            BCF (peut être nul)
          </label>
          <input
            type="text"
            name="bcf"
            value={formData.bcf}
            onChange={handleChange}
            placeholder="Numéro du BCF"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Statut Paiement */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Statut de Paiement
          </label>
          <select
            name="statutPaiement"
            value={formData.statutPaiement}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Non payé">Non payé</option>
            <option value="Partiellement payé">Partiellement payé</option>
            <option value="Payé">Payé</option>
          </select>
        </div>

        {/* Validation Paiement */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="validePaiement"
            checked={formData.validePaiement}
            onChange={handleChange}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
          />
          <label className="ml-2 text-sm text-gray-700">Paiement validé</label>
        </div>

        {/* Boutons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-400"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
          >
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPurchase;
