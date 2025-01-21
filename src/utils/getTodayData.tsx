const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString("fr-FR", {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  export default getTodayDate;
  