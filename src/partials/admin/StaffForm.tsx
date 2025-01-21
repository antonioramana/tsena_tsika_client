import React from "react";

interface StaffFormProps {
  error: null | string;
  staffData: { nomStaff: string; mailStaff: string; role: string; mdpStaff: string; confirmMdpStaff: string };
  errors: { nomStaff?: string; mailStaff?: string; role?: string; mdpStaff?: string; confirmMdpStaff?: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StaffAdForm: React.FC<StaffFormProps> = ({ staffData, errors, error,onChange }) => {
  return (
    <div className="space-y-4 text-xs">
      <h2 className="text-lg font-semibold text-gray-800">Ajouter un Nouveau Staff</h2>
      {error &&
         <div className="text-lg font-semibold text-red-600">{error}</div>
        }
      <div className="flex flex-col space-y-2">
        <label className="text-gray-600">Nom</label>
        <input
          type="text"
          name="nomStaff"
          value={staffData.nomStaff}
          onChange={onChange}
          className={`border ${errors.nomStaff ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
          placeholder="Entrez le nom"
        />
        {errors.nomStaff && <span className="text-red-500 text-sm">{errors.nomStaff}</span>}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-gray-600">Email</label>
        <input
          type="email"
          name="mailStaff"
          value={staffData.mailStaff}
          onChange={onChange}
          className={`border ${errors.mailStaff ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
          placeholder="Entrez l'email"
        />
        {errors.mailStaff && <span className="text-red-500 text-sm">{errors.mailStaff}</span>}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-gray-600">Rôle</label>
        <select
          name="role"
          value={staffData.role}
          onChange={onChange}
          className={`border ${
            errors.role ? 'border-red-500' : 'border-gray-300'
          } rounded-md p-2`}
        >
          <option value="" disabled>
            Sélectionnez un rôle
          </option>
          <option value="STAFF_ADMIN">STAFF_ADMIN</option>
          <option value="STAFF">STAFF</option>
        </select>
        {errors.role && <span className="text-red-500 text-sm">{errors.role}</span>}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-gray-600">Mot de Passe</label>
        <input
          type="password"
          name="mdpStaff"
          value={staffData.mdpStaff}
          onChange={onChange}
          className={`border ${errors.mdpStaff ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
          placeholder="Entrez le mot de passe"
        />
        {errors.mdpStaff && <span className="text-red-500 text-sm">{errors.mdpStaff}</span>}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-gray-600">Confirmer le Mot de Passe</label>
        <input
          type="password"
          name="confirmMdpStaff"
          value={staffData.confirmMdpStaff}
          onChange={onChange}
          className={`border ${errors.confirmMdpStaff ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
          placeholder="Confirmez le mot de passe"
        />
        {errors.confirmMdpStaff && <span className="text-red-500 text-sm">{errors.confirmMdpStaff}</span>}
      </div>
    </div>
  );
};

export default StaffAdForm;
