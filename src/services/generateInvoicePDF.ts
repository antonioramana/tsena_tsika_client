import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const generateInvoicePDF = async(refAchat) => {
    try {
        const response = await axios.get(
          `http://localhost:8080/achat/facture/${refAchat}`
        );
    
        const data = response.data;
    
        // Initialiser jsPDF
        const doc = new jsPDF();
    
        // Titre du document
        doc.setFontSize(16);
        doc.text("Facture", 105, 20, { align: "center" });
    
        // Informations de l'Association GR
        doc.setFontSize(12);
        doc.text("Entreprise TMS", 10, 40);
        doc.text("Lot 1M113 Andranovato Manakara", 10, 50);
        doc.text("+261 34 74 021 02 - +261 34 76 513 75", 10, 60);
        
        // Informations générales
        
        doc.text(`Référence d'Achat : ${data.refAchat}`, 10, 80);
        doc.text(`Numéro de Facture : ${data.numFacture}`, 10, 90);
        doc.text(`Date de Commande : ${new Date(data.dateCommande).toLocaleDateString()}`, 10, 100);
        
        // Informations du client
        doc.text("Informations du Client :", 110, 80);
        doc.text(`Nom : ${data.client.nomClient}`,120, 90);
        doc.text(`Email : ${data.client.mailClient}`, 120, 100);
        doc.text(`Contact : ${data.client.contactClient}`, 120, 110);
        doc.text(`Adresse : ${data.client.adresseClient}`, 120, 120);
        doc.text(`Domaine d'activité : ${data.client.domaineActiviteClient}`, 120, 130);
    
    
        // Table des détails des produits
        const tableBody = data.details.map((detail) => [
          detail.produit.nomProduit,
          detail.produit.marque,
          detail.qte,
          detail.produit.prix.toFixed(2),
          detail.montant.toFixed(2),
        ]);
    
        doc.autoTable({
          startY: 140,
          head: [["Produit", "Marque", "Quantité", "Prix Unitaire (AR)", "Montant Total (AR)"]],
          body: tableBody,
        });
    
        // Total
        const finalY = doc.previousAutoTable.finalY || 150;
        doc.text(`Total : ${data.total.toFixed(2)} AR`, 10, finalY + 20);
    
        // Télécharger le PDF
        doc.save(`facture-${refAchat}.pdf`);
      } catch (error) {
        console.error("Erreur lors de la génération de la facture :", error);
        alert("Impossible de générer la facture. Veuillez réessayer plus tard.");
      }
};

export default generateInvoicePDF;
