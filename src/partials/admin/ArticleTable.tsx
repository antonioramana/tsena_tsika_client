import React from 'react';
import Table from "../../components/Table";

const ArticleTable = ({ articles, onCreate, onEdit, onDelete }) => (
  <Table
    headers={[
      { label: "Image", key: "imageUrl" },
      { label: "Code Article", key: "codeArticle" },
      { label: "Libellé", key: "libelle" },
    ]}
    data={articles}
    onCreate={onCreate}
    onEdit={onEdit}
    onDelete={onDelete}
  />
);

export default ArticleTable;
