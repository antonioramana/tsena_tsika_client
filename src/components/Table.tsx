import React, { useState } from "react";
import { FiEdit, FiTrash2, FiSearch, FiEye } from "react-icons/fi";

interface TableProps {
  headers: { label: string; key: string }[]; // Map headers to data keys
  data: Array<{ [key: string]: any }>;
  onCreate?: () => void;
  onEdit?: (row: { [key: string]: any }) => void;
  onDelete?: (row: { [key: string]: any }) => void;
  onView?: (row: { [key: string]: any }) => void; // Optional view handler
}

const Table: React.FC<TableProps> = ({ headers, data, onCreate, onEdit, onDelete, onView }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term
  const filteredData = data.filter((row) =>
    headers.some(({ key }) => row[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex items-center space-x-4">
        {/* Add Button */}
        {onCreate && (
          <button
            onClick={onCreate}
            className="bg-myMarron text-white py-2 px-4 rounded hover:bg-yellow-600"
          >
            Ajouter
          </button>
        )}

        {/* Search Bar */}
        <div className="relative mr-5 flex-grow">
          <FiSearch className="absolute top-2 left-2 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-myYellow"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-300">
        {/* Wrapper for vertical scroll */}
        <div className="max-h-[30rem] overflow-y-auto">
        <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-myMarron text-white text-left">
                {headers.map(({ label }, index) => (
                  <th key={index} className="p-3 text-sm font-semibold tracking-wide">
                    {label}
                  </th>
                ))}
                <th className="p-3 text-sm font-semibold tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`border-t border-gray-200 ${rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                  >
                    {headers.map(({ key }, colIndex) => (
                      <td key={colIndex} className="p-3 text-sm text-gray-700">
                        {key === "imageUrl" && row[key] ? (
                          <img
                            src={row[key]}
                            alt="Image"
                            className="w-16 h-16 object-cover rounded-full"
                          />
                        ) : (
                          row[key] || "-"
                        )}
                      </td>
                    ))}
                    <td className="p-3 text-sm flex space-x-2">
                      {onView && (
                        <button
                          onClick={() => onView(row)}
                          className="p-2 bg-gray-700 text-white rounded hover:bg-gray-800"
                          title="Voir"
                        >
                          <FiEye />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="p-2 bg-green-700 text-white rounded hover:bg-green-800"
                          title="Éditer"
                        >
                          <FiEdit />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="p-2 bg-red-700 text-white rounded hover:bg-red-800"
                          title="Supprimer"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={headers.length + 1} className="p-3 text-center text-gray-500">
                    Aucune donnée disponible
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
