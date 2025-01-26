import React from "react";

interface ClientAdFormProps {
  error: null | string;
  clientData: { 
    nomClient: string;
    mailClient: string;
    adresseClient: string;
    domaineActiviteClient: string;
    mdpClient: string;
    confirmMdpClient: string;
    contactClient: string
  };
  errors: { 
    nomClient?: string;
    contactClient?: string;
    mailClient?: string;
    adresseClient?: string;
    domaineActiviteClient?: string;
    mdpClient?: string;
    confirmMdpClient?: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ClientAdForm: React.FC<ClientAdFormProps> = ({ clientData, errors, error, onChange }) => {
  return (
    <div className="space-y-4 text-xs">
      <h2 className="text-lg font-semibold text-gray-800">Ajouter un Nouveau Client</h2>
        {error &&
         <div className="text-lg font-semibold text-red-600">{error}</div>
        }
      <div className="flex space-x-4">
        <div className="flex flex-col w-1/2">
          <label className="text-gray-600">Nom</label>
          <input
            type="text"
            name="nomClient"
            value={clientData.nomClient}
            onChange={onChange}
            className={`border ${errors.nomClient ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            placeholder="Entrez le nom"
          />
          {errors.nomClient && <span className="text-red-500 text-sm">{errors.nomClient}</span>}
        </div>

        <div className="flex flex-col w-1/2">
          <label className="text-gray-600">Email</label>
          <input
            type="email"
            name="mailClient"
            value={clientData.mailClient}
            onChange={onChange}
            className={`border ${errors.mailClient ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            placeholder="Entrez l'email"
          />
          {errors.mailClient && <span className="text-red-500 text-sm">{errors.mailClient}</span>}
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="flex flex-col w-1/2">
        <label className="text-gray-600">Contact</label>
          <input
            type="text"
            name="contactClient"
            value={clientData.contactClient}
            onChange={onChange}
            className={`border ${errors.contactClient ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            placeholder="Entrez le contact du client"
          />
          {errors.contactClient && <span className="text-red-500 text-sm">{errors.contactClient}</span>}
        </div>

        <div className="flex flex-col w-1/2">
          <label className="text-gray-600">Domaine d'Activité</label>
          <input
            type="text"
            name="domaineActiviteClient"
            value={clientData.domaineActiviteClient}
            onChange={onChange}
            className={`border ${errors.domaineActiviteClient ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            placeholder="Entrez le domaine d'activité"
          />
          {errors.domaineActiviteClient && <span className="text-red-500 text-sm">{errors.domaineActiviteClient}</span>}
        </div>
      </div>
      <div className="flex flex-col w-1/2">
      <label className="text-gray-600">Adresse</label>
          <input
            type="text"
            name="adresseClient"
            value={clientData.adresseClient}
            onChange={onChange}
            className={`border w-full${errors.adresseClient ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            placeholder="Entrez l'adresse"
          />
          {errors.adresseClient && <span className="text-red-500 text-sm">{errors.adresseClient}</span>}
        </div>
      {/* Si nous ne sommes pas en mode édition, afficher les champs mot de passe */}
        <div className="flex space-x-4">
          <div className="flex flex-col w-1/2">
            <label className="text-gray-600">Mot de Passe Client</label>
            <input
              type="password"
              name="mdpClient"
              value={clientData.mdpClient}
              onChange={onChange}
              className={`border ${errors.mdpClient ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
              placeholder="Entrez le mot de passe"
            />
            {errors.mdpClient && <span className="text-red-500 text-sm">{errors.mdpClient}</span>}
          </div>

          <div className="flex flex-col w-1/2">
            <label className="text-gray-600">Confirmer le mot de passe</label>
            <input
              type="password"
              name="confirmMdpClient"
              value={clientData.confirmMdpClient}
              onChange={onChange}
              className={`border ${errors.confirmMdpClient ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
              placeholder="Confirmez le mot de passe"
            />
            {errors.confirmMdpClient && <span className="text-red-500 text-sm">{errors.confirmMdpClient}</span>}
          </div>
        </div>
    
    </div>
  );
};
export default ClientAdForm;
