import React from "react";

interface FournisseurAdFormProps {
  error: null | string;
  fournisseurData: { 
    nom: string;
    mail: string;
    adresse: string;
    domaineActiviteFournisseur: string;
    mdpFournisseur: string;
    confirmMdpFournisseur: string;
  };
  errors: { 
    nom?: string;
    mail?: string;
    adresse?: string;
    domaineActiviteFournisseur?: string;
    mdpFournisseur?: string;
    confirmMdpFournisseur?: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FournisseurAdForm: React.FC<FournisseurAdFormProps> = ({ fournisseurData, errors, error,onChange }) => {
  return (
    <div className="space-y-4 text-xs">
      <h2 className="text-lg font-semibold text-gray-800">Ajouter un Nouveau Fournisseur</h2>
        {error &&
         <div className="text-lg font-semibold text-red-600">{error}</div>
        }
      <div className="flex space-x-4">
        <div className="flex flex-col w-1/2">
          <label className="text-gray-600">Nom</label>
          <input
            type="text"
            name="nom"
            value={fournisseurData.nom}
            onChange={onChange}
            className={`border ${errors.nom ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            placeholder="Entrez le nom"
          />
          {errors.nom && <span className="text-red-500 text-sm">{errors.nom}</span>}
        </div>

        <div className="flex flex-col w-1/2">
          <label className="text-gray-600">Email</label>
          <input
            type="email"
            name="mail"
            value={fournisseurData.mail}
            onChange={onChange}
            className={`border ${errors.mail ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            placeholder="Entrez l'email"
          />
          {errors.mail && <span className="text-red-500 text-sm">{errors.mail}</span>}
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="flex flex-col w-1/2">
          <label className="text-gray-600">Adresse</label>
          <input
            type="text"
            name="adresse"
            value={fournisseurData.adresse}
            onChange={onChange}
            className={`border ${errors.adresse ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            placeholder="Entrez l'adresse"
          />
          {errors.adresse && <span className="text-red-500 text-sm">{errors.adresse}</span>}
        </div>

        <div className="flex flex-col w-1/2">
          <label className="text-gray-600">Domaine d'Activité</label>
          <input
            type="text"
            name="domaineActiviteFournisseur"
            value={fournisseurData.domaineActiviteFournisseur}
            onChange={onChange}
            className={`border ${errors.domaineActiviteFournisseur ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            placeholder="Entrez le domaine d'activité"
          />
          {errors.domaineActiviteFournisseur && <span className="text-red-500 text-sm">{errors.domaineActiviteFournisseur}</span>}
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="flex flex-col w-1/2">
          <label className="text-gray-600">Mot de Passe Fournisseur</label>
          <input
            type="password"
            name="mdpFournisseur"
            value={fournisseurData.mdpFournisseur}
            onChange={onChange}
            className={`border ${errors.mdpFournisseur ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            placeholder="Entrez le mot de passe"
          />
          {errors.mdpFournisseur && <span className="text-red-500 text-sm">{errors.mdpFournisseur}</span>}
        </div>

        <div className="flex flex-col w-1/2">
          <label className="text-gray-600">Confirmer le mot de passe</label>
          <input
            type="password"
            name="confirmMdpFournisseur"
            value={fournisseurData.confirmMdpFournisseur}
            onChange={onChange}
            className={`border ${errors.confirmMdpFournisseur ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            placeholder="Confirmez le mot de passe"
          />
          {errors.confirmMdpFournisseur && <span className="text-red-500 text-sm">{errors.confirmMdpFournisseur}</span>}
        </div>
      </div>
    </div>
  );
};

export default FournisseurAdForm;
