import { FiUpload } from 'react-icons/fi';

const ArticleForm = ({ formData, handleChange, modalAction, imagePreview }: any) => (
  <>
    <div className="flex items-center justify-center py-4 bg-gray-100">
      <h1 className="text-myMarron text-2xl font-bold tracking-wide">{modalAction === "create" ? "Ajouter" : "Mettre à jour"} un article</h1>
    </div>
    <input
      name="libelle"
      type="text"
      placeholder="Libellé"
      value={formData.libelle || ""}
      onChange={handleChange}
      className="w-full border p-2 rounded"
    />
    <input
      name="codeArticle"
      type="text"
      placeholder="Code Article"
      value={formData.codeArticle || ""}
      onChange={handleChange}
      className="w-full border p-2 rounded"
    />
    <div className="w-full border border-gray-300 p-4 rounded relative cursor-pointer hover:border-gray-400 transition">
      <input
        id="image-upload"
        name="image"
        type="file"
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex text-myMarron items-center justify-center space-x-2">
        <FiUpload className="h-6 w-6" />
        <span className="font-medium">{(modalAction === "create" && !imagePreview) ? "Ajouter une image" : "Changer l'image"}</span>
        {modalAction !== "create" && !imagePreview &&
          <img src={formData.imageUrl} alt="photo actuel" className="w-full h-32 object-contain mt-4 rounded" />
        }
      </div>
    </div>
    {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-32 object-contain mt-4 rounded" />}
  </>
);

export default ArticleForm;
