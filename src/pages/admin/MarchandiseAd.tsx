import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { FiUpload } from "react-icons/fi";

const MarchandiseAd = () => {
  const [activeTab, setActiveTab] = useState("articles");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation
  const [modalAction, setModalAction] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null); // State for item to delete
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(""); 
  const [articles, setArticles] = useState([]);
  const [produits, setProduits] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [detailModalOpen, setDetailModalOpen] = useState(false); // Modal for viewing details
  const [selectedDetail, setSelectedDetail] = useState(null);

  useEffect(() => {
    fetchArticles();
    fetchProduits();
    fetchFournisseurs();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/article/showall");
      setArticles(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des articles", error);
    }
  };

  const fetchProduits = async () => {
    try {
      const response = await axios.get("http://localhost:8080/produit/showall");
      setProduits(response.data);
      console.log("produit ",produits)
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
    }
  };

  const fetchFournisseurs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/fournisseur/showall");
      setFournisseurs(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des fournisseurs", error);
    }
  };

  const handleCreate = () => {
    setModalAction("create");
    setFormData({});
    setImagePreview("");
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setModalAction("edit");
    setSelectedRow(row);
    setFormData(row);
    setImagePreview(row.imageUrl || "");
    setIsModalOpen(true);
  };

  const handleDelete = async (id, type) => {
    try {
      const url = `http://localhost:8080/${type}/delete/${id}`;
      await axios.delete(url);
        fetchProduits();
        fetchArticles();
         setIsDeleteModalOpen(false); // Close delete modal after deletion
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };

  const confirmDelete = (row, type) => {
    setItemToDelete({ id: row.idArticle || row.idProduit, type });
    setIsDeleteModalOpen(true); // Open confirmation modal
  };

  const handleModalSubmit = async () => {
    const isArticle = activeTab === "articles";
    const type = isArticle ? "article" : "produit";

    const url = modalAction === "create"
      ? `http://localhost:8080/${type}/add`
      : `http://localhost:8080/${type}/edit/${isArticle ? selectedRow?.idArticle : selectedRow?.idProduit}`;

    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "image" && formData[key]) {
        payload.append("image", formData[key]);
      } else {
        payload.append(key, formData[key]);
      }
    });

    try {
      if (modalAction === "create") {
        for (let pair of payload.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
      }
        await axios.post(url, payload);
      } else if (modalAction === "edit") {
        for (let pair of payload.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        await axios.put(url, payload);
    }
      setIsModalOpen(false);
      fetchArticles();
      fetchProduits();
    } catch (error) {
      console.error(modalAction === "create" ? "Erreur lors de l'enregistrement" : "Erreur lors de modification", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({
        ...formData,
        [name]: files ? files[0] : value,
      });
    }
  };

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleViewDetails = (row) => {
    setSelectedDetail(row);
    setDetailModalOpen(true);
  };
  

  return (
    <div className="p-4 mt-7">
      {/* Tabs */}
      <div className="flex justify-center my-9 space-x-4 mb-12 border-b-2 border-myMarron">
        <button
          onClick={() => handleTabClick("articles")}
          className={`w-1/2 px-4 py-2 rounded-t-lg font-semibold ${activeTab === "articles" ? "bg-myMarron text-white" : "bg-gray-200 text-gray-600"}`}
        >
          Articles
        </button>
        <button
          onClick={() => handleTabClick("produits")}
          className={`w-1/2 px-4 py-2 rounded-t-lg font-semibold ${activeTab === "produits" ? "bg-myMarron text-white" : "bg-gray-200 text-gray-600"}`}
        >
          Produits
        </button>
      </div>

      {/* Content */}
      {activeTab === "articles" ? (
        <Table
          headers={[
            { label: "Image", key: "imageUrl" },
            { label: "Code Article", key: "codeArticle" },
            { label: "Libellé", key: "libelle" },
            // { label: "Produit", key: "produits.length" },
          ]}
          data={articles}
          onView={handleViewDetails}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={(row) => confirmDelete(row, "article")} // Trigger confirmation modal
        />
      ) : (
        <Table
          headers={[
            { label: "Image", key: "imageUrl" },
            { label: "Nom", key: "nomProduit" },
            { label: "Marque", key: "marque" },
            { label: "Prix", key: "prix" },
            { label: "Disponibilité", key: "disponibilite" },
            { label: "Article", key: "libelleArticle" },
            { label: "Ville", key: "villeDisponibilite" },
            { label: "Fournisseur", key: "nomFournisseur" },
          ]}
          data={produits}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onView={handleViewDetails}
          onDelete={(row) => confirmDelete(row, "produit")} // Trigger confirmation modal
        />
      )}

      {/* Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAction={handleModalSubmit}
          labelAction={modalAction === "create" ? "Ajouter" : "Mettre à jour"}
        >
          <div className="space-y-4 max-h-[75vh] overflow-y-auto">
            {activeTab === "articles" ? (
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
                    <span className="font-medium">{(modalAction === "create" && !imagePreview)? "Ajouter une image":"Changer l'image"}</span>
                    {modalAction !== "create" && !imagePreview &&
                      <img src={formData.imageUrl} alt="photo actuel" className="w-full h-32 object-contain mt-4 rounded" />
                    }
                    
                  </div>
                </div>
                {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-32 object-contain mt-4 rounded" />}
              </>
            ) : (
              <div className="">
              <div className="flex items-center justify-center py-4 bg-gray-100">
                <h1 className="text-myMarron text-2xl font-bold tracking-wide">
                  {modalAction === "create" ? "Ajouter" : "Mettre à jour"} un produit
                </h1>
              </div>
            
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="nomProduit"
                  type="text"
                  placeholder="Nom du produit"
                  value={formData.nomProduit || ""}
                  onChange={handleChange}
                  className="w-full border my-1 p-2 rounded"
                />
                <input
                  name="prix"
                  type="number"
                  placeholder="Prix"
                  value={formData.prix || ""}
                  onChange={handleChange}
                  className="w-full border my-1 p-2 rounded"
                />
            
                <input
                  name="detailTechnique"
                  type="text"
                  placeholder="Détails techniques"
                  value={formData.detailTechnique || ""}
                  onChange={handleChange}
                  className="w-full border my-1 p-2 rounded"
                />
                <textarea
                  name="commentaireFournisseur"
                  placeholder="Commentaire fournisseur"
                  value={formData.commentaireFournisseur || ""}
                  onChange={handleChange}
                  className="w-full border my-1 p-2 rounded"
                />
            
                <input
                  name="marque"
                  type="text"
                  placeholder="Marque"
                  value={formData.marque || ""}
                  onChange={handleChange}
                  className="w-full border my-1 p-2 rounded"
                />
                <input
                  name="disponibilite"
                  type="number"
                  placeholder="Disponible"
                  value={formData.disponibilite || ""}
                  onChange={handleChange}
                  className="w-full border my-1 p-2 rounded"
                />
            
                <input
                  name="villeDisponibilite"
                  type="text"
                  placeholder="Ville de disponibilité"
                  value={formData.villeDisponibilite || ""}
                  onChange={handleChange}
                  className="w-full border my-1 p-2 rounded"
                />
                <select
                  name="idArticle"
                  value={formData.idArticle || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition ease-in-out"                >
                  <option value="">Sélectionner une article</option>
                  {articles.map((article) => (
                    <option key={article.idArticle} value={article.idArticle}>
                      {article.libelle}-{article.codeArticle}
                    </option>
                  ))}
                </select>
            
                <select
                  name="matriculeFournisseur"
                  value={formData.matriculeFournisseur || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition ease-in-out"                  required
                >
                  <option value="">Sélectionner le fournisseur</option>
                  {fournisseurs.map((fournisseur) => (
                    <option key={fournisseur.fournisseurMatricule} value={fournisseur.fournisseurMatricule}>
                      {fournisseur.nom}-{fournisseur.fournisseurMatricule}
                    </option>
                  ))}
                </select>
              </div>
            
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
                  <span className="font-medium">
                    {modalAction === "create" && !imagePreview ? "Ajouter une image" : "Changer l'image "}
                  </span>
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="w-full h-32 object-contain mt-4 rounded" />
                  )}
                </div>
              </div>
            </div>
            
            )}
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onAction={() => handleDelete(itemToDelete.id, itemToDelete.type)}
          labelAction="Supprimer"
        >
          <div className="text-center py-4">
            <p className="text-lg font-semibold">Êtes-vous sûr de vouloir supprimer cet élément ?</p>
          </div>
        </Modal>
      )}
      {/* Detail Modal */}
      {detailModalOpen && selectedDetail && (
        <Modal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          title={`Détails de ${activeTab === "articles" ? "l'article" : "le produit"}`}
        >
          <div className="space-y-4">
                      <div className="text-center">
                        <img
                          src={selectedDetail.imageUrl || "placeholder.jpg"}
                          alt="Image"
                          className="w-full h-48 object-contain rounded"
                        />
                      </div>
                    <div className="grid grid-cols-2 gap-4">
            {activeTab === "articles" && (
              <>
                <div className="flex justify-between border-b py-2">
                  <span className="font-semibold">Libellé</span>
                  <span>{selectedDetail.libelle}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="font-semibold">Code de l'article</span>
                  <span>{selectedDetail.codeArticle}</span>
                </div>
                {selectedDetail.produits?.length > 0 && (
                  <div className="col-span-2 border-b py-2">
                    <span className="font-semibold">Produits</span>
                    <ul className="list-disc pl-5">
                      {selectedDetail.produits.map((produit, index) => (
                        <li key={index}>{produit.nomProduit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {activeTab === "produits" && (
              <>
                <div className="flex justify-between border-b py-2">
                  <span className="font-semibold">Nom</span>
                  <span>{selectedDetail.nomProduit}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="font-semibold">Détail technique</span>
                  <span>{selectedDetail.detailTechnique}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="font-semibold">Commentaire du Fournisseur</span>
                  <span>{selectedDetail.commentaireFournisseur}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="font-semibold">Marque</span>
                  <span>{selectedDetail.marque}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="font-semibold">Disponibilité</span>
                  <span>{selectedDetail.disponibilite}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="font-semibold">Prix</span>
                  <span>{selectedDetail.prix}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="font-semibold">Ville Disponibilité</span>
                  <span>{selectedDetail.villeDisponibilite}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="font-semibold">Code Article</span>
                  <span>{selectedDetail.codeArticle}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="font-semibold">Libellé Article</span>
                  <span>{selectedDetail.libelleArticle}</span>
                </div>
              </>
            )}
          </div>


          </div>
        </Modal>
      )}
    </div>
  );
};

export default MarchandiseAd;
