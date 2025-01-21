import React from "react";
import { FaUsers, FaTruck, FaShoppingCart, FaMoneyBill, FaBox, FaStore } from "react-icons/fa";

const AccueilAd = () => {
  // Données statiques
  const stats = {
    nbClient: 3,
    nbFournisseur: 2,
    nbStaff: 2,
    nbArticle: 3,
    nbProduit: 4,
    nbAchat: 2,
    nbPaiement: 2,
  };

  const lastClients = [
    { name: "John Doe", date: "2025-01-19" },
    { name: "Philipe", date: "2025-01-18" },
    { name: "Santatra", date: "2025-01-17" },
  ];

  const lastPurchases = [
    { client: "Santatra", date: "2025-01-19", payment: 1500000 },
    { client: "Philipe", date: "2025-01-18", payment: 210000 },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Cards */}
        <Card title="Clients" value={stats.nbClient} icon={<FaUsers />} color="bg-blue-500" />
        <Card title="Fournisseurs" value={stats.nbFournisseur} icon={<FaTruck />} color="bg-green-500" />
        <Card title="Staff" value={stats.nbStaff} icon={<FaStore />} color="bg-orange-500" />
        <Card title="Articles" value={stats.nbArticle} icon={<FaBox />} color="bg-purple-500" />
        <Card title="Produits" value={stats.nbProduit} icon={<FaShoppingCart />} color="bg-pink-500" />
        <Card title="Achats" value={stats.nbAchat} icon={<FaShoppingCart />} color="bg-teal-500" />
        <Card title="Paiements" value={stats.nbPaiement} icon={<FaMoneyBill />} color="bg-red-500" />
      </div>

      {/* Split View Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Last Clients */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Derniers Clients</h2>
          <ul className="space-y-3">
            {lastClients.map((client, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
              >
                <span className="font-medium text-gray-600">{client.name}</span>
                <span className="text-sm text-gray-500">{client.date}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Last Purchases */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Derniers Achats</h2>
          <ul className="space-y-3">
            {lastPurchases.map((purchase, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
              >
                <div>
                  <p className="font-medium text-gray-600">{purchase.client}</p>
                  <p className="text-sm text-gray-500">{purchase.date}</p>
                </div>
                <span className="text-sm text-green-600 font-bold">{purchase.payment} Ar</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Card Component
const Card = ({ title, value, icon, color }) => {
  return (
    <div className={`flex items-center p-4 rounded-lg shadow-lg ${color} text-white`}>
      <div className="text-4xl mr-4">{icon}</div>
      <div>
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default AccueilAd;
