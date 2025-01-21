import React from 'react';
import Table from "../../components/Table";

const ProduitTable = ({ produits, onCreate, onEdit, onDelete }) => (
  <Table
    headers={[
      { label: "Image", key: "image" },
      { label: "Nom", key: "nomProduit" },
      { label: "Marque", key: "marque" },
      { label: "Prix", key: "prix" },
      { label: "Disponibilité", key: "disponibilite" },
      { label: "Ville", key: "ville" },
    ]}
    data={produits}
    onCreate={onCreate}
    onEdit={onEdit}
    onDelete={onDelete}
  />
);

export default ProduitTable;
