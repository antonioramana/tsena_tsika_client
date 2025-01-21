import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../components/Modal";
import ClientAdForm from "../../partials/admin/ClientAdForm";
import Table from "../../components/Table";

export default function ClientAd() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [clientData, setClientData] = useState({
    nomClient: "",
    mailClient: "",
    adresseClient: "",
    domaineActiviteClient: "",
    mdpClient: "",
    confirmMdpClient: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [clients, setClients] = useState([]);
  const [editClientId, setEditClientId] = useState(null);
  const [deleteClientNumMatricule, setDeleteClientNumMatricule] = useState(null);

  const headers = [
    { label: "Matricule", key: "numMatricule" },
    { label: "Nom", key: "nomClient" },
    { label: "Contact", key: "contactClient" },
    { label: "Email", key: "mailClient" },
    { label: "Adresse", key: "adresseClient" },
    { label: "Domaine", key: "domaineActiviteClient" },
  ];

  const fetchClients =()=>{
    axios
    .get("http://localhost:8080/client/showall")
    .then((response) => {
      setClients(response.data);
    })
    .catch((error) => console.error("Erreur lors du chargement des clients:", error));
  }
  // Charger les données clients
  useEffect(() => {
    fetchClients();
  }, []);

  const handleOpenAddModal = () => setIsAddModalOpen(true);

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteConfirmModalOpen(false);
    setClientData({
      nomClient: "",
      mailClient: "",
      adresseClient: "",
      domaineActiviteClient: "",
      mdpClient: "",
      confirmMdpClient: "",
    });
    setErrors({});
    setEditClientId(null);
    setDeleteClientNumMatricule(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!clientData.nomClient) newErrors.nomClient = "Le nom est requis.";
    if (!clientData.mailClient) {
      newErrors.mailClient = "L'email est requis.";
    } else if (!/\S+@\S+\.\S+/.test(clientData.mailClient)) {
      newErrors.mailClient = "L'email n'est pas valide.";
    }
    if (!clientData.adresseClient) newErrors.adresseClient = "L'adresse est requise.";
    if (!clientData.domaineActiviteClient) newErrors.domaineActiviteClient = "Le domaine est requis.";
    if (!clientData.mdpClient) newErrors.mdpClient = "Le mot de passe est requis.";
    if (clientData.mdpClient !== clientData.confirmMdpClient) {
      newErrors.confirmMdpClient = "La confirmation du mot de passe ne correspond pas.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddClient = () => {
    if (validateForm()) {
      axios
        .post("http://localhost:8080/client/register", clientData)
        .then((response) => {
          // setClients((prevClients) => [...prevClients, response.data]);
          fetchClients();
          handleCloseModal();
          setError(null);
        })
        .catch((error) =>{
          setError(error.response.data.message);
          console.error("Erreur lors de l'ajout du client:", error.response.data.message)
        } );
    }
  };

  const handleEditClient = (client) => {
    setEditClientId(client.numMatricule); // Utilisation de numMatricule
    setClientData({ ...client });
    setIsEditModalOpen(true);
  };

  const handleUpdateClient = () => {
    if (validateForm() && editClientId !== null) {
      console.log("data", clientData)
      axios
        .put(`http://localhost:8080/client/edit/${editClientId}`, clientData) // Utilisation de numMatricule pour la mise à jour
        .then((response) => {
          // setClients((prevClients) =>
          //   prevClients.map((client) => (client.numMatricule === editClientId ? response.data : client)) // Utilisation de numMatricule pour trouver le client
          // );
          fetchClients();
          handleCloseModal();
          setError(null);
        })
        .catch((error) =>{
          setError(error.response.data.message);
          console.error("Erreur lors de la mise à jour du client:", error.response.data.message)
        } );
    }
  };

  const handleOpenDeleteConfirmModal = (numMatricule) => {
    setDeleteClientNumMatricule(numMatricule); // Utilisation de numMatricule pour la suppression
    setIsDeleteConfirmModalOpen(true);
  };

  const handleDeleteClient = () => {
    if (deleteClientNumMatricule) {
      axios
        .delete(`http://localhost:8080/client/delete/${deleteClientNumMatricule}`) // Utilisation de numMatricule pour la suppression
        .then(() => {
          // setClients((prevClients) => prevClients.filter((client) => client.numMatricule !== deleteClientNumMatricule)); // Utilisation de numMatricule pour supprimer le client
          handleCloseModal();
          fetchClients();
          setError(null);
        })
        .catch((error) =>{
          setError(error.response.data.message);
          console.error("Erreur lors de la suppression du client:", error.response.data.message)
        } );
    }
  };

  return (
    <div className="p-6 mb-6">
      <div className="p-6">
        <Table
          onCreate={handleOpenAddModal}
          headers={headers}
          data={clients}
          onEdit={(client) => handleEditClient(client)}
          onDelete={(client) => handleOpenDeleteConfirmModal(client.numMatricule)} // Passer numMatricule
        />
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onAction={handleAddClient}
        labelAction="Ajouter"
      >
        <ClientAdForm error={error} clientData={clientData} errors={errors} onChange={handleInputChange} />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onAction={handleUpdateClient}
        labelAction="Modifier"
      >
        <ClientAdForm error={error} clientData={clientData} errors={errors} onChange={handleInputChange} />
      </Modal>

      <Modal
        isOpen={isDeleteConfirmModalOpen}
        onClose={handleCloseModal}
        onAction={handleDeleteClient}
        labelAction="Supprimer"
      >
        {error &&
         <div className="text-lg font-semibold text-red-600">{error}</div>
        }
        <p>Êtes-vous sûr de vouloir supprimer ce client ?</p>
      </Modal>
    </div>
  );
}
