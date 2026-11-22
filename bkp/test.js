async function loadCardsFromCloud() {
  // BLOC 1 : Configuration de la requête (un simple objet clé-valeur)
  const url = "https://ton-projet.supabase.co/rest/v1/cards";
  const requestOptions = {
    method: "GET",
    headers: {
      "apikey": "TA_CLE_PUBLIQUE_ANON",
      "Authorization": "Bearer TON_TOKEN_JWT",
      "Content-Type": "application/json"
    }
  };

  // BLOC 2 : Exécution sécurisée (try = j'essaie, catch = j'attrape l'erreur)
  try {
    // 2a. Appel réseau (parenthèses simples)
    const response = await fetch(url, requestOptions);

    // 2b. Contrôle du statut HTTP
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    // 2c. Extraction des données JSON
    const cards = await response.json();
    return cards;

  } catch (error) {
    // BLOC 3 : Gestion centralisée des erreurs (réseau coupé OU erreur HTTP)
    console.error("Impossible de charger les cartes :", error.message);
    return []; // On retourne un tableau vide pour éviter que .map() ne plante
  }
}
