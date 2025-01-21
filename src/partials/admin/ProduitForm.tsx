
const ProduitForm = ({ formData, handleChange, modalAction }) => (
  <>
    <div className="flex items-center justify-center py-4 bg-gray-100">
      <h1 className="text-myMarron text-2xl font-bold tracking-wide">{modalAction === "create" ? "Ajouter" : "Mettre à jour"} un produit</h1>
    </div>
    <input
      name="nomProduit"
      type="text"
      placeholder="Nom Produit"
      value={formData.nomProduit || ""}
      onChange={handleChange}
      className="w-full border p-2 rounded"
    />
    <input
      name="prix"
      type="text"
      placeholder="Prix"
      value={formData.prix || ""}
      onChange={handleChange}
      className="w-full border p-2 rounded"
    />
  </>
);

export default ProduitForm;
