import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUsers, FaTruck, FaShoppingCart, FaMoneyBill, FaBox, FaStore } from "react-icons/fa";
import { Link } from "react-router-dom";

const AccueilAd = () => {
const [loading, setLoading]= useState(true);
const [stats, setStats]= useState([]);
 
  useEffect(() => {
    // Récupération des données
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/dashboard");
        setStats(data);
       } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-xl">Chargement...</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Cards */}
        <Card href={"/admin/client"} title="Clients" value={stats.nbClient} icon={<FaUsers />} color="bg-blue-500" />
        <Card href={"/admin/fournisseur"} title="Fournisseurs" value={stats.nbFournisseur} icon={<FaTruck />} color="bg-green-500" />
        <Card href={"/admin/staff"} title="Staff" value={stats.nbStaff} icon={<FaStore />} color="bg-orange-500" />
        <Card href={"/admin/marchandise"} title="Articles" value={stats.nbArticle} icon={<FaBox />} color="bg-purple-500" />
        <Card href={"/admin/marchandise"} title="Produits" value={stats.nbProduit} icon={<FaShoppingCart />} color="bg-pink-500" />
        <Card href={"/admin/achat"} title="Achats" value={stats.nbAchat} icon={<FaShoppingCart />} color="bg-teal-500" />
        <Card href={"/admin/achat"} title="Paiements" value={stats.nbPaiment} icon={<FaMoneyBill />} color="bg-red-500" />
      </div>

     {/* Split View Section */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Last Clients */}
  <div className="bg-white rounded-md shadow-sm p-4">
    <h2 className="text-base font-semibold text-gray-700 mb-3">Derniers Clients</h2>
    <ul className="space-y-2">
      {stats.lastClient.map((client, index) => (
        <li
          key={index}
          className="flex justify-between items-center bg-gray-100 p-2 rounded-sm"
        >
          <span className="text-sm font-medium text-gray-600">{client.nomClient}</span>
          <span className="text-xs text-gray-500">{client.numMatricule}</span>
        </li>
      ))}
    </ul>
  </div>

  {/* Last Purchases */}
  <div className="bg-white rounded-md shadow-sm p-4">
    <h2 className="text-base font-semibold text-gray-700 mb-3">5 derniers paiements</h2>
    <div className="overflow-x-auto bg-white shadow-sm rounded-md border border-gray-200">
      <table className="w-full text-xs text-left text-gray-500">
        <thead className="bg-gray-50 text-gray-700 uppercase">
          <tr>
            <th className="px-2 py-1">Référence</th>
            <th className="px-2 py-1">Type</th>
            <th className="px-2 py-1">Mode</th>
            <th className="px-2 py-1">Montant</th>
            <th className="px-2 py-1">Client</th>
            <th className="px-2 py-1">Date</th>
          </tr>
        </thead>
        <tbody>
          {stats.lastPaiment.map((payment, index) => (
            <tr key={index} className="border-b">
              <td className="px-2 py-1">{payment.reference || "N/A"}</td>
              <td className="px-2 py-1">{payment.typePaiment}</td>
              <td className="px-2 py-1">{payment.modePaiment}</td>
              <td className="px-2 py-1 text-blue-500 font-bold">
                  {payment.montant} Ar
              </td>
              <td className="px-2 py-1">{payment.client.nomClient}</td>
              <td className="px-2 py-1">
                {new Date(payment.datePaiment).toLocaleDateString("fr-FR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

      </div>
    </div>
  );
};

// Card Component
const Card = ({ title, value, icon, color, href }) => {
  return (
    <Link to={href} className={`flex items-center p-4 rounded-lg shadow-lg ${color} text-white`}>
      <div className="text-4xl mr-4">{icon}</div>
      <div>
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </Link>
  );
};

export default AccueilAd;
