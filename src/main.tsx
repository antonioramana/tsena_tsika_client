// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./styles/style.css";
// import {
//   Accueil,
//   AccueilAd,
//   AchatAd,
//   Achats,
//   ClientAd,
//   Discussion,
//   FournisseurAd,
//   MarchandiseAd,
//   MarcheAd,
//   SuiviAchats,
// } from "./pages";
// import NotFound from "./_utils/NotFound";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Layout from "./components/users/Layout";
// import { LayoutAd } from "./components";
// import StaffAd from "./pages/admin/StaffAd";
// import DiscussionAd from "./pages/admin/DiscussionAd";
// import Purchase from "./pages/users/Purchase";
// import Commande from "./pages/users/Commande";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// // import "slick-carousel/slick/slick.css";
// // import "slick-carousel/slick/slick-theme.css";

// const routes = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "/",
//         index: true,
//         element: <Accueil />,
//       },
//       {
//         path: "/accueil",
//         element: <Accueil />,
//       },
//       {
//         path: "/achats",
//         element: <Achats />,
//       },
//       {
//         path: "/purchase",
//         element: <Purchase />,
//       },
//       {
//         path: "/discussion",
//         element: <Discussion />,
//       },
//       {
//         path: "/suivi-achats",
//         element: <SuiviAchats />,
//       },
//       {
//         path: "/commande/produit/:id",
//         element: <Commande />,
//       },
//     ],
//   },
//   {
//     path: "/admin",
//     element: <LayoutAd />,
//     children: [
      // {
      //   index: true,
      //   path: "/admin",
      //   element: <AccueilAd />,
      // },
      // {
      //   path: "/admin/accueil",
      //   element: <AccueilAd />,
      // },
      // {
      //   path: "/admin/client",
      //   element: <ClientAd />,
      // },
      // {
      //   path: "/admin/marchandise",
      //   element: <MarchandiseAd />,
      // },
      // {
      //   path: "/admin/achat",
      //   element: <AchatAd />,
      // },
      // {
      //   path: "/admin/marche",
      //   element: <MarcheAd />,
      // },
      // {
      //   path: "/admin/fournisseur",
      //   element: <FournisseurAd />,
      // },
      // {
      //   path: "/admin/staff",
      //   element: <StaffAd />,
      // },
      // {
      //   path: "/admin/discussion",
      //   element: <DiscussionAd />,
      // },
//     ],
//   },

//   {
//     path: "/*",
//     element: <NotFound />,
//   },
//   {
//     path: "/connexion",
//     element: <Login />,
//   },
//   {
//     path: "/inscription",
//     element: <Register />,
//   },
// ]);

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <RouterProvider router={routes} />
//   </StrictMode>
// );
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout, LayoutAd } from "./components";

// Import your pages
import AccueilAd from "./pages/admin/AccueilAd";
import AchatAd from "./pages/admin/AchatAd";
import Achats from "./pages/users/Achats";
import NotFound from "./_utils/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import StaffAd from "./pages/admin/StaffAd";
import Commande from "./pages/users/Commande";
import Purchase from "./pages/users/Purchase";
import { Accueil, ClientAd, Discussion, FournisseurAd, MarchandiseAd, MarcheAd, SuiviAchats } from "./pages";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./contexts/useAuth";
import DiscussionAd from "./pages/admin/DiscussionAd";
import { CartProvider } from "./contexts/CartContext";
import PaymentPage from "./pages/users/PaymentPage";
import AchatsProcedural from "./pages/users/AchatsProcedural";
import Checkout from "./pages/users/Checkout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", index: true, element: <Accueil /> },
      { path: "/achats", element: <Achats /> },
      {
        path: "/discussion",
        element: <ProtectedRoute element={<Discussion />} />,
      },
      {
        path: "/purchase",
        element: <ProtectedRoute element={<Purchase />} />,
      },
      {
        path: "/commande/produit/:id",
        element: <ProtectedRoute element={<Commande />} />,
      },
      {
        path: "/suivi-achats",
        element: <ProtectedRoute element={<SuiviAchats />} />,
      },
      {
        path: "/payment/:paymentId",
        element: <ProtectedRoute element={<PaymentPage />} />,
      },
      {
        path: "/achat-procedural",
        element: <ProtectedRoute element={<AchatsProcedural />} />,
      },
      {
        path: "/checkout/:refAchat",
        element: <ProtectedRoute element={<Checkout />} />,
      },   
    ],
  },
  {
    path: "/admin",
    element: <LayoutAd />,
    children: [
      {
        index: true,
        path: "/admin",
        element: (
          <ProtectedRoute adminOnly={true} element={<AccueilAd />} />
        ),
      },
      {
        path: "/admin/accueil",
        element: (
          <ProtectedRoute adminOnly={true} element={<AccueilAd />} />
        ),
      },
      {
        path: "/admin/client",
        element: (
          <ProtectedRoute adminOnly={true} element={<ClientAd />} />
        ),
      },
      {
        path: "/admin/marchandise",
        element: (
          <ProtectedRoute adminOnly={true} element={<MarchandiseAd />} />
        ),
      },
      {
        path: "/admin/achat",
        element: (
          <ProtectedRoute adminOnly={true} element={<AchatAd />} />
        ),
      },
      {
        path: "/admin/marche",
        element: (
          <ProtectedRoute adminOnly={true} element={<MarcheAd />} />
        ),
      },
      {
        path: "/admin/fournisseur",
        element: (
          <ProtectedRoute adminOnly={true} element={<FournisseurAd />} />
        ),
      },
      {
        path: "/admin/staff",
        element: (
          <ProtectedRoute adminOnly={true} element={<StaffAd />} />
        ),
      },
      {
        path: "/admin/discussion",
        element: (
          <ProtectedRoute adminOnly={true} element={<DiscussionAd />} />
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
  {
    path: "/connexion",
    element: <Login />,
  },
  {
    path: "/inscription",
    element: <Register />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
    </CartProvider>
  </StrictMode>
);
