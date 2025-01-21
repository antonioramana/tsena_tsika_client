// dateService.js

export function formatDateToFrench(dateString) {
    if (!dateString) return ""; // Gérer les dates nulles ou invalides
  
    try {
      // Créer un objet Date à partir de la chaîne
      const date = new Date(dateString);
  
      // Options pour le formatage en français avec l'heure et les minutes
      const options = {
        weekday: "long", // Jour de la semaine (lundi, mardi, etc.)
        year: "numeric",
        month: "long", // Mois complet (janvier, février, etc.)
        day: "numeric",
        hour: "2-digit", // Heure (avec deux chiffres)
        minute: "2-digit", // Minutes (avec deux chiffres)
      };
  
      // Formatter la date avec les options
      return date.toLocaleDateString("fr-FR", options);
    } catch (error) {
      console.error("Erreur lors du formatage de la date :", error);
      return ""; // Retourne une chaîne vide en cas d'erreur
    }
  }
  