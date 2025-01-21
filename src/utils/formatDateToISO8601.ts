export function formatDateToISO8601(date) {
    // Vérifie si c'est déjà un objet Date
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
  
    if (isNaN(date.getTime())) {
      throw new Error("Date invalide fournie.");
    }
  
    // Convertit la date en format ISO8601 (avec la timezone incluse)
    return date.toISOString();
  }
  