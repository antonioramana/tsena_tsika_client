import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../components/Modal";
import FournisseurAdForm from "../../partials/admin/FournisseurAdForm";
import Table from "../../components/Table";

export default function FournisseurAd() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [fournisseurData, setFournisseurData] = useState({
    nom: "",
    mail: "",
    adresse: "",
    domaineActiviteFournisseur: "",
    mdpFournisseur: "",
    confirmMdpFournisseur: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [editFournisseurId, setEditFournisseurId] = useState(null);
  const [deleteFournisseurNumMatricule, setDeleteFournisseurNumMatricule] = useState(null);

  const headers = [
    { label: "Matricule", key: "fournisseurMatricule" },
    { label: "Nom", key: "nom" },
    { label: "Email", key: "mail" },
    { label: "Contact", key: "contact" },
    { label: "Adresse", key: "adresse" },
    { label: "Domaine", key: "domaineActiviteFournisseur" },
    { label: "Statut", key: "status" },
  ];

  const fetchFournisseurs =()=>{
    axios
    .get("http://localhost:8080/fournisseur/showall")
    .then((response) => {
      setFournisseurs(response.data);
    })
    .catch((error) => console.error("Erreur lors du chargement des fournisseurs:", error));
  }
  useEffect(() => {
    fetchFournisseurs();
  }, []);

  const handleOpenAddModal = () => setIsAddModalOpen(true);

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteConfirmModalOpen(false);
    setFournisseurData({
      nom: "",
      mail: "",
      adresse: "",
      domaineActiviteFournisseur: "",
      mdpFournisseur: "",
      confirmMdpFournisseur: "",
    });
    setErrors({});
    setEditFournisseurId(null);
    setDeleteFournisseurNumMatricule(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFournisseurData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!fournisseurData.nom) newErrors.nom = "Le nom est requis.";
    if (!fournisseurData.mail) {
      newErrors.mail = "L'email est requis.";
    } else if (!/\S+@\S+\.\S+/.test(fournisseurData.mail)) {
      newErrors.mail = "L'email n'est pas valide.";
    }
    if (!fournisseurData.adresse) newErrors.adresse = "L'adresse est requise.";
    if (!fournisseurData.domaineActiviteFournisseur) newErrors.domaineActiviteFournisseur = "Le domaine est requis.";
    if (!fournisseurData.mdpFournisseur) newErrors.mdpFournisseur = "Le mot de passe est requis.";
    if (fournisseurData.mdpFournisseur !== fournisseurData.confirmMdpFournisseur) {
      newErrors.confirmMdpFournisseur = "La confirmation du mot de passe ne correspond pas.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddFournisseur = () => {
   console.log("data", fournisseurData)
    if (validateForm()) {
      axios
        .post("http://localhost:8080/fournisseur/register", fournisseurData)
        .then((response) => {
          // setFournisseurs((prevFournisseurs) => [...prevFournisseurs, response.data]);
          fetchFournisseurs();
          handleCloseModal();
          setError(null);
        })
        .catch((error) =>{
          setError(error.response.data.message);
          console.error("Erreur lors de l'ajout du fournisseur:", error)
        } );
    }
  };

  const handleEditFournisseur = (fournisseur) => {
    setEditFournisseurId(fournisseur.fournisseurMatricule); // Utilisation de numMatricule
    setFournisseurData({ ...fournisseur });
    setIsEditModalOpen(true);
  };

  const handleUpdateFournisseur = () => {
    if (validateForm() && editFournisseurId !== null) {
      console.log("data", fournisseurData)
      axios
        .put(`http://localhost:8080/fournisseur/edit/${editFournisseurId}`, fournisseurData) // Utilisation de numMatricule pour la mise à jour
        .then((response) => {
          // setFournisseurs((prevFournisseurs) =>
          //   prevFournisseurs.map((fournisseur) => (fournisseur.numMatricule === editFournisseurId ? response.data : fournisseur)) // Utilisation de numMatricule pour trouver le fournisseur
          // );
          fetchFournisseurs();
          handleCloseModal();
          setError(null);
        })
        .catch((error) =>{
          setError(error.response.data.message);
          console.error("Erreur lors de la mise à jour du fournisseur:", error.response.data.message)
        } );
    }
  };

  const handleOpenDeleteConfirmModal = (numMatricule) => {
    setDeleteFournisseurNumMatricule(numMatricule); // Utilisation de numMatricule pour la suppression
    setIsDeleteConfirmModalOpen(true);
  };

  const handleDeleteFournisseur = () => {
    if (deleteFournisseurNumMatricule) {
      axios
        .delete(`http://localhost:8080/fournisseur/delete/${deleteFournisseurNumMatricule}`) // Utilisation de numMatricule pour la suppression
        .then(() => {
          // setFournisseurs((prevFournisseurs) => prevFournisseurs.filter((fournisseur) => fournisseur.numMatricule !== deleteFournisseurNumMatricule)); // Utilisation de numMatricule pour supprimer le fournisseur
          handleCloseModal();
          fetchFournisseurs();
          setError(null);
        })
        .catch((error) =>{
          setError(error.response.data.message);
          console.error("Erreur lors de la suppression du fournisseur:", error.response.data.message)
        } );
    }
  };

  return (
    <div className="p-6 mb-6">
      <div className="p-6">
        <Table
          onCreate={handleOpenAddModal}
          headers={headers}
          data={fournisseurs}
          onEdit={(fournisseur) => handleEditFournisseur(fournisseur)}
          onDelete={(fournisseur) => handleOpenDeleteConfirmModal(fournisseur.fournisseurMatricule)} // Passer numMatricule
        />
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onAction={handleAddFournisseur}
        labelAction="Ajouter"
      >
        <FournisseurAdForm error={error} fournisseurData={fournisseurData} errors={errors} onChange={handleInputChange} />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onAction={handleUpdateFournisseur}
        labelAction="Modifier"
      >
        <FournisseurAdForm error={error} fournisseurData={fournisseurData} errors={errors} onChange={handleInputChange} />
      </Modal>

      <Modal
        isOpen={isDeleteConfirmModalOpen}
        onClose={handleCloseModal}
        onAction={handleDeleteFournisseur}
        labelAction="Supprimer"
      >
        {error &&
         <div className="text-lg font-semibold text-red-600">{error}</div>
        }
        <p>Êtes-vous sûr de vouloir supprimer ce fournisseur ?</p>
      </Modal>
    </div>
  );
}
