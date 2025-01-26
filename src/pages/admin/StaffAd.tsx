import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import StaffAdForm from "../../partials/admin/StaffForm";
import axios from "axios";

export default function StaffAd() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [staffData, setStaffData] = useState({
    nomStaff: "",
    mdpStaff: "",
    role: "STAFF_ADMIN",
    mailStaff: "",
    confirmMdpStaff: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [staffs, setStaffs] = useState([]);
  const [editStaffId, setEditStaffId] = useState(null);
  const [editStaffMail, setEditStaffMail] = useState(null);
  const [deleteStaffId, setDeleteStaffId] = useState(null);

  // Charger les données clients

  const fetchStaffs =()=>{
    axios
      .get("http://localhost:8080/staff/showall")
      .then((response) => {
        setStaffs(response.data);
      })
      .catch((error) => console.error("Erreur lors du chargement des staffs:", error));
  }
  useEffect(() => {
   fetchStaffs();
  }, []);

  const headers = [
    { label: "Nom", key: "nomStaff" },
    { label: "Email", key: "mailStaff" },
    { label: "Role", key: "role" },
  ];

  const handleOpenAddModal = () => setIsAddModalOpen(true);

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteConfirmModalOpen(false);
    setStaffData({
      nomStaff: "",
      mdpStaff: "",
      role: "",
      mailStaff: "",
      confirmMdpStaff: "",
    });
    setErrors({});
    setEditStaffId(null);
    setDeleteStaffId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaffData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!staffData.nomStaff) newErrors.nomStaff = "Le nom est requis.";
    if (!staffData.mailStaff) {
      newErrors.mailStaff = "L'email est requis.";
    } else if (!/\S+@\S+\.\S+/.test(staffData.mailStaff)) {
      newErrors.mailStaff = "L'email n'est pas valide.";
    }
    if (!staffData.role) newErrors.role = "Le rôle est requis.";
    //if (!staffData.mdpStaff) newErrors.mdpStaff = "Le mot de passe est requis.";
    if (staffData.mdpStaff && staffData.mdpStaff !== staffData.confirmMdpStaff) {
      newErrors.confirmMdpStaff = "La confirmation du mot de passe ne correspond pas.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddStaff = () => {
    if (validateForm()) {
      axios
        .post("http://localhost:8080/staff/register", {
          nomStaff: staffData.nomStaff,
          mailStaff: staffData.mailStaff,
          mdpStaff: staffData.mdpStaff,
          role: staffData.role,
        })
        .then((response) => {
         fetchStaffs();
          handleCloseModal();
          setError(null)
        })
        .catch((error) => {
          setError(error.response.data.message);
          console.error("Erreur lors de l'ajout du staff:", error);
        });
    }
  };

  const handleEditStaff = (staff) => {
    setEditStaffId(staff.id);
    setEditStaffMail(staff.mailStaff);
    setStaffData({
      ...staff,
      mdpStaff: "", // Vide le mot de passe lors de l'édition
      confirmMdpStaff: "", // Vide la confirmation du mot de passe
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateStaff = () => {
    console.log("data", staffData);
    if (validateForm() && editStaffMail !== null) {
      axios
        .put(`http://localhost:8080/staff/edit/${editStaffMail}`, {
          nomStaff: staffData.nomStaff,
          mailStaff: staffData.mailStaff,
          mdpStaff: staffData.mdpStaff,
          role: staffData.role,
        })
        .then((response) => {
          fetchStaffs();
          setError(null);
          handleCloseModal();
        })
        .catch((error) => {
          setError(error.response.data.message);
          console.error("Erreur lors de la modification du staff:", error);
        });
    }
  };

  const handleOpenDeleteConfirmModal = (staffId) => {
    setDeleteStaffId(staffId);
    setIsDeleteConfirmModalOpen(true);
  };

  const handleDeleteStaff = () => {
    if (deleteStaffId !== null) {
      axios
        .delete(`http://localhost:8080/staff/delete/${deleteStaffId}`)
        .then(() => {
          fetchStaffs();
          handleCloseModal();
          console.log("supprimér", deleteStaffId)
        })
        .catch((error) => {
          setError(error.response.data.message);
          console.error("Erreur lors de la suppression du staff:", error);
        });
    }
  };

  return (
    <div className="p-6 mb-6">
      <div className="p-6">
        <Table
          onCreate={handleOpenAddModal}
          headers={headers}
          data={staffs}
          onEdit={(staff) => handleEditStaff(staff)}
          onDelete={(staff) => handleOpenDeleteConfirmModal(staff.mailStaff)}
        />
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onAction={handleAddStaff}
        labelAction="Ajouter"
      >
        <StaffAdForm error={error} staffData={staffData} errors={errors} onChange={handleInputChange} />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onAction={handleUpdateStaff}
        labelAction="Modifier"
      >
        <StaffAdForm error={error} staffData={staffData} errors={errors} onChange={handleInputChange} />
      </Modal>

      <Modal
        isOpen={isDeleteConfirmModalOpen}
        onClose={handleCloseModal}
        onAction={handleDeleteStaff}
        labelAction="Supprimer"
      >
         {error &&
         <div className="text-lg font-semibold text-red-600">{error}</div>
        }
        <p>Êtes-vous sûr de vouloir supprimer ce staff ?</p>
      </Modal>
    </div>
  );
}
